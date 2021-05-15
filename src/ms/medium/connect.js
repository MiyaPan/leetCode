/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 * 给定一个二叉树

    struct Node {
    int val;
    Node *left;
    Node *right;
    Node *next;
    }
    填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
    初始状态下，所有 next 指针都被设置为 NULL。

    进阶：
    你只能使用常量级额外空间。
    使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

    示例：

    输入：root = [1,2,3,4,5,null,7]
    输出：[1,#,2,3,#,4,5,7,#]
    解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next 指针连接），'#' 表示每层的末尾。

    提示：
    树中的节点数小于 6000
    -100 <= node.val <= 100

    链接：https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii
*/
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
/**
 * =============================
 * 二刷
*/
var connect = function(root) {
    // 二叉树和链表怎么能忘了这句话呢
    if (!root) return null;

    let stack = [root];
    let p = 0;
    while (p < stack.length) {
        let nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p];
            node.next = stack[p+1];
            p++;
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        stack = stack.concat(nodesInNextLevel);
    }
    return root;
}




/**
 * =============================
 * 一刷
*/
var connect = function(root) {
    if (!root) return null;
    let stack = [root];
    let nodesInNextLevel = [];

    while(stack.length > 0) {
        nodesInNextLevel = [];
        let len = stack.length;
        for(let i = 0; i < len; i++) {
            stack[i].next = i === len-1 ? null : stack[i+1];
            stack[i].left && nodesInNextLevel.push(stack[i].left);
            stack[i].right && nodesInNextLevel.push(stack[i].right);
        }
        stack = nodesInNextLevel;
    }

    return root;
};
