/**
 * 剑指 Offer 18. 删除链表的节点
 * https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/
*/
var deleteNode = function(head, val) {
    let dummy = new ListNode();
    dummy.next = head;
    // dummy 的val 是 0，导致删除 0 出错，从head 开始就行
    // let node = dummy;
    let node = dummy.next;
    let pre = dummy;
    while (node) {
        if (node.val === val) {
            pre.next = node.next;
            return dummy.next;
        }
        pre = node;
        node = node.next;
    }
};
