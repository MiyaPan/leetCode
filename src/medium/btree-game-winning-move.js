
/**
 * 1145. 二叉树着色游戏
 * 链接：https://leetcode-cn.com/problems/binary-tree-coloring-game/
*/
/**
 * =============================
 * 二刷
*/
var btreeGameWinningMove = function(root, n, x) {
    let nodex = findX(root, x);
    let lchildren = dfs(nodex.left);
    let rchildren = dfs(nodex.right);
    let rest = n-1-lchildren-rchildren;
    if (lchildren >= n/2 || rchildren >= n/2 || rest >= n/2) return true;
    return false;
};
function findX(root, x) {
    if (!root) return false;
    if (root.val === x) return root;
    return findX(root.left, x) || findX(root.right, x);
}
function dfs(root) {
    if (!root) return 0;
    return dfs(root.left) + 1 + dfs(root.right);
}


















/**
 * =============================
 * 一刷
*/
// 一旦红色落子，就去看红色的左子，右子和父节点的连通分量的大小，有没有一个能超过 n/2 的，有就占领它，必然能赢
// 注意：红子的左右子树数量都可以通过 dfs 来得到。且！！！红子父元素那半边的连通分量不需要再遍历了！！！！不需要了，用总结点数减去 红的左右子和红子就行了！！！
// 要不题目给你 n 做啥！！！要是有条件没用上，就没得到最简单的思路！！！
export const btreeGameWinningMove = (root, n, x) => {
    redL = 0;
    redR = 0;

    // dfs 统计子树数量
    function dfs(root) {
        if (!root) return 0;
    
        const l = dfs(root.left);
        const r = dfs(root.right);

        if (root.val === x) {
            redL = l;
            redR = r;
        }

        return l + r + 1;
    }

    dfs(root);

    const parent = n - redL - redR - 1;

    // return parent > n/2 || redL > n/2 || redR > n/2;
    // js 没有 any，只有 some 和 every
    // return [parent, redL, redR].any(item => item > n/2);
    return [parent, redL, redR].some(item => item > n/2);
}


