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
    let ans = true;

    function dfs(root) {
        if (!root) {
            return 0;
        }
    
        let l = dfs(root.left);
        let r = dfs(root.right);
    
        if (Math.abs(l -r) > 1) {
            ans = false;
        }
        return Math.max(l,r) + 1;
    }

    dfs(root);

    return ans;
}
