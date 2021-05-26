/**
 * 24. 两两交换链表中的节点
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
    你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

    示例 1：
    输入：head = [1,2,3,4]
    输出：[2,1,4,3]
    
    示例 2：
    输入：head = []
    输出：[]
    
    示例 3：
    输入：head = [1]
    输出：[1]

    提示：
    链表中节点的数目在范围 [0, 100] 内
    0 <= Node.val <= 100
     
    进阶：你能在不修改链表节点值的情况下解决这个问题吗?（也就是说，仅修改节点本身。）

    链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs
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
var swapPairs = function(head) {
    let dummy = new ListNode();
    dummy.next = head;
    let pre = dummy;
    let cur = dummy.next;
    while (cur && cur.next) {
        let next = cur.next;
        pre.next = next;
        let newNext = next.next;
        next.next = cur;
        cur.next = newNext;

        pre = cur;
        cur = newNext;
    }
    return dummy.next;
}














/**
 * =============================
 * 一刷
*/
var swapPairs = function(head) {
    let preNode = new ListNode(101);
    preNode.next = head;
    let copyHead = preNode;
    let node = head;
    // [1]
    while(node) {
        // 也可以这个 if 的判断放在 while 里，这样就不用写 else 了
        if (node.next) {
            // 修改链接
            let nextNode = node.next;
            node.next = node.next.next;
            nextNode.next = node;
            preNode.next = nextNode;

            // 更新节点，这个时候 node 已经换到后面了，所以下一个就是 node.next
            preNode = node;
            node = node.next;
        } else {
            // 这句别少啊，不然一个元素的就循环在这了
            break;
        }
    }
    // while(node && node.next) {
    //     // 也可以这个 if 的判断放在 while 里，这样就不用写 else 了
    //     // 修改链接
    //     let nextNode = node.next;
    //     node.next = node.next.next;
    //     nextNode.next = node;
    //     preNode.next = nextNode;

    //     // 更新节点，这个时候 node 已经换到后面了，所以下一个就是 node.next
    //     preNode = node;
    //     node = node.next;
    // }
    return copyHead.next;
};
