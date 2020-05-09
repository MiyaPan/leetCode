/**
 * 563. 二叉树的坡度
 * 给定一个二叉树，计算整个树的坡度。
 * 
    一个树的节点的坡度定义即为，该节点左子树的结点之和和右子树结点之和的差的绝对值。空结点的坡度是0。
    整个树的坡度就是其所有节点的坡度之和。

    示例:

    输入: 
            1
          /   \
         2     3
    输出: 1
    解释: 
    结点的坡度 2 : 0
    结点的坡度 3 : 0
    结点的坡度 1 : |2-3| = 1
    树的坡度 : 0 + 0 + 1 = 1
    注意:

    任何子树的结点的和不会超过32位整数的范围。
    坡度的值不会超过32位整数的范围。
*/
// 思路：遍历，边遍历边记录每个节点的 tilt，加到总数中，同时递归 return 左子和+右子和+自己的值 给父节点用
export const findTilt = (root) => {

    let totoalTilt = 0;

    _findTilt(root);

    function _findTilt(root) {
        if (!root) {
            return 0;
        }
    
        let leftSum = _findTilt(root.left);
        let rightSum = _findTilt(root.right);
        let tilt = Math.abs(leftSum - rightSum);

        totoalTilt += tilt;
    
        return leftSum + rightSum + root.val;
    }

    return totoalTilt;
}
