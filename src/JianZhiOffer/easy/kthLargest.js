/**
 * 剑指 Offer 54. 二叉搜索树的第k大节点
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
*/
var kthLargest = function(root, k) {
    let ans = [];
    dfs(root, ans)
    return ans[ans.length-k];
}
function dfs(root, ans) {
    if (!root) return;
    dfs(root.left);
    ans.push(root.val);
    dfs(root.right);
}
var kthLargest = function(root, k) {
    let stack = [];
    let ans = [];
    let node = root;
    while (stack.length || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        ans.push(node.val);
        node = node.right;
    }
    return ans[ans.length-k];
};
