/**
 * 236. 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
    百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，
    满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

    例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

    示例 1:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
    输出: 3
    解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

    示例 2:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
    输出: 5
    解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
    
    提示：
    树中节点数目在范围 [2, 105] 内。
    -109 <= Node.val <= 109
    所有 Node.val 互不相同 。
    p != q
    p 和 q 均存在于给定的二叉树中。
    说明: 所有节点的值都是唯一的。p、q 为不同节点且均存在于给定的二叉树中。
*/
// TODO: 三刷，存储父节点的方法不错，或许以后会用到
/**
 * =============================
 * 二刷
 * 存储父节点的方法不错，或许以后会用到
 * 写的比较复杂，但是也算清晰吧，总比答案好看
*/
export const lowestCommonAncestor = (root, p, q) => {
    return dfs(root, p, q).target;
}
function dfs(root, p, q) {
    if (!root) return {};

    let curIsP = false;
    if (root === p)  {
        curIsP = true;
    }
    let curIsQ = false;
    if (root === q)  {
        curIsQ = true;
    }
    let {findP: lfindP, findQ: lfindQ, target: ltarget} = dfs(root.left, p, q);
    let {findP: rfindP, findQ: rfindQ, target: rtarget} = dfs(root.right, p, q);

    let findPNode = curIsP || lfindP || rfindP;
    let findQNode = curIsQ || lfindQ || rfindQ;

    return {
        findP: findPNode,
        findQ: findQNode,
        // 如果 l 或 r 返回的 target 不空了，就不要计算了，直接返回，计算会返回最根节点--
        target: ltarget || rtarget || findPNode && findQNode && root
    }
}













/**
 * =============================
 * 一刷
*/
export const lowestCommonAncestor = (root, p, q) => {
    if (!root) return null;
    const pathP = dfs(root, p, []);
    const pathQ = dfs(root, q, []);

    const minLen = Math.min(pathP.length, pathQ.length);
    
    for (let i = 0; i <= minLen; i++) {
        if (pathP[i] !== pathQ[i]) return pathP[i-1];
    }
}

function dfs(root, tar, path) {
    if (!root) return;

    path.push(root);
    if (root === tar) return [...path];

    const l = root.left && dfs(root.left, tar, path);
    const r = !l && root.right && dfs(root.right, tar, path);

    path.pop();

    return l || r;
}
