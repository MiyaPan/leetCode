/**
 * 剑指 Offer 34. 二叉树中和为某一值的路径
 * https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
*/
var pathSum = function(root, sum) {
    if (!root) return [];

    let ans = [];
    let path = [];
    dfs(root, path, ans, 0, sum);
    return ans;
}
function dfs(root, path, ans, sum, target) {
    if (!root.left && !root.right) {
        if (sum + root.val === target) {
            ans.push([...path, root.val]);
        }
        return;
    }

    path.push(root.val);
    root.left && dfs(root.left, path, ans, sum+root.val, target);
    root.right && dfs(root.right, path, ans, sum+root.val, target);
    path.pop();
}