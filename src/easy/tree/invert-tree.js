/**
 * 226. 翻转二叉树
 * 翻转一棵二叉树。
    输入：

        4
      /   \
     2     7
    / \   / \
   1   3 6   9
    输出：

        4
      /   \
     7     2
    / \   / \
   9   6 3   1
*/
export const invertTree = (root) => {

    _invertTree(root);
    
    function _invertTree(root) {
        if (!root) {
            return null;
        }
    
        const temp = root.right;
        root.right = root.left;
        root.left = temp;
        _invertTree(root.left);
        _invertTree(root.right);
    }

    return root;
}

