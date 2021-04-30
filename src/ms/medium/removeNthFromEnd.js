/**
 * 19. 删除链表的倒数第 N 个结点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

    进阶：你能尝试使用一趟扫描实现吗？

    示例 1：
    输入：head = [1,2,3,4,5], n = 2
    输出：[1,2,3,5]
    
    示例 2：
    输入：head = [1], n = 1
    输出：[]
    
    示例 3：
    输入：head = [1,2], n = 1
    输出：[1]

    提示：
    链表中结点的数目为 sz
        1 <= sz <= 30
        0 <= Node.val <= 100
        1 <= n <= sz

    链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list
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
 * @param {number} n
 * @return {ListNode}
 */
// 思路：害，两遍就计数，一遍就快满指针呗
// ！！链表一定要记得快慢指针，快满指针就为链表题目而生！！
// 一把过~
// 不过答案这个 栈处理链表节点的思路挺好的，说不定别的能用到~
// https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-b-61/
// 栈 pop 的时候计数，这个挺好，和双指针一样的复杂度，都不至于访问两遍
// 链表添加 “哑节点”就不用单独处理边界了，就很方便！！！
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;
    let pre = dummy;
    let count = 0;
    while(count < n) {
        fast = fast.next;
        count++;
    }

    while (fast) {
        fast = fast.next;
        pre = slow;
        slow = slow.next;
    }
    // 跳转链接
    pre.next = slow.next;
    return dummy.next;
};
