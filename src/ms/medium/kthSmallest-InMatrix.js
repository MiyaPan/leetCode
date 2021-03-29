/**
 * 378. 有序矩阵中第K小的元素
 * 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
    请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

    示例：
    matrix = [
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
    ],
    k = 8,
    返回 13。
     
    提示：你可以假设 k 的值永远是有效的，1 ≤ k ≤ n^2 。
    链接：https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix
*/
// 思路一：最原始自己的思路其实是对的，多指针对比，但是实现不了，原因是没用堆啊！用小根堆实现原始思路多好！！
// https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/solution/shi-yong-dui-heapde-si-lu-xiang-jie-ling-fu-python/
// 小/大根堆专门处理 "top K" 问题，但是 js 没有堆这个数据结构，要手写
// * 要的是前 k 小的，所以堆里留下的是前 k 小的，所以用大根堆，用大根堆的根节点做守卫，只有小于它的才可以进堆，大于它的直接滚
// * 如果小于根，把根替换成新节点
// 变式见：347. 前 K 个高频元素
// 堆排序讲解：https://blog.csdn.net/u010452388/article/details/81283998
// 归并排序：https://zhuanlan.zhihu.com/p/124356219

// 思路二： 看到排序好的就用二分啊，忘了啊忘了
// 这个思路厉害啊：找小于等于 target 的有多少个，可以可以
// target 是从左上和右下的范围内取值，不一定非得是矩阵里的啊啊啊啊！
export var kthSmallest1 = function(matrix, k) {
    let n = matrix.length;
    if (n === 0) return -1;
    let m = matrix[0].length;

    let l = matrix[0][0];
    let r = matrix[n-1][m-1];
    while(l <= r) {
        let mid = l + parseInt((r-l)/2);
        let count = countNum(matrix, mid, n, m);
        console.log('mid: count %s: %s',  mid, count)
        // 这里不能直接返回，返回的可能是矩阵中不存在的数，碰到相等的时候应该继续缩小范围
        // 找到最小的符合条件的数，这个数肯定在矩阵中
        // 为啥？因为：小于 12 的有 5 个，我们应该接着往右找到 小于 14 的有 8 个
        // 那么答案肯定在 小于 14 的数里面，再往左找，找到第一个 小于 14 的数看看符不符合，如果第一个小于 14 的还是 8 就接着往左
        // 直到找到不是 8 的那个数也就是 13，这个 13就是答案，为啥，
        // 因为 计数得到的个数其实是和矩阵里存不存在该数字有关系的，我们要找到那个让计数 刚好摇摆的值，
        // 如果 它(14)能满足，它(13)也能满足，那肯定是 13，因为 13 去遍历矩阵正好能获得 8 个，说明矩阵中正好存在
        // 继续 r = mid -1;

        //别人的论证： 在[left, right]中符合条件(count(矩阵中小于它的数)==k)的数可能会有多个，这些数中，
        // 最小的那个(设为a)一定在矩阵中，对于任意整数i(i<a) ，count(i)<k，直到i等于a时，count将第一次等于k。
        // 因此二分查找找到第一个使count==k的位置，也就是c++里lower_bound所求的位置，就一定是所求。
        // if (count === k) return mid;
        if (count < k) l = mid + 1;
        else if (count >= k) r = mid - 1;
    }
    return r;
};

// 这里思路也很赞，不用全部遍历，按列扫描
// 如果 tar < 小于当前值，那么当前值左边的列都可以被计算进来，还是变相的回归到了左下角，
// 左下角的性质最好，向右单调增，向上单调减，就是！向左向上单调减啊，就利用这个计数
/**
 * 计算 <= target 的数目
 * 思考： < target 的话上面应该怎么处理
 */
function countNum(matrix, target, n, m) {
    let j = 0;
    let i = n - 1;
    let count = 0;
    while(i >= 0 && j < m) {
        if (matrix[i][j] < target) {
            j++;
            count += i + 1; // i 是index，这里数的是列的个数
        } else {
            i--;
        }
    }
    return count;
}


// 这种方式因为没有利用 列的递增 性质，所以最后一个 case 超时了，即使判断了 p[i] !== p[i-1] 也会超时
// 得用个堆，才能优化时间
export var kthSmallest = function(matrix, k) {
    let n = matrix.length;
    if (n === 0) return -1;
    let m = matrix[0].length;

    let p = Array(n).fill(0);
    let r = 0;
    let c = 0;
    let curRow = 0;
    while (k > 0) {
        let min = Number.MAX_SAFE_INTEGER;
        // 找开头元素最小的那行，记录下行号 row
        for (let i = 0; i < n; i++) {
            if (p[i] !== null && (i-1 < 0 || p[i] !== p[i-1])) {
                let head = matrix[i][p[i]];
                if (head <= min) {
                    min = head;
                    curRow = i;
                }
            };
        }
        r = curRow;
        c = p[curRow];
        if (p[curRow] >= m-1) {
            p[curRow] = null;
            curRow += 1;
        } else {
            p[curRow] += 1;
        }
        console.log(p)
        k--;
    }
    return matrix[r][c];
};

// 利用堆，大根堆还是小根堆呢？要前 k 小就大根堆啊
// 有两个原始操作用于保证插入或删除节点以后堆是一个有效的最大堆或者最小堆：

// 堆的调整操作：
//      shiftUp(): 如果一个节点比它的父节点大（最大堆）或者小（最小堆），那么需要将它同父节点交换位置。这样是这个节点在数组的位置上升。
//      shiftDown(): 如果一个节点比它的子节点小（最大堆）或者大（最小堆），那么需要将它向下移动。这个操作也称作“堆化（heapify）”。
// · shiftUp 或者 shiftDown 是一个递归的过程，所以它的时间复杂度是 O(log n)。
//   shiftUp简单，只会涉及最后一个叶节点到根所在的支路，从底向上调整就行。为啥，因为 堆并不要求左子和右子的有序，单调整一支，只要满足和父节点的关系就完了

// 基于这两个原始操作还有一些其他的操作：
//      insert(value): 在堆的尾部添加一个新的元素，然后使用 shiftUp 来修复对。
//      remove(): 移除并返回最大值（最大堆）或者最小值（最小堆）。为了将这个节点删除后的空位填补上，需要将最后一个元素移到根节点的位置，然后使用 shiftDown 方法来修复堆。
//      removeAtIndex(index): 和 remove() 一样，差别在于可以移除堆中任意节点，而不仅仅是根节点。当它与子节点比较位置不时无序时使用 shiftDown()，如果与父节点比较发现无序则使用 shiftUp()。

// 上面所有的操作的时间复杂度都是 O(log n)，因为 shiftUp 和 shiftDown 都很费时。还有少数一些操作需要更多的时间：
//      search(value): **堆不是为快速搜索而建立的，它是为了迅速返回最大和最小值建立的**，但是 replace() 和 removeAtIndex() 操作需要找到节点在数组中的index，所以你需要先找到这个index。时间复杂度：O(n)。
//      buildHeap(array):通过反复调用 insert() 方法将一个（无序）数组转换成一个堆。如果你足够聪明，你可以在 O(n) 时间内完成。
//      堆排序：由于堆就是一个数组，我们可以使用它独特的属性将数组从低到高排序。时间复杂度：O(n lg n)。

// 堆的节点定位：
//      parent(i) = floor((i - 1)/2)
//      left(i)   = 2i + 1
//      right(i)  = 2i + 2

// 链接：https://www.jianshu.com/p/6b526aa481b1
// 我去，这样，最后一个 case 还是超了，试试把 shiftUP 和 shiftDown 的递归改成迭代，还是超，，，面试就递归好了
export var kthSmallest3 = function(matrix, k) {
    let n = matrix.length;
    if (n === 0) return -1;
    let m = matrix[0].length;
    let heap = [];

    // 构建完堆后，后续节点跟 根 比较，大的直接走，小的入堆
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            console.log('heap.length < k: %s < %s', heap.length, k)
            if (heap.length < k) {
                // 先把 k 个入栈
                heap.push(matrix[i][j]);
                // 从末尾插入的要 shiftUp，从根替换进去的才 shiftDown
                // shiftUpIteration(heap, heap.length-1);

                // push 完了之后一次调用 shiftDown 比 每次插入都 shiftUp 要快不少！这样就能使最后一个case过了！！！
                // mdzz，还是不用 shiftUp 好
                if (heap.length === k) {
                    buildHeap(heap);
                }
            } else if (matrix[i][j] < heap[0]) {
                heap[0] = matrix[i][j];
                shiftDownIteration(heap, 0, k);
                console.log('shiftDown heap===');
                console.log(heap);
            } else {
                break;
            }
        }
    }
    console.log('最终heap===');
    console.log(heap);

    return heap[0];
};

function buildHeap(heap) {
    for (let i = Math.floor((heap.length-1)/2); i >= 0; i--) {
        shiftDown(heap, i, heap.length);
    }
}

// 递归和迭代都是循环中的一种。 递归是重复调用函数自身实现循环。 迭代是函数内某段代码实现循环
// shiftUp就是元素向上走，一直和父元素换
function shiftUp(arr, i) {
    let parentIdx = Math.floor((i-1)/2);
    if (parentIdx >= 0 && arr[i] > arr[parentIdx]){
        swap(arr, i, parentIdx);
        shiftUp(arr, parentIdx);
    }
}

// shiftDown就是元素向下走，一直和子元素换
function shiftDown(arr, i, end) {
    let maxIndex = i;
    if (2*i+1 < end && arr[2*i+1] > arr[i]) {
        maxIndex = 2*i+1;
    }
    if (2*i+2 < end && arr[2*i+2] > arr[i] && arr[2*i+2] > arr[2*i+1]) {
        maxIndex = 2*i+2;
    }

    // 别少这个 if 啊啊啊，不然相同值的死循环死啊
    if (maxIndex !== i) {
        swap(arr, i , maxIndex);
        shiftDown(arr, maxIndex, end);
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function shiftUpIteration(arr) {
    let i = arr.length - 1;
    while(i > 0) {
        let parentIdx = Math.floor((i-1)/2);
        console.log('parentIdx===')
        console.log(parentIdx)
        console.log('arr[i] > arr[parentIdx]: %s > %s===', arr[i], arr[parentIdx])
        if (parentIdx >= 0 && arr[i] > arr[parentIdx]){
            swap(arr, i, parentIdx);
            i = parentIdx;
        } else {
            break;
        }
    }
}

function shiftDownIteration(arr, i, end) {
    let maxIndex = i;
    while (maxIndex < end) {
        if (2*i+1 < end && arr[2*i+1] > arr[i]) {
            maxIndex = 2*i+1;
        }
        if (2*i+2 < end && arr[2*i+2] > arr[i] && arr[2*i+2] > arr[2*i+1]) {
            maxIndex = 2*i+2;
        }
    
        // 别少这个 if 啊啊啊，不然相同值的死循环死啊
        if (maxIndex == i) break;
        swap(arr, i , maxIndex);
        i = maxIndex;
    }
}
