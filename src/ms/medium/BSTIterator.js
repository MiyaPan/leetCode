/**
 * 173. 二叉搜索树迭代器
    实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。
    调用 next() 将返回二叉搜索树中的下一个最小的数。

    示例：
    //     7
    //    / \
    //   3   15
    //      /  \
    //     9   20
    BSTIterator iterator = new BSTIterator(root);
    iterator.next();    // 返回 3
    iterator.next();    // 返回 7
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 9
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 15
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 20
    iterator.hasNext(); // 返回 false
     
    提示：
    next() 和 hasNext() 操作的时间复杂度是 O(1)，并使用 O(h) 内存，其中 h 是树的高度。
    你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 中至少存在一个下一个最小的数。

    链接：https://leetcode-cn.com/problems/binary-search-tree-iterator
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
// 一次成功，与答案算法二 一致~~
var BSTIterator = function(root) {
    if (!root) return null;

    this.stack = [];
    while(root) {
        this.stack.push(root);
        root = root.left;
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    if (this.stack.length > 0) {
        let next = this.stack.pop();
        let node = next.right;
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
        return next.val;
    }
    return null;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
