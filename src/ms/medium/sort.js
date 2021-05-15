/**
 * 各类排序算法
*/
// TODO: 三刷！！！
/**
 * 1. 快速排序
 * 思路：
 *      1. 每次选一个随机的(或指定数组中间的元素) index，以它为轴心 pivot
 *      2. 排列数组，小于 pivot 的放它左边，大于 pivot 的放它右边(相等的左右都行)，
 *         在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作
 *      3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
*/
// 方式2，优化了交换过程，不用每次 copy 子数组了，用 left 和 right 指针来控制
// pivot 每次选数组的第一个元素，index 指向它的下一个
// 遍历数组，小于它的挪到 index 位置，然后 index++
// 循环上述直到末尾，然后交换 pivot(第一个元素) 和 index-1 位置的元素
export function quickSort(arr, left, right) {
    left = left === undefined ? 0 : left;
    right = right === undefined ? arr.length-1 : right;

    if (left >= right) return arr;

    let pivotIndex = partition(arr, left, right);

    quickSort(arr, left, pivotIndex-1);
    quickSort(arr, pivotIndex+1, right);

    return arr;
}

function partition(arr, left, right) {
    let pivot = arr[left];
    let p = left + 1;

    for (let i = p; i <= right; i++) {
        if (arr[i] < pivot) {
            swap(arr, i, p);
            p++;
        }
    }

    swap(arr, left, p-1);
    return p-1;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 方式 1，理解简单，占用内存多，因为每次都申请新的 left 和 right 子数组
export function quickSort2(arr) {
    if (arr.length <= 1) return arr;

    let pivotIndex = parseInt(arr.length/2); // 取中间元素作为 pivot
    // 如果此处使用pivot=arr[index]; 那么将会出现无限递归的错误；
    // splice影响原数组，原数组长度减一；
    let pivot = arr.splice(pivotIndex, 1);
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}


/**
 * 2. 归并排序
 * 思路：
 *      1. 每次把数组分成 2 部分，直到只剩一个元素返回
 *      2. 把两部分归并
 * 归并不可能原地，必然要用到新数组的
 * 
 * 就 slice 就行，管啥性能啊，反正复杂度能保证，越易读越好，不用非得计较那点空间，易读比空间重要
*/
export function mergeSort(arr) {
    let len = arr.length;
    if (len <= 1) return arr;

    let midIndex = parseInt(len/2);
    let left = mergeSort(arr.slice(0, midIndex));
    let right = mergeSort(arr.slice(midIndex, len));

    return merge(left, right); 
}

function merge(left, right) {
    let n = left.length;
    let m = right.length;

    let i = 0;
    let j = 0;
    let arr = [];
    while(i < n || j < m) {
        if (i >= n) {
            arr.push(right[j++]);
        } else if (j >= m) {
            arr.push(left[i++]);
        } else if (left[i] < right[j]) {
            arr.push(left[i++]);
        } else {
            arr.push(right[j++]);
        }
    }

    return arr;
}


/**
 * 3. 堆排序
 * 思路：
 *      性质1：堆是完全二叉树
 *      性质2：完全二叉树是用数组存储的，节点 i 的左子是 2*i+1，右子是 2*i+2，节点的父亲是 Math.floor((i-1)2)
 *      1. 建堆：
 *          1. 因为给定的已经是数组了，所以不用建堆哦，堆并不是二叉树的存储哦，是用数组存储的
 *          2. 从 len/2 -1 的节点(最后一个非叶节点)开始调整就完了。为啥是从这个开始，因为完全二叉树剩下的一半都是叶子啊，叶子没孩子，根本不用调整啊！
 *          3. 递归的调整就完了
 *          最后一个非叶是 parseInt(len/2) - 1 哦，先向下取整，还要减 1 哦，不信就举个数组试试，想不明白就记住吧
 *      2. 排序
 *          1. 因为是构建的大根堆，所以最大值的能确定的，就是根，所以每次把根放到数组末尾，即个数组末尾元素交换
 *          2. 然后调整除最后一个外的剩余项，调整成堆
 *          3. 每次交换根到末尾再调整
*/

// 堆的调整操作：
//      shiftUp(): 如果一个节点比它的父节点大（最大堆）或者小（最小堆），那么需要将它同父节点交换位置。这样是这个节点在数组的位置上升。
//      shiftDown(): 如果一个节点比它的子节点小（最大堆）或者大（最小堆），那么需要将它向下移动。这个操作也称作“堆化（heapify）”。
// · shiftUp 或者 shiftDown 是一个递归的过程，所以它的时间复杂度是 O(log n)。

// 基于这两个原始操作还有一些其他的操作：
//      insert(value): 在堆的尾部添加一个新的元素，然后使用 shiftUp 来修复对。
//      remove(): 移除并返回最大值（最大堆）或者最小值（最小堆）。为了将这个节点删除后的空位填补上，需要将最后一个元素移到根节点的位置，然后使用 shiftDown 方法来修复堆。

// 下面两步骤只是构建了一个合格的堆，想堆排序的话，还要将最大堆的根节点移到最后，再调整除最后外剩余范围的堆
export function HeapSort(arr) {
    let len = arr.length;
    if (len <= 1) return arr;

    buildHeap(arr);
    console.log('原始arr===')
    console.log(arr)
    for(let i = len-1; i >= 0; i--) {
        swap(arr, 0, i);
        adjust(arr, 0, i);
    }

    return arr;
}

function buildHeap(arr) {
    let len = arr.length;
    for(let i = parseInt(len/2) - 1; i >= 0; i--) {
        adjust(arr, i);
    }
}

function adjust(arr, i, end) {
    // end 限制后面的不调整
    end = typeof end === 'number' ? end : arr.length;

    let maxIndex = i;
    if (2*i+1 < end && arr[2*i+1] > arr[maxIndex]) {
        maxIndex = 2*i+1;
    } 
    if (2*i+2 < end && arr[2*i+2] > arr[maxIndex] && arr[2*i+2] > arr[2*i+1]) {
        maxIndex = 2*i+2;
    } 

    if (maxIndex !== i) {
        swap(arr, i, maxIndex);
        adjust(arr, maxIndex, end);
    }
}
