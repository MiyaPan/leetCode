/**
 * 剑指 Offer 35. 复杂链表的复制
 * https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/
*/
var copyRandomList = function(head) {
    if (!head) return null;

    // 旧 - 新 对
    let map = new Map();
    let node = head;
    let dummy = new ListNode();
    let l2 = dummy;
    // 按照 next 构造
    while (node) {
        let newNode = new ListNode(node.val);
        l2.next = newNode;

        map.set(node, newNode);

        l2 = l2.next;
        node = node.next;
    }

    // 按 random 构造
    node = head;
    while (node) {
        let copyNode = map.get(node);
        if (copyNode) {
            copyNode.random = map.get(node.random);
        }
        
        node = node.next;
    }
    return dummy.next;
};
