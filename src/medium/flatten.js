/**
 * 114. 二叉树展开为链表
 * 给定一个二叉树，原地将它展开为链表。
    例如，给定二叉树

        1
       / \
      2   5
     / \   \
    3   4   6
    将其展开为：
    1
     \
      2
       \
        3
         \
          4
           \
            5
             \
              6
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 /**
  *  将其展开为：
    1
     \
      2
       \
        3
         \
          4
           \
            5
             \
              6
  *     1
       / \
      2   5
     / \   \
    3   4   6
 */
export const flatten = (root) => {
    if (!root) {
        return null;
    }

    const stack = root.right ? [root.right] : [];
    let node = root.left;
    let current = root;
    
    while(stack.length || node) {
        while(node) {
            node.right && stack.push(node.right);

            current.right = node;
            current.left = null;

            current = current.right;
            node = current.left;
        }

        node = stack.pop();
        // node = node.right;
    }
};

// https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/114-er-cha-shu-zhan-kai-wei-lian-biao-by-ming-zhi-/
// 这人思路总结的挺好，得看看 -- 二刷，自己想到了一样的~耶✌️
