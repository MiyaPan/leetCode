/**
 * 965. 单值二叉树
 * 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。
    只有给定的树是单值二叉树时，才返回 true；否则返回 false。

    示例 1：

    输入：[1,1,1,1,1,null,1] // 使用 createTreeByLevelTraseval
    输出：true
    示例 2：

    输入：[2,2,2,5,2]
    输出：false

    提示：
    给定树的节点数范围是 [1, 100]。
    每个节点的值都是整数，范围为 [0, 99] 。
*/
export const isUnivalTree = (root) => {
    if (!root) {
        return true;
    }

    let value = root.val;
    let flag = true;
    _isUnivalTree(root);

    function _isUnivalTree(root) {
        if (!root) {
            return;
        }
        if (value !== root.val) {
            flag = false;
            return;
        } else {
            _isUnivalTree(root.left);
            _isUnivalTree(root.right);
        }
    }

    return flag;
}
