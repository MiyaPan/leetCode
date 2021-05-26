/**
 * 92. 反转链表 II
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
    说明:
    1 ≤ m ≤ n ≤ 链表长度。

    示例:
    输入: 1->2->3->4->5->NULL, m = 2, n = 4
    输出: 1->4->3->2->5->NULL

    链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
*/
/**
 * =============================
 * 二刷
*/

export var reverseBetween = function(head, m, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let node = dummy;
    let count = 0;
    let pre = dummy;
    let start;
    let end;

    while (node && count < m) {
        pre = node;
        node = node.next;
        count++;
    }

    let preStart = pre;
    start = node;
    while (node && count <= n) {
        let next = node.next;
        node.next = pre;
        if (count === n) end = node;
        pre = node;
        node = next;
        count++;
    }
    start.next = node;
    preStart.next = end;

    return dummy.next;
}
 function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }





















/**
 * =============================
 * 一刷
*/
// 和答案思路一样，没答案写的简洁：https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode/
export var reverseBetween1 = function(head, m, n) {
    if (!head) return null;
    if (m === n) return head;
    let count = 0;
    let p = head;
    let leftTail;
    let rightHead;

    let first;

    let pre;
    let next;
    while(p) {
        count++;
        next = p.next;
        if (count === m - 1) {
            leftTail = p;
        } else if (count === m) {
            p.next = null;
            pre = p;
            first = p;
        } else if (count > m && count < n) {
            p.next = pre;
            pre = p;
        } else if (count === n) {
            rightHead = p.next;
            p.next = pre;

            if (leftTail) {
                leftTail.next = p;
            } else {
                head = p;
            }
            first.next = rightHead;
            break;
        }
        p = next;
    }

    return head;
};
