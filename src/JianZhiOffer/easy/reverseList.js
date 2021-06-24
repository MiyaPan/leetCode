/**
 * 剑指 Offer 24. 反转链表
 * https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
*/
var reverseList = function(head) {
    let pre = null;
    let node = head;
    while (node) {
        let next = node.next;
        node.next = pre;
        pre = node;
        node = next;
    }
    return pre;
};
