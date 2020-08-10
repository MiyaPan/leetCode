/**
 * 前序 | [1 2 4 7 3 5 8 9 6]
 * 中序 | [4 7 2 1 8 5 9 3 6]
 * 后序 | [7 4 2 8 9 5 6 3 1]
*/
// 因为这样递归的方式就是先构建左子，再右子，再回退递归栈到上一层，也就是根，所以按照这个顺序正好就是
export const getPostByPreAndIn = (preorder, inorder) => {
    let result = [];

    const root = _getPostByPreAndIn(preorder, inorder);

    function _getPostByPreAndIn(preorder, inorder) {
        if (!preorder || !inorder || inorder.length === 0  || preorder.length  === 0 ) {
            return null;
        }
    
        const index = inorder.indexOf(preorder[0]);
        const root = new TreeNode(preorder.shift());
    
        root.left = _getPostByPreAndIn(preorder, inorder.slice(0, index));
        root.right = _getPostByPreAndIn(preorder, inorder.slice(index+1));

        result.push(root.val)
    
        return root;
    }

    return result;
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
