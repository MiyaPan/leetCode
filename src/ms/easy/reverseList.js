/**
 * 206. 反转链表
 * 反转一个单链表。
    示例:

    输入: 1->2->3->4->5->NULL
    输出: 5->4->3->2->1->NULL
    进阶:
    你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

    链接：https://leetcode-cn.com/problems/reverse-linked-list
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * =============================
 * 二刷
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 还是得要个 dummy 节点，不然头节点的 next 指向哪里
    // dummy 不对，要 null 才行，dummy 不是 null
    // let dummy = new ListNode();
    // dummy.next = head;
    let pre = null;
    let next = head;
    while (next) {
        let newNext = next.next;
        next.next = pre;
        pre = next;
        next = newNext;
    }
    return pre;
};

/**
 * =============================
 * 一刷
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 节点值为 null 和 节点是 null 不是一回事
    // let l = new ListNode(null);
    let l = null;

    while(head) {
        let temp = head.next;
        head.next = l;
        l = head;
        head = temp;
    }

    return l;
};