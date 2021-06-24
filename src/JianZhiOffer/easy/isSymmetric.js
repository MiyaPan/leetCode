/**
 * 剑指 Offer 28. 对称的二叉树
 * https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/
*/
var isSymmetric = function(root) {
    if (!root) return true;
    return dfs(root.left, root.right) && dfs(root.right, root.left);
};
function dfs(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return dfs(a.left, b.right) && dfs(a.right, b.left);
}
