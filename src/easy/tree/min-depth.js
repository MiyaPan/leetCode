/**
 * 111. 二叉树的最小深度
 * 
 * 给定一个二叉树，找出其最小深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

    示例：
    给定二叉树 [3,9,20,null,null,15,7]，

        3         1
       / \       /
      9  20     2
        /  \
       15   7
    返回它的最小深度 2
*/
/**
 * =============================
 * 二刷
*/
export const minDepth = (root) => {
    if (!root) return 0;
    let min = Number.MAX_SAFE_INTEGER;
    const dfs = (root, count) => {
        // 不能遇到空节点就判断，必须到叶子再判断
        // [2,null,3,null,4,null,5,null,6]
        count++;
        if (!root.left && !root.right) {
            min = Math.min(count, min);
            return;
        }
        root.left && dfs(root.left, count);
        root.right && dfs(root.right, count);
    };
    dfs(root, 0);
    return min;
}

/**
 * =============================
 * 一刷
*/
// 和最大深度的区别就是：只有一颗子树的情况，只有一个子树时，不能返回0那边，要返回有子树的那边，对吧，要不就没到叶子节点啊。。。
/**
 * 最大深度因为算的左右孩子大的+1，所以即使有一个0的时候，不会选0，两个都0的话，选0正确，
 * 所以本质是选择非0的leftdepth 和rightdepth中的较大+1,递归式完美的处理了这个问题，
 * 而最小不然，因为如果出现一个0， 那么递归式会选0，于是出错了。
*/
export const minDepth = (root) => {
    if (!root) {
        return 0;
    }

    let leftDepth = minDepth(root.left);
    let rightDepth = minDepth(root.right);
    if (root.left === null) {
        return rightDepth + 1;
    }

    if (root.right === null) {
        return leftDepth + 1;
    }

    return 1 + (leftDepth > rightDepth ?  rightDepth : leftDepth);
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