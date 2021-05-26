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
/**
 * =============================
 * 二刷
*/
var  kthSmallest= function(root, k) {
    let stack = [];
    let node = root;
    while (stack.length || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        let temp = stack.pop();
        if (k === 1) {
            return temp.val;
        } else {
            k--;
        }

        node = temp.right;
    }
    return -1;
}











/**
 * =============================
 * 一刷
*/
// 都不会写中序的非递归了
var  kthSmallest= function(root, k) {
    if (!root) return 0;
    let ans = [];
    dfs(root, ans);
    
    return ans[k-1];
};

function dfs(root, ans) {
    if (root.left) dfs(root.left, ans);
    ans.push(root.val);
    if (root.right) dfs(root.right, ans);
}
