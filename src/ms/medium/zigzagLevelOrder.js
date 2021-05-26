/**
 * 103. 二叉树的锯齿形层次遍历
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

    例如：
    给定二叉树 [3,9,20,null,null,15,7],

     3
    / \
    9  20
      /  \
     15   7
    返回锯齿形层次遍历如下：

    [
    [3],
    [20,9],
    [15,7]
    ]

    链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal
*/
/**
 * =============================
 * 二刷
*/
export const zigzagLevelOrder = (root) => {
    if (!root) return [];

    let stack = [root];
    let p = 0;
    let ans = [];
    let count = 0;
    while (p < stack.length) {
        let nodesInNextLevel = [];
        let nodesInCurLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            nodesInCurLevel.push(node.val);
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }

        if (count % 2 === 0) {
            ans.push(nodesInCurLevel);
        } else {
            ans.push(nodesInCurLevel.reverse());
        }
    
        count++;
        stack = stack.concat(nodesInNextLevel);
    }
    return ans;
}












/**
 * =============================
 * 二刷
*/
// 也是BFS和DFS两种：
/**
 * BFS：深度遍历，用递归，每递归一层，level++，从左到右的遍历，会把元素挨个放到result[level]中
 * DFS：层序遍历改写，每次一口气弹出一层，一口气把下一层全放到队列里，而不是一个元素一个元素的加，然后逆转奇数层的数组，就可以了
 * 下面默写 DFS：
*/
export const zigzagLevelOrder = (root) => {
    if (!root) {
        return [];
    }

    let p = 0;
    let stack = [root];
    let level = 0;
    let ans = [];
    let node = null;

    while(p < stack.length) {
        let nodesInCurLevel = [];
        let nodesInNextLevel = [];
        while(p < stack.length) {
            node = stack[p++];
            nodesInCurLevel.push(node.val);

            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        if (level % 2 === 1) {
            nodesInCurLevel.reverse();
        }
        ans.push(nodesInCurLevel);
        level++;
        stack = stack.concat(nodesInNextLevel);
    }

    return ans;
}
