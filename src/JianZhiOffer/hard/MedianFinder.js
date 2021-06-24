/**
 * 剑指 Offer 41. 数据流中的中位数
 * 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
 * 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

    例如，
    [2,3,4] 的中位数是 3
    [2,3] 的中位数是 (2 + 3) / 2 = 2.5

    设计一个支持以下两种操作的数据结构：
    void addNum(int num) - 从数据流中添加一个整数到数据结构中。
    double findMedian() - 返回目前所有元素的中位数。
    
    示例 1：
    输入：
    ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
    [[],[1],[2],[],[3],[]]
    输出：[null,null,null,1.50000,null,2.00000]
    
    示例 2：
    输入：
    ["MedianFinder","addNum","findMedian","addNum","findMedian"]
    [[],[2],[],[3],[]]
    输出：[null,null,2.00000,null,2.50000]

    限制：
    最多会对 addNum、findMedian 进行 50000 次调用。
    注意：本题与主站 295 题相同：https://leetcode-cn.com/problems/find-median-from-data-stream/

    链接：https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof
*/
// TODO: 可以看看，大佬的思路还是很厉害，很清晰的
var MedianFinder = function() {
    // 存小的一半
    this.maxHeap = [];
    // 存大的一半，如果加上元素后是奇数个元素，就加到这个堆里，方便奇数个元素直接取啊，放 maxHeap 肯定不对
    this.minHeap = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    let n = this.maxHeap.length;
    let m = this.minHeap.length;
    // 本来是偶数，放下一个，往小根堆放 ❌
    // 应该是 n === m 时候，先放到 较小的一半里，冒泡，再把 较小的一半 的最大值 取出来放到 较大的一半中
    if (n === m) {
        // 先放到前一半中，过滤下，找到前一半的最大的
        this.maxHeap.push(num);
        maxHeapShiftUp(this.maxHeap);
        let max = maxHeapPollTop(this.maxHeap);

        // 把前一半最大的放到小根堆里
        this.minHeap.push(max);
        minHeapShiftUp(this.minHeap);
    } else {
        this.minHeap.push(num);
        minHeapShiftUp(this.minHeap);
        let min = minHeapPollTop(this.minHeap);

        this.maxHeap.push(min);
        maxHeapShiftUp(this.maxHeap);
    }
    console.log(this.maxHeap, this.minHeap)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    let n = this.maxHeap.length;
    let m = this.minHeap.length;
    // 本来是偶数，放下一个，往小根堆放
    if (n === m) {
        return (this.minHeap[0] + this.maxHeap[0]) / 2;
    } else {
        return this.minHeap[0];
    }
};

function minHeapShiftUp(arr) {
    let n = arr.length;
    let i = n-1;
    while (i > 0) {
        let parentIdx = parseInt((i-1)/2);
        if (arr[parentIdx] <= arr[i]) break;
        swap(arr, i, parentIdx);
        i = parentIdx;
    }
}
function minHeapPollTop(arr) {
    let res = arr[0];
    let last = arr.pop();
    if (arr.length > 0) {
        arr[0] = last;
        minHeapShiftDown(arr);
    }
    return res;
}
function minHeapShiftDown(arr) {
    let n = arr.length;
    let i = 0;
    while (i < n) {
        let min = i;
        let lIdx = 2*i+1;
        if (lIdx < n && arr[lIdx] < arr[min]) {
            min = lIdx;
        }
        let rIdx = 2*i+2;
        if (rIdx < n && arr[rIdx] < arr[min]) {
            min = rIdx;
        }
        if (i === min) break;
        swap(arr, i, min);
        i = min;
    }
}
function maxHeapPollTop(arr) {
    let res = arr[0];
    let last = arr.pop();
    if (arr.length > 0) {
        arr[0] = last;
        maxHeapShiftDown(arr);
    }
    return res;
}
function maxHeapShiftDown(arr) {
    let n = arr.length;
    let i = 0;
    while (i < n) {
        let max = i;
        let lIdx = 2*i+1;
        if (lIdx < n && arr[lIdx] > arr[max]) {
            max = lIdx;
        }
        let rIdx = 2*i+2;
        if (rIdx < n && arr[rIdx] > arr[max]) {
            max = rIdx;
        }
        if (i === max) break;
        swap(arr, i, max);
        i = max;
    }
}
function maxHeapShiftUp(arr) {
    let n = arr.length;
    let i = n-1;
    while (i > 0) {
        let parentIdx = parseInt((i-1)/2);
        if (arr[parentIdx] >= arr[i]) break;
        swap(arr, i, parentIdx);
        i = parentIdx;
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
