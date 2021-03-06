/**
 * 100. 相同的树
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
示例 3:

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false

链接：https://leetcode-cn.com/problems/same-tree
*/
/**
 * =============================
 * 二刷
*/
export const isSameTree = (p, q) => {
    return dfs(p, q);
}
function dfs(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return dfs(p.left, q.left) && dfs(p.right, q.right);
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 18.04%，递归
export const isSameTree = (p, q) => {
    return dfs(p,q);
}

function dfs(p,q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return dfs(p.left,q.left) && dfs(p.right,q.right);
}

