/**
import { isBalanced } from '../../easy/tree/is-balanced-tree';
 * 剑指 Offer 55 - II. 平衡二叉树
 * https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/
*/
var isBalanced = function(root) {
    return dfs(root).isBalanced;
};
function dfs(root) {
    if (!root) return {
        depth: 0,
        isBalanced: true
    }
    let l = dfs(root.left);
    let r = dfs(root.right);

    return {
        depth: Math.max(l.depth, r.depth) + 1,
        isBalanced: l.isBalanced && r.isBalanced && Math.abs(l.depth-r.depth) <= 1
    }
}
