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