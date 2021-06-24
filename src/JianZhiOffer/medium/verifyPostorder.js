/**
 * 剑指 Offer 33. 二叉搜索树的后序遍历序列
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
*/
var verifyPostorder = function(postorder) {
    let n = postorder.length;
    if (n <= 1) return true;

    let root = postorder[n-1];

    let rightStart = n-2;
    // [5, 4, 3, 2, 1]
    // let leftStart = n-1;
    let leftStart = -1;
    for (let i = n-2; i >= 0; i--) {
        if (postorder[i] < root) {
            leftStart = i;
            break;
        }
    }

    // 检查
    for (let i = rightStart; i > leftStart; i--) {
        if (postorder[i] < root) return false;
    }
    for (let i = leftStart; i >= 0; i--) {
        if (postorder[i] > root) return false;
    }
    return verifyPostorder(postorder.slice(0, leftStart+1)) && verifyPostorder(postorder.slice(leftStart+1, n-1));
};
