/**
 * 105. 从前序与中序遍历序列构造二叉树
 * 
    根据一棵树的前序遍历与中序遍历构造二叉树。

    注意:
    你可以假设树中没有重复的元素。

    例如，给出
    前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
    返回如下的二叉树：

     3
    / \
    9  20
      /  \
     15   7
*/

/*
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 
 * 前序 | [1 2 4 7 3 5 8 9 6]
 * 中序 | [4 7 2 1 8 5 9 3 6]
 * 后序 | [7 4 2 8 9 5 6 3 1]
*/
export const buildTree4 = (preorder, inorder) => {
    if (preorder.length === 0 || inorder.length === 0) return null;

    return build(0, 0, inorder.length-1, preorder, inorder);
};

function build(rootIdxInPre, inStart, inEnd, preorder, inorder) {
    // [1,2,3]
    // [2,3,1]
    if (rootIdxInPre >= preorder.length || inStart > inEnd) return null;
    const rootVal = preorder[rootIdxInPre];
    let root = new TreeNode(rootVal);

    const rootIdxInInorder = inorder.indexOf(rootVal);
    if (rootIdxInInorder > inStart) {
        root.left = build(rootIdxInPre+1, inStart, rootIdxInInorder-1, preorder, inorder);
    }
    if (rootIdxInInorder < inEnd) {
        // 下一个根是现在的根在 inorder 中的 index 加上左子树的个数
        root.right = build(rootIdxInPre+(rootIdxInInorder-inStart)+1, rootIdxInInorder+1, inEnd, preorder, inorder);
    }

    return root;
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
