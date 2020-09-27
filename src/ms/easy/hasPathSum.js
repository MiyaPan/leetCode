/**
 * 112. 路径总和
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

    说明: 叶子节点是指没有子节点的节点。

    示例: 
    给定如下二叉树，以及目标和 sum = 22，

                5
                / \
                4   8
            /   / \
            11  13  4
            /  \      \
            7    2      1
    返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

    链接：https://leetcode-cn.com/problems/path-sum
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum 
 * 
 * @return {boolean}
 */
// var hasPathSum = function(root, sum) {
//     if (!root)  return false;
//     // 只有根节点不算
//     return dfs(root, sum, 0);
// };
//  function dfs(root, sum, curSum) {
//     //  这样会把单枝的树，到半截对了，也会判断进来，所以不能到 null，而是判断是不是叶子节点
//     // if (!root) return curSum === sum;
//     if (!root) return false;
//     curSum += root.val;
//     if (root && !root.left && !root.right) return sum === curSum;
//     return dfs(root.left, sum, curSum) || dfs(root.right, sum, curSum);
//  }

//  精简一下
var hasPathSum = function(root, sum) {
    if (!root)  return false;
    if (!root.left && !root.right) return root.val === sum;
    // 只有根节点不算
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};