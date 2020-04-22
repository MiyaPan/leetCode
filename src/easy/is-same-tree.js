/**
 * 100. 相同的树
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
示例 3:

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/same-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 18.04%，递归
export const isSameTree = (p, q) => {
    if (!p && !q) {
        return true;
    }

    if (!p || !q) {
        return false;
    }

    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 上面递归改循环
export const isSameTree1 = (p, q) => {
    if (!p && !q) {
        return true;
    }

    if (!p || !q) {
        return false;
    }

    while(p && q) {
        if (p.val === q.val) {
            p = p.left;
        }
    }
}
