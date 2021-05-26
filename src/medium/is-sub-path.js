/**
 * 1367. 二叉树中的列表
 * https://leetcode-cn.com/problems/linked-list-in-binary-tree/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 下面这种一遍 dfs 是不行了，可能存在根节点就是head的头结点，dfs 左边去了，又不完全匹配，右子树就没办法包含root，导致失败
// 试下如果每次不对，就把树上的节点置回第一个发现的节点，用visited保存已访问的? 也不行，visited 保存哪些呢，会导致visited 的都不访问了
export const isSubPath = (head, root) => {
    let foundTarget = false;
    let match = false;
    let headCopy = head;

    function dfs(root) {
        if (!root) return;
    
        if (root.val === head.val) foundTarget = true;

        if (foundTarget) {
            if (head.next) {
                if (root.left && head.next.val === root.left.val) {
                    head = head.next;
                    dfs(root.left);
                } else if (root.right && head.next.val === root.right.val) {
                    head = head.next;
                    dfs(root.right);
                } else {
                    head = headCopy;
                }
            } else {
                match = true;
            }
        } else {
            dfs(root.left);
            dfs(root.right);
        }
    }

    dfs(root);

    return match;
}

// 一遍 dfs 不行的问题，就递归，去递归的判子节点
export const isSubPath = (head, root) => {
    if (!root) return false;
    
    return isSubPathLoop(head, root) || isSubPath(head, root.left) || isSubPath(head, root.right);
}

function isSubPathLoop(head, root) {
    // 这两个 if 有优先级的
    if (!head) return true;

    if (!root) return false;

    if (root.val !== head.val) return false;

    return isSubPathLoop(head.next, root.left) || isSubPathLoop(head.next, root.right);
}
