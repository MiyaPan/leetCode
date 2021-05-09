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
/**
 * =============================
 * 二刷
*/
export const invertTree = (root) => {
    if (!root) return null;
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
}


/**
 * =============================
 * 一刷
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

