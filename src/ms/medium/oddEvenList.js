/**
 * 328. 奇偶链表
 * 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
    请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

    示例 1:
    输入: 1->2->3->4->5->NULL
    输出: 1->3->5->2->4->NULL
    
    示例 2:
    输入: 2->1->3->5->6->4->7->NULL 
    输出: 2->3->6->7->1->5->4->NULL
    
    说明:
    应当保持奇数节点和偶数节点的相对顺序。
    链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

    链接：https://leetcode-cn.com/problems/odd-even-linked-list
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
/**
 * =============================
 * 二刷
*/
export var oddEvenList = function(head) {
    if (!head) return null;

    let odd = head;
    let even = head.next;
    let evenHead = even;
    while (odd.next && odd.next.next || even && even.next) {
        odd.next = odd.next && odd.next.next;
        odd = odd.next;
        even.next = even.next && even.next.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}













/**
 * =============================
 * 一刷
*/
// 唉傻了，都是链表，都是指针，把奇偶单独拎出来并不需要时间啊！！！！看答案
export var oddEvenList = function(head) {
    if (!head) return null;
    const lastOdd = findLastOdd(head);
    const lastEven = lastOdd.next;
    let count = 0;
    let even = lastOdd;
    let odd = head;
    let p = head;
    let next;
    while(p) {
        if (p === lastOdd) break;
        count++;
        next = p.next;
        if (count % 2 === 1) {
            odd.next = odd.next && odd.next.next;
            odd = odd.next;
        } else {
            p.next = null;
            even.next = p;
            even = even.next;
        }
        p = next;
    }
    even.next = lastEven;
    return head;
};

function findLastOdd(head) {
    let count = 0;
    let p = head;
    let pre = head;
    while(p.next) {
        count++;
        pre = p;
        p = p.next;
    }
    if (count % 2 === 1) return pre;
    return p;
}

// https://leetcode-cn.com/problems/odd-even-linked-list/solution/qi-ou-lian-biao-by-leetcode/
var oddEvenList = function(head) {
    if (!head) return null;

    let odd = head;
    let even = head.next;
    let evenHead = even;
    while(odd.next && odd.next.next) {
        odd.next = even.next;
        odd = odd.next;

        if(!odd) break;

        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}
