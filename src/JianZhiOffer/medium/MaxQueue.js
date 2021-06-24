/**
 * 剑指 Offer 59 - II. 队列的最大值
 * https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/
*/
// TODO: 三刷
// 不能用 minStack 的直接用，因为前面出栈了最大元素之后，就不知道剩下的谁最大了
// 思路：如果入栈的元素大于"当前"最大的，那么就应该更新"当前"最大的是它，如果不大于，就保留他自己
//      这里的当前要维护一个队列，记录小于这个最大值的，最前面大于这个最大值的就不用动了
// 参考：https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/solution/ru-he-jie-jue-o1-fu-za-du-de-api-she-ji-ti-by-z1m/
var MaxQueue = function() {
    this.queue = [];
    this.maxQueue = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if (this.maxQueue.length === 0) return -1;
    return this.maxQueue[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value);
    while (this.maxQueue[this.maxQueue.length-1] < value) {
        this.maxQueue.pop();
    }
    this.maxQueue.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if (this.queue.length === 0) return -1;

    let res = this.queue.shift();
    if (res === this.maxQueue[0]) {
        this.maxQueue.shift();
    }
    return res;
};
