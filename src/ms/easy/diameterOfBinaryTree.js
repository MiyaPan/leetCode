/**
 * 543. 二叉树的直径
 * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

    给定二叉树

            1
           / \
          2   3
         / \     
        4   5    
    返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

    注意：两结点之间的路径长度是以它们之间边的数目表示。
*/
/**
 * =============================
 * 二刷
*/
export const diameterOfBinaryTree = (root) => {
    // return getMaxDepth(root, 0).curMax;
    // 是返回路径数，不是路径上的节点数，所以减 1
    return getMaxDepth(root, 0).curMax - 1;
}
function getMaxDepth(root, max) {
    if (!root) return {
        depth: 0,
        curMax: 0
    }
    let {depth: l, curMax: lMax} = getMaxDepth(root.left, max);
    let {depth: r, curMax: rMax} = getMaxDepth(root.right, max);

    return {
        depth: Math.max(l, r) + 1,
        curMax: Math.max(max, lMax, rMax, l+r+1)
    }
}

/**
 * =============================
 * 一刷
*/
export const diameterOfBinaryTree = (root) => {
    let max = 0;
    const getMaxdepth = (root) => {
        if (!root) return 0;

        const l = getMaxdepth(root.left);
        const r = getMaxdepth(root.right);

        // max = Math.max(l + r + 1, max);
        // 不加 1，不然就被加了两次了
        max = Math.max(l + r, max);
        
        return Math.max(l,r) + 1;
    };

    getMaxdepth(root);

    return max;
}
