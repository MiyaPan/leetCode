/**
 * 105. 从前序与中序遍历序列构造二叉树
 * 
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

/**
 * 前序 | [1 2 4 7 3 5 8 9 6]
 * 中序 | [4 7 2 1 8 5 9 3 6]
 * 后序 | [7 4 2 8 9 5 6 3 1]
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
/**
 * =============================
 * 二刷
*/
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
export const buildTree = (preorder, inorder) => {
    let n = preorder.length;
    if (n === 0) return null;

    let root = new TreeNode(preorder[0]);
    if (n === 1) return root;

    let rootIdx = inorder.indexOf(preorder[0]);

    let l = buildTree(preorder.slice(1,rootIdx+1), inorder.slice(0, rootIdx));
    let r = buildTree(preorder.slice(rootIdx+1), inorder.slice(rootIdx+1));
    root.left = l;
    root.right = r;
    return root;
}















/**
 * =============================
 * 一刷
*/
 // 耗时打败 5.07%, 因为多操作了 preorder 啊，preorder 每次都取头就行，不用 slice，因为会递归的先把所有左孩子创建完再创建右孩子，元素在创建左子的时候都背 shift 掉了
export const buildTree = (preorder, inorder) => {
    if (!preorder || preorder.length === 0 || !inorder || inorder.length === 0) {
        return null;
    }
    if (preorder.length === 1 || inorder.length === 1) {
        return {
            val: preorder[0],
            left: null,
            right: null
        }
    }
    // 获取新子树的 inorder 数组
    const rootData = preorder[0];
    const rootIndexInInorder = inorder.indexOf(rootData);
    const leftInorderData = inorder.slice(0, rootIndexInInorder + 1);
    const rightInorderData = inorder.slice(rootIndexInInorder + 1, inorder.length);

    // preOrder 不用管啊，shift 之后始终取第一个就行啊！！！
    // 获取新子树的 preorder 数组
    let lastOfLeftPart = 0;
    for (let i = 0; i < rootIndexInInorder; i++) {
        lastOfLeftPart = lastOfLeftPart < preorder.indexOf(inorder[i]) ? preorder.indexOf(inorder[i]) : lastOfLeftPart;
    }
    const leftPreorderData = preorder.slice(1, lastOfLeftPart + 1);
    const rightPreorderData = preorder.slice(lastOfLeftPart + 1);

    return {
        val: preorder[0],
        left: buildTree(leftPreorderData, leftInorderData),
        right: buildTree(rightPreorderData, rightInorderData)
    }
};

/**
 * 前序 | [1 2 4 7 3 5 8 9 6]
 * 中序 | [4 7 2 1 8 5 9 3 6]
 * 后序 | [7 4 2 8 9 5 6 3 1]
 * 
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
*/
// 72.88%
export const buildTree2 = (preorder, inorder) => {
    if (!preorder || preorder.length === 0 || !inorder || inorder.length === 0) {
        return null;
    }

    // 这种记得 shift 掉头
    // if (preorder.length === 1 || inorder.length === 1) {
    //     // return new TreeNode(preorder[0]);
    //     return new TreeNode(preorder.shift());
    // }

    const index = inorder.indexOf(preorder[0]);
    let root = new TreeNode(preorder.shift());
    root.left = buildTree2(preorder, inorder.slice(0, index));
    root.right = buildTree2(preorder, inorder.slice(index + 1));

    return root;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}



// 不用 slcie 数组，用指针，不看了，二刷有空再看吧，这是 leetcode 上别人的答案
export const buildTree3 = (preorder, inorder) => {
    var len = preorder.length;
    if(len === 0 && inorder.length === 0) return null;

    return _buildTree3(preorder, inorder, 0, len - 1, 0);
};
/*
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 
 * 前序 | [1 2 4 7 3 5 8 9 6]
 * 中序 | [4 7 2 1 8 5 9 3 6]
 * 后序 | [7 4 2 8 9 5 6 3 1]
*/
function _buildTree3(pre, vin, left, right, rootIndex) {
    var val = pre[rootIndex];
    var midIndex = vin.indexOf(val);
    var root = new TreeNode(val);
    if (midIndex > left)
        root.left = createTree(pre, vin, left, midIndex - 1, rootIndex + 1);
    if (midIndex < right)
        root.right = createTree(pre, vin, midIndex + 1, right, rootIndex + midIndex - left + 1);
    return root;
};
