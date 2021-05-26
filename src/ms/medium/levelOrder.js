/**
 * 102. 二叉树的层序遍历
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

示例：
二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层序遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
*/
/**
 * =============================
 * 二刷
*/
export const levelOrder = (root) => {
    if (!root) return [];
    let stack = [root];
    let ans = [[root.val]];
    let p = 0;
    let nodesInNextLevel = [];
    let nodesValInNextLevel = [];
    while (p < stack.length) {
        nodesInNextLevel = [];
        nodesValInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (node.left) {
                nodesInNextLevel.push(node.left);
                nodesValInNextLevel.push(node.left.val);
            }
            if (node.right) {
                nodesInNextLevel.push(node.right);
                nodesValInNextLevel.push(node.right.val);
            }
        }
        stack = stack.concat(nodesInNextLevel);
        nodesValInNextLevel.length > 0 && ans.push(nodesValInNextLevel);
    }
    return ans;
}
/**
 * =============================
 * 一刷
*/
export const levelOrder = (root) => {
    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
    if (!root) {
        // 这里记得返回 []，而不是 null
        return [];
    }

    let stack = [root];
    let pointer = 0;
    let result = [];

    while(pointer < stack.length) {
        let nodesInNextLevel = [];
        let resInCurLevel = [];
        // 两次 while 只是为了不使用 pop 和 push，快一点，没别的
        while(pointer < stack.length) {
            let node = stack[pointer];
            resInCurLevel.push(node.val);
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
            pointer++;
        }

        stack = stack.concat(nodesInNextLevel);
        result.push(resInCurLevel);
    }

    return result;
}