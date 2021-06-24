/**
 * 剑指 Offer 27. 二叉树的镜像
 * https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/
*/
var mirrorTree = function(root) {
    return dfs(root);
};
function dfs(root) {
    if (!root) return null;
    let newRoot = new TreeNode(root.val);
    newRoot.left = dfs(root.right);
    newRoot.right = dfs(root.left);
    return newRoot;
}