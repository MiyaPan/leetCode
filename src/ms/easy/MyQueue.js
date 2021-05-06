/**
 * 232. 用栈实现队列
 * 使用栈实现队列的下列操作：

    push(x) -- 将一个元素放入队列的尾部。
    pop() -- 从队列首部移除元素。
    peek() -- 返回队列首部的元素。
    empty() -- 返回队列是否为空。

    示例:
    MyQueue queue = new MyQueue();
    queue.push(1);
    queue.push(2);  
    queue.peek();  // 返回 1
    queue.pop();   // 返回 1
    queue.empty(); // 返回 false

    说明:
    你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
    你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
    假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
    
    进阶：
    你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。

    链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
*/
/**
 * =============================
 * 二刷
*/
// 用一个栈的实现见 622. 设计循环队列
// 用两个还有点巧妙呢...
var MyQueue = function() {
    this.s1 = [];
    this.s2 = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.s1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    while (this.s1.length) {
        this.s2.push(this.s1.pop());
    }
    let result = this.s2.pop();
    while (this.s2.length) {
        this.s1.push(this.s2.pop());
    };
    return result;
}

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.s1[0];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.s1.length === 0;
};

/**
 * =============================
 * 一刷
*/
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.s1 = [];
    this.s2 = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.s1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.s2.length) {
        return this.s2.pop();
    }
    while(this.s1.length) {
        this.s2.push(this.s1.pop());
    }
    return this.s2.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.s2.length) {
        return this.s2[this.s2.length-1];
    }
    while(this.s1.length) {
        this.s2.push(this.s1.pop());
    }
    return this.s2[this.s2.length-1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.s1.length === 0 && this.s2.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */