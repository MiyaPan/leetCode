/**
 * 114. 二叉树展开为链表
 * 给定一个二叉树，原地将它展开为链表。
链接：https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list

    • 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
    • 展开后的单链表应该与二叉树 先序遍历 顺序相同。

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

    const left = flatten(root.left);
    const right = flatten(root.right);

    if (left) {
        root.right = left;
        root.left = null;
    
        let node = left;
        while(node && node.right) {
            node = node.right;
        }
    
        node.right = right;
    }

    return root;
};

// https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/114-er-cha-shu-zhan-kai-wei-lian-biao-by-ming-zhi-/
// 这人思路总结的挺好，得看看 -- 二刷，自己想到了一样的~耶✌️
