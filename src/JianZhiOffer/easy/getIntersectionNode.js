/**
 * 剑指 Offer 52. 两个链表的第一个公共节点
 * https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/
*/
var getIntersectionNode = function(headA, headB) {
    let nodeA = headA;
    let nodeB = headB;
    while (nodeA !== nodeB) {
        // nodeA = nodeA.next ? nodeA.next : headB;
        // nodeB = nodeB.next ? nodeB.next : headA;
        // 可以理解为两条链表最后都指向了同一个 null （None）节点，代替了不相交的特殊情况。 非常的巧妙。
        // 不然不想交的情况判断不出来，会超时
        nodeA = nodeA ? nodeA.next : headB;
        nodeB = nodeB ? nodeB.next : headA;
    }
    return nodeA;
}
var getIntersectionNode = function(headA, headB) {
    let la = headA;
    let lb = headB;
    let lenA = 0;
    let lenB = 0;
    while (la && lb) {
        lenA++;
        lenB++;
        la = la.next;
        lb = lb.next;
    }

    while (la) {
        lenA++;
        la = la.next;
    }
    while (lb) {
        lenB++;
        lb = lb.next;
    }

    let fast = headA;
    let slow = headB;
    let diff = lenA - lenB;
    if (lenA < lenB) {
        fast = headB;
        slow = headA;
        diff = lenB - lenA;
    }

    while (diff > 0) {
        fast = fast.next;
        diff--;
    }

    while (fast && slow) {
        if (fast === slow) {
            return fast;
        }
        fast = fast.next;
        slow = slow.next;
    }
    return null;
};
