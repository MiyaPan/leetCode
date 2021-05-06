/**
 * 使用队列实现栈的下列操作：

    push(x) -- 元素 x 入栈
    pop() -- 移除栈顶元素
    top() -- 获取栈顶元素
    empty() -- 返回栈是否为空

    注意:
    你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。
    你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
    你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。

    链接：https://leetcode-cn.com/problems/implement-stack-using-queues
*/
/**
 * =============================
 * 二刷
 * 一刷只用了一个 queue，思路不错哦，把队列的尾巴放到头上，执行 len-1 次，最后一个元素就是队列的头元素啦，就可以 pop 了
*/
var MyStack = function() {
    this.q1 = [];
    this.q2 = [];
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.q1.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    while(this.q1.length > 1) {
        // this.q2.push(this.q1.pop());
        // 这里还是 用 shift、js 木有 queue、还是得数组模仿
        this.q2.push(this.q1.shift());
    }
    let result = this.q1.pop();
    this.q1 = this.q2;
    this.q2 = [];
    return result;
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.q1[this.q1.length-1];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.q1.length === 0;
};

/**
 * =============================
 * 一刷
*/
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    this.s = [];
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.s.push(x);
    let len = this.s.length;
    while(len > 1) {
        this.s.push(this.s.shift());
        len--;
    }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    return this.s.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.s[0];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.s.length === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */