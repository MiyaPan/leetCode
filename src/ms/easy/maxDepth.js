/**
 * 104. 二叉树的最大深度
 * 
 * 给定一个二叉树，找出其最大深度。

    二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

    说明: 叶子节点是指没有子节点的节点。

    示例：
    给定二叉树 [3,9,20,null,null,15,7]，

        3
       / \
      9  20
        /  \
       15   7
    返回它的最大深度 3 
*/
/**
 * =============================
 * 二刷
*/
export const maxDepth = (root) => {
    return dfs(root);
}
function dfs(root) {
    if (!root) return 0;
    let l = dfs(root.left);
    let r = dfs(root.right);
    return Math.max(l, r) + 1;
}

/**
 * =============================
 * 一刷
*/
export const maxDepth = (root) => {
    if (!root) {
        return 0;
    }

    let l = maxDepth(root.left);
    let r = maxDepth(root.right);

    return Math.max(l, r) + 1;
}


// DFS 就是层序 + level 那套，不再赘述


// DFS，中序“一捅到底”那套，不通，耗时太多了，二刷再想吧，好像非递归+前序简单，可以试试
// export const maxDepthDFS = (root) => {
//     if (!root) {
//         return 0;
//     }

//     let stack = [root];
//     let node = root.left;
//     // 因为 root 已经先放进去了
//     let maxDepth = 1;
//     let deep = 1;

//     /**
//      *            5
//      *        /        \
//      *       2          8
//      *     /   \       / \
//      *    1     4     7   9
//      *   /     /     /
//      *  0     3     6
//      *   \
//      *    10
//     */
//     /**
//         3
//        / \
//       9  20
//         /  \
//        15   7
//     */
//     while(stack.length || node) {
//         // 一捅到底
//         while(node) {
//             stack.push(node);
//             node = node.left;
//             deep++;
//             maxDepth = deep > maxDepth ? deep : maxDepth;
//         }

//         // 捅到最左了，右转
//         node = stack.pop();
//         node = node.right;
//         if (!node) {
//             deep--;
//         } else {
//             deep++;
//         }
//         maxDepth = deep > maxDepth ? deep : maxDepth;
//     }

//     return maxDepth;
// }