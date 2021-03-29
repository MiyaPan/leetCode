/**
 * 347. 前 K 个高频元素
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

    示例 1:
    输入: nums = [1,1,1,2,2,3], k = 2
    输出: [1,2]
    
    示例 2:
    输入: nums = [1], k = 1
    输出: [1]

    提示：
    你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
    你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
    题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
    你可以按任意顺序返回答案。

    链接：https://leetcode-cn.com/problems/top-k-frequent-elements
*/
// 思路：用 map 记录每个元素的出现频率无疑。
// 但是，对 map 按照频率排序的时候，在每个元素都不同的情况下，会达到 o(nlogn)
// ❌所以，可以遍历 map 的key数组，弄个双向队列，大于就往数组头插，小于就往后？不行，插了几个之后，再插就得遍历所有的，还是不行
// 其实只需要维护k个有序的序列就可以了，不需要对所有进行排序，所以使用优先级队列是最优的

// 可以：
// 1. 桶排序
// 2. 对 map 的数组进行建堆，建个堆，然后输出前 k 个就可以了，因为建堆的操作，把遍历深度弄成了二叉树的深度，怎么都不会超过 o(nlogn)
// 此时要思考一下，是使用小顶堆呢，还是大顶堆？
// 有的同学一想，题目要求前 K 个高频元素，那么果断用大顶堆啊。不是的，要用小根堆啊: 因为要留在堆中的是前 k 大的，小根堆的根做守卫，大于它的才可以如，小于它的直接滚
// 具体步骤如下：

// 遍历数据，统计每个元素的频率，并将元素值（ key ）与出现的频率（ value ）保存到 map 中
// 遍历 map ，将前 k 个数，构造一个小顶堆
// 从 k 位开始，继续遍历 map ，每一个数据出现频率都和小顶堆的堆顶元素出现频率进行比较，如果小于堆顶元素，则不做任何处理，继续遍历下一元素；如果大于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成一个小顶堆。
// 遍历完成后，堆中的数据就是前 k 大的数据

// 链接：https://leetcode-cn.com/problems/top-k-frequent-elements/solution/347-qian-kge-gao-pin-yuan-su-cjian-ji-dai-ma-you-2/
// https://leetcode-cn.com/problems/top-k-frequent-elements/solution/javascript-qian-k-ge-gao-pin-yuan-su-by-user7746o/

// 桶排序定义和示例：
// https://blog.csdn.net/liaoshengshi/article/details/47320023
// https://zhuanlan.zhihu.com/p/46138077

// 各种排序 动画详解：桶排序一看就明白了：1. 先构造完全二叉树；2. 调整为大根堆；3. 交换根个最后一个节点，最大值就拿到了，再调整堆；4. 重复 3
// https://blog.csdn.net/weixin_41190227/article/details/86600821
var topKFrequent = function(nums, k) {
    let n = nums.length;
    if (n <= k) return nums;

    let map = {};
    for(let i = 0; i < n; i++) {
        if (map[nums[i]]) {
            map[nums[i]] = map[nums[i]] + 1;
        } else {
            map[nums[i]] = 1;
        }
    }

    let arr = [];
    Object.keys(map).forEach(num => {
        // arr[map[num]] = num;
        // 可能有频率重复的，所以 值用数组
        if (arr[map[num]]) {
            arr[map[num]].push(num);
        } else {
            arr[map[num]] = [num];
        }
    });

    let ans = [];
    for(let i = arr.length - 1; i >= 0, ans.length < k; i--) {
        if (arr[i]) ans = ans.concat(arr[i]);
    }

    return ans;
};

// 堆专门解决 top K 这类问题！！！
// https://liuhao163.github.io/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95-%E5%A0%86%E4%BB%A5%E5%8F%8A%E5%A0%86%E6%8E%92%E5%BA%8F/
// https://juejin.im/post/6844904162581282824
// 利用堆，js 没有优先队列，所以要手写推==
// https://segmentfault.com/a/1190000015487916
// 因为是完全二叉树，所以可以用数组存储。每个节点 i，他的父节点为 parseInt((i-1)/2)，他的左孩子 i*2+1，他的右孩子 i*2+2【i 从 0 开始】
// 满二叉树和完全二叉树：满是都有两个孩子，一个不缺，完全是靠左边满，只有右边可以不满
// 堆化：https://blog.csdn.net/lighthear/article/details/79945528
// https://liuhao163.github.io/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95-%E5%A0%86%E4%BB%A5%E5%8F%8A%E5%A0%86%E6%8E%92%E5%BA%8F/
// 升序为例建大顶堆，降序建小顶堆：https://liuhao163.github.io/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95-%E5%A0%86%E4%BB%A5%E5%8F%8A%E5%A0%86%E6%8E%92%E5%BA%8F/
export var topKFrequent = function(nums, k) {
    let n = nums.length;
    if (n <= k) return nums;

    let map = new Map();
    for(let i = 0; i < n; i++) {
        if (map.get(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1);
        } else {
            map.set(nums[i], 1);
        }
    }

    let heap = [];
    let i = 0;
    // Map.forEach 参数是先 value 再 key！傻了吗。先值再 index 啊
    // map.forEach((num, frequence) => {
    map.forEach((frequence, num) => {
        if (i < k - 1) {
            heap.push(num);
        } else if (i === k - 1) {
            heap.push(num);
            buildHeap(heap, k, map);
        } else if(frequence > map.get(heap[0])) {
            // 大于堆内最小数字才插入，否则直接忽略
            heap[0] = num;
            heapify(heap, k, 0, map);
        }
        i++;
    });

    return heap;
};

// 基于 shiftDown 的堆化，即 自上而下的堆化，完全二叉树是用数组存储的
// 从最后一个非叶子节点开始，挨个堆化【为啥从最后一个非叶子，因为是完全二叉树，剩下的一半的叶子不用调整啊笨！】。最后一个非叶子就是最后一个叶子的父亲
function buildHeap(heap, heapCapicity, map) {
    let lastIndex = heap.length-1;
    // 要倒着啊
    for(let i = parseInt((lastIndex-1)/2); i >= 0; i--) {
        heapify(heap, heapCapicity, i, map);
    }
}

// 基于 shiftDown 的堆化，即 自上而下的堆化
function heapify(heap, heapCapicity, i, map) {
    while (true) {
        let next = i;
        // 往左往右都行，一样的，往之后，再往下走就行了，堆的结果是不唯一的
        if (2*i+1 < heapCapicity && map.get(heap[2*i+1]) < map.get(heap[i])) {
            next = 2*i+1;
        }
        // 只跟最小的元素换~~~~
        if (2*i+2 < heapCapicity && map.get(heap[2*i+2]) < map.get(heap[2*i+1]) && map.get(heap[2*i+2]) < map.get(heap[i])) {
            next = 2*i+2;
        }

        if (next === i) {
            break;
        }

        swap(heap, i, next);
        i = next;
    }
}

function swap(heap, i, j) {
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
}

// 二刷
// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]

// 输入: nums = [1], k = 1
// 输出: [1]
export var topKFrequent1 = function(nums, k) {
    let n = nums.length;
    if (n <= k) return nums;

    let map = {};
    for (let i = 0; i < n; i++) {
        if (map[nums[i]]) {
            map[nums[i]] += 1;
        } else {
            map[nums[i]] = 1;
        }
    }

    if (Object.keys(map).length < k) return [...Object.keys(map)];

    let heap = [];
    // 如果 map = newMap();
    // 那就可以 map.forEach((value, key) => {});
    Object.keys(map).forEach(key => {
        if (heap.length < k) {
            heap.push(+key);
            // shiftUp(heap, map, heap.length-1);
            // push 完了之后一次调用 shiftDown 比 每次插入都 shiftUp 要快不少！
            if (heap.length === k) {
                buildHeap(heap, map, k);
            }
        } else {
            let val = map[key];
            if (val > map[heap[0]]) {
                // 比小根堆的根大的才进堆
                heap[0] = +key;
                shiftDown(heap, map, 0, k);
            }
        }
    });
    return heap;
};

// build heap 是从最后一个非叶子开始 shiftDown（当前元素向下移动）
function buildHeap(heap, map, k) {
    // 最后一个非叶节点和 parent 一样，要先减 1 ，在 /2，可以举例看下很快
    for (let i = Math.floor((heap.length-1)/2); i >= 0; i--) {
        shiftDown(heap, map, i, k);
    }
}

function shiftUp(heap, map, i) {
    // i-1 是先把右子树减掉，再除以 2 ，得父节点的 index
    let parent = Math.floor((i-1)/2);
    if (parent >= 0 && map[heap[i]] < map[heap[parent]]) {
        swap(heap, i, parent);
        shiftUp(heap, map, parent);
    }
}

function shiftDown(heap, map, i, k) {
    // i-1 是先把右子树减掉，再除以 2 ，得父节点的 index
    let maxIndex = i;
    if (2*i+1 < k && map[heap[2*i+1]] < map[heap[i]]) {
        maxIndex = 2*i+1;
    }
    if (2*i+2 < k && map[heap[2*i+2]] < map[heap[i]] && map[heap[2*i+2]] < map[heap[2*i+1]]) {
        maxIndex = 2*i+2;
    }

    if (maxIndex !== i) {
        swap(heap, maxIndex, i);
        shiftDown(heap, map, maxIndex, k)
    }
}

