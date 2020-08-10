/**
 * 21. 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

    示例：
    输入：1->2->4, 1->3->4
    输出：1->1->2->3->4->4

    链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (!l1 && !l2) return null;
    if (!l1 || !l2) return l1 || l2;

    // l1 指向小的，以 l1 为基准穿线
    if (l1.val > l2.val) {
        let temp = l1;
        l1 = l2;
        l2 = temp;
    }
    let l = l1;
    // 输入：1->2->4, 1->3->4
    // 输出：1->1->2->3->4->4
//     [5]
// [1,2,4]
    while(l1.next && l2) {
        if (l1.next.val <= l2.val) {
            l1 = l1.next;
        } else {
            let temp = l2.next;
            l2.next = l1.next;
            l1.next = l2;
            l2 = temp;
            l1 = l1.next;
        }
    }
    if (l2) {
        l1.next = l2;
    }
    return l;
};

var mergeTwoLists = function(l1, l2) {
    if (!l1 && !l2) return null;
    if (!l1 || !l2) return l1 || l2;

    // let l = null;
    let list = new ListNode(null);
    let l = list;
    while(l1 && l2) {
        if (l1.val <= l2.val) {
            l.next = l1;
            l1 = l1.next;
        } else {
            l.next = l2;
            l2 = l2.next;
        }
        l = l.next;
    }
    l.next = l2 || l1;
    return list.next;
};