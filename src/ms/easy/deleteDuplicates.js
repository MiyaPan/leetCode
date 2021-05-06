/**
 * 83. 删除排序链表中的重复元素
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 * 
 * 示例 1:
 * 
 * 输入: 1->1->2
 * 输出: 1->2
 * 示例 2:
 * 
 * 输入: 1->1->2->3->3
 * 输出: 1->2->3
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * =============================
 * 二刷
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const deleteDuplicates = (head) => {
    let pre;
    let node = head;
    while (node) {
        // if (node.val === pre && pre.val) {
        if (pre && node.val === pre.val) {
            pre.next = node.next;
        } else {
            pre = node;
        }
        node = node.next;
    }
    return head;
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const deleteDuplicates = (head) => {
    if (!head) return head;

    let pre = head;
    let cur = head.next;
    let arr = [pre.val];
    while (cur) {
        if (arr.includes(cur.val)) {
            pre.next = cur.next;
            cur = cur.next;
        } else {
            arr.push(cur.val);
            pre = cur;
            cur = cur.next;
        }
    }

    return head;
}
