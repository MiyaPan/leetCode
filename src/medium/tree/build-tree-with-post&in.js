/**
 * 106. 从中序与后序遍历序列构造二叉树
 * 
 * 根据一棵树的中序遍历与后序遍历构造二叉树。

    注意:
    你可以假设树中没有重复的元素。

    例如，给出

    中序遍历 inorder = [9,3,15,20,7]
    后序遍历 postorder = [9,15,7,20,3]
    返回如下的二叉树：

         3
        / \
        9  20
          /  \
         15   7

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
*/
export const buildTree = (inorder, postorder) => {
    const result = [];
    _buildTree(inorder, postorder);

    function _buildTree(inorder, postorder) {
        if (!inorder.length || !postorder.length) {
            return null;
        }
    
        const index = inorder.indexOf(postorder[postorder.length-1]);
        const root = new TreeNode(postorder.pop());
    
        // 区别就是先 右 后 左：因为 postorder 是逆序挨个 pop，左右得在 inorder 中先找右边，
        // 先找左边会找不到 postorder[postorder.length-1]
        root.right = _buildTree(inorder.slice(index+1), postorder);
        root.left = _buildTree(inorder.slice(0, index), postorder);
    
        // 同时这里可以输出前序，这里是逆序的，转一下就行
        result.push(root.val);
    
        return root;
    }

    return result.reverse();
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
