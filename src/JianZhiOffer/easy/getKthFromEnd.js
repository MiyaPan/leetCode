/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 * https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
*/
var getKthFromEnd = function(head, k) {
    let count = 0;
    let node = head;
    while (node) {
        count++;
        node = node.next;
    }

    let dummy = new ListNode();
    dummy.next = head;
    count -= k;
    node = dummy;
    while (count >= 0) {
        count--;
        node = node.next;
    }
    return node;
};
// 可以不知道链表长度,一遍走完
var getKthFromEnd = function(head, k) {
    let count = 0;
    let fast = head;
    while (count < k) {
        count++;
        fast = fast.next;
    }

    let slow = head;
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};
