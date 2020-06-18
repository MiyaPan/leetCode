/**
 * 1379. 找出克隆二叉树中的相同节点
 * https://leetcode-cn.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/
*/

/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */
export const getTargetCopy = (original, cloned, target) => {
    if (!original || !cloned || !target) return null;

    if (original === target) return cloned;

    return getTargetCopy(original.left, cloned.left, target) || getTargetCopy(original.right, cloned.right, target);
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
