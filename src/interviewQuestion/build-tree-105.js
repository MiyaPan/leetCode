/**
 * 面试题07. 重建二叉树
 * https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/
*/
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
export const buildTree3 = (preorder, inorder) => {

    if (!preorder.length) return null;

    const rootValue = preorder.shift();
    const root = new TreeNode(rootValue);
    // 这里不用判断的，0 的是都有了，递归下去就好，你要判断也别先 shift 再判长度
    // if (preorder.length === 1) return root;

    const indexOfInorder = inorder.indexOf(rootValue);

    root.left = buildTree(preorder.slice(0, indexOfInorder), inorder.slice(0, indexOfInorder));
    root.right = buildTree(preorder.slice(indexOfInorder), inorder.slice(indexOfInorder+1));
    return root;
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
