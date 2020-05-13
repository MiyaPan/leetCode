/**
 * 面试题55 - II. 平衡二叉树
 * 
 * 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
    
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
export const isBalanced2 = (root) => {
    let flag = true;
    _isBalanced(root);

    function _isBalanced(root) {
        if (!root) {
            return 0;
        }
    
        let l = _isBalanced(root.left);
        let r = _isBalanced(root.right);
    
        if (Math.abs(l-r) > 1) {
            flag = false;
        }

        return (l > r ? l : r) + 1;
    }

    return flag;
}
