/**
 * 剑指 Offer 55 - I. 二叉树的深度
 * https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/
*/
var maxDepth = function(root) {
    return dfs(root);
};
function dfs(root) {
    if (!root) return 0;
    let l = dfs(root.left);
    let r = dfs(root.right);
    return Math.max(l, r) + 1;
}