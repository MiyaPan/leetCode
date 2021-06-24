/**
 * 剑指 Offer 36. 二叉搜索树与双向链表
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/
*/
var treeToDoublyList = function(root) {
    if (!root) return null;

    let head = dfs(root);
    let tail = head;
    while (tail.right) {
        tail = tail.right;
    }
    head.left = tail;
    tail.right = head;
    return head;
};
function dfs(root) {
    if (!root.left && !root.right) return root;

    let head = root;
    if (root.left) {
        let l = dfs(root.left);
        head = l;
        let node = l;
        while (node.right) {
            node = node.right;
        }
        node.right = root;
        root.left = node;
    }

    if (root.right) {
        let r = dfs(root.right);
        root.right = r;
        r.left = root;
    }

    return head;
}