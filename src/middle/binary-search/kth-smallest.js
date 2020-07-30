/**
 * 230. 二叉搜索树中第K小的元素
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
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
 * @param {number} k
 * @return {number}
 */
var  kthSmallest= function(root, k) {
    if (!root) return 0;

    let count = 0;
    let node = root;
    let stack = [root];
    while(stack.length) {
        while(node) {
            stack.push(node);
            node = node.left;
        }
        count++;
        node = stack.pop();
        if (count === k) return node.val;
        node = node.right;
    }
};

// 要不就 dfs 所有节点成数组，然后返回 arr[k-1]，没有剪枝，好的情况会慢点
var  kthSmallest= function(root, k) {
    let stack = [];
    dfs(root, stack);
    return stack[k-1];
}
function dfs(root, stack) {
    if (!root) return 0;

    dfs(root.left, stack);
    stack.push(root.val);
    dfs(root.right, stack);
}
