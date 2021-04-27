/**
 * 82. 删除排序链表中的重复元素 II
 * 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，
 * 只保留原始链表中 没有重复出现 的数字。
    返回同样按升序排列的结果链表。

    示例 1：
    输入：head = [1,2,3,3,4,4,5]
    输出：[1,2,5]
    
    示例 2：
    输入：head = [1,1,1,2,3]
    输出：[2,3]

    提示：
    链表中节点数目在范围 [0, 300] 内
    -100 <= Node.val <= 100
    题目数据保证链表已经按升序排列

    链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) return head;
    let curDeleted = new ListNode(101); // 题目给了最大是 100
    let preNode = new ListNode(101);
    let copyPreNode = preNode;
    preNode.next = head;
    let node = head;
    while (node) {
        // [0,1,2,2,3,4]，输出了 [1,3,4]，期待 [0,1,3,4]
        if (node.next && node.val === node.next.val || node.val === curDeleted.val) {
            preNode.next = node.next;
            curDeleted = node;
        } else {
            preNode = node;
        }
        node = node.next;
    }
    return copyPreNode.next;
};
