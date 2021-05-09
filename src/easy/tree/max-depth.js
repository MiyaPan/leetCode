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
 * 二刷，done
*/

// note: 只要没要求非递归，优先想递归
export const maxDepth = (root) => {
    if (!root) {
        return 0;
    }

    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);
    return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
    // 这里写了 4 个maxDepth，会调用 4个递归栈，超时，这种递归的就单独存变量吧！
    // return 1 + (maxDepth(root.left) > maxDepth(root.right) ? maxDepth(root.left) : maxDepth(root.right));
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