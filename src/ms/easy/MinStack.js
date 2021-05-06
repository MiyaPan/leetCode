/**
 * 155. 最小栈
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
    push(x) —— 将元素 x 推入栈中。
    pop() —— 删除栈顶的元素。
    top() —— 获取栈顶元素。
    getMin() —— 检索栈中的最小元素。
     
    示例:
    输入：
    ["MinStack","push","push","push","getMin", "pop","top","getMin"]
    [[],[-2],[0],[-3],[],[],[],[]]
    输出：
    [null,null,null,null,-3,null,0,-2]

    解释：
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin();   --> 返回 -3.
    minStack.pop();
    minStack.top();      --> 返回 0.
    minStack.getMin();   --> 返回 -2.

    提示：pop、top 和 getMin 操作总是在 非空栈 上调用。
    链接：https://leetcode-cn.com/problems/min-stack
*/
/**
 * =============================
 * 二刷
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
    let min = this.minStack[this.minStack.length-1];
    if (x < min || this.minStack.length === 0) {
    // if (x < min) {
        this.minStack.push(x);
    } else {
        this.minStack.push(min);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    // 我靠，不 return 的吗.....
    return this.minStack[this.minStack.length-1];
};

/**
 * =============================
 * 一刷
*/
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.MinStack = [];
    this.helperStack = [Number.MAX_SAFE_INTEGER];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.MinStack.push(x);
    let top = this.helperStack[this.helperStack.length-1];
    this.helperStack.push(Math.min(top, x));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.MinStack.pop();
    this.helperStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.MinStack[this.MinStack.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.helperStack[this.helperStack.length-1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */