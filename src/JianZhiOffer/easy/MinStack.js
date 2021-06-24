/**
 * 剑指 Offer 30. 包含min函数的栈
 * https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/
*/
var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    // minStack 可能没有东西，返回 NAN
    // this.minStack.push(Math.min(x, this.minStack[this.minStack.length-1]))
    // top 值可能为 0
    // let min = this.minStack[this.minStack.length-1] || Number.MAX_SAFE_INTEGER;
    let min = this.minStack.length > 0 
        ? this.minStack[this.minStack.length-1] : Number.MAX_SAFE_INTEGER;
    this.minStack.push(Math.min(x, min));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.minStack.pop();
    return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.minStack[this.minStack.length-1]
};
