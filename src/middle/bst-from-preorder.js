
/**
 * 1008. 先序遍历构造二叉树
 * 返回与给定先序遍历 preorder 相匹配的二叉搜索树（binary search tree）的根结点。
    (回想一下，二叉搜索树是二叉树的一种，其每个节点都满足以下规则，对于 node.left 的任何后代，值总 < node.val，而 node.right 的任何后代，值总 > node.val。此外，先序遍历首先显示节点的值，然后遍历 node.left，接着遍历 node.right。）

    示例：

    输入：[8,5,1,7,10,12]
    输出：[8,5,10,1,7,null,12]

    提示：
    1 <= preorder.length <= 100
    先序 preorder 中的值是不同的。
    链接：https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal
*/
export const bstFromPreorder = (preorder) => {
    if (!preorder.length) return null;
    if (preorder.length === 1) return new TreeNode(preorder[0]);


    let root = new TreeNode(preorder[0]);

    let rightIndex = -1;
    for (let i = 0; i < preorder.length; i++) {
        if (preorder[i] > preorder[0]) {
            rightIndex = i;
            break;
        }
    }

    if (!~rightIndex) {
        root.left = bstFromPreorder(preorder.slice(1));
    } else {
        root.left = bstFromPreorder(preorder.slice(1, rightIndex));
        root.right = bstFromPreorder(preorder.slice(rightIndex));
    }

    return root;
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
