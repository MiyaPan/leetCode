/**
 * 110. 平衡二叉树
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
    本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

    示例 1:
    给定二叉树 [3,9,20,null,null,15,7]

        3
       / \
      9  20
        /  \
       15   7
    返回 true 。

    示例 2:
    给定二叉树 [1,2,2,3,3,null,null,4,4]

         1
        / \
       2   2
      / \
     3   3
    / \
   4   4
    返回 false 。
*/
export const isBalanced = (root) => {
    if (!root) {
        return true;
    }

    if (Math.abs(getDepth(root.left) - getDepth(root.right)) < 2
        /**
         * 这种情况还要单独判断每颗子树啊啊啊啊
         *        1
         *       / \
         *      2   2
         *     /     \
         *    3       3
         *   /         \
         *  4           4
        */
        && isBalanced(root.left)
        && isBalanced(root.right)) {
        return true;
    }

    return false;

    function getDepth(node) {
        if (!node) {
            return 0;
        }

        let leftDepth = getDepth(node.left);
        let rightDepth = getDepth(node.right);

        return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
    }
}
