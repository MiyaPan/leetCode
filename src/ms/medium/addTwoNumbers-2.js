/**
 * 2. 两数相加
 * https://leetcode-cn.com/problems/add-two-numbers/
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carry = 0;
    let list = new ListNode();
    let p = list;
    while(l1 || l2 || carry) {
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val : 0;
        let num = n1 + n2 + carry;
        if (num > 9) {
            carry = 1;
            num -= 10;
        } else {
            // 千万！！！！carry 的一定注意亮点：1. while 要加它，2. 如果小于 10 还要置 0！！！！
            carry = 0;
        }
        let node = new ListNode(num);
        p.next = node;
        p = p.next;

        l1 = l1 && l1.next;
        l2 = l2 && l2.next;
    }
    return list.next;
};
