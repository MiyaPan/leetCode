/**
 * 61. 旋转链表
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

    示例 1：
    输入：head = [1,2,3,4,5], k = 2
    输出：[4,5,1,2,3]
    
    示例 2：
    输入：head = [0,1,2], k = 4
    输出：[2,0,1]

    提示：
    链表中节点的数目在范围 [0, 500] 内
    -100 <= Node.val <= 100
    0 <= k <= 2 * 109

    链接：https://leetcode-cn.com/problems/rotate-list
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
 * @param {number} k
 * @return {ListNode}
 */
// 方法很多，也都很好，要看下：https://leetcode-cn.com/problems/rotate-list/solution/java-da-kai-ni-de-si-lu-4chong-jie-fa-qu-q1l6/
var rotateRight = function(head, k) {
    if (!head) return null;
    // [1], k=1
    if (!head.next) return head;

    // [1,2,3], k=2000000000
    // 所以要先对 k 取模
    let temp = head;
    let count = 0;
    while(temp) {
        temp = temp.next;
        count++;
    }
    k = k % count;

    while(k > 0) {
        // 获取最后一个元素和它前面的元素
        let newHead = head;
        let preNewHead = head;
        let temp = head;
        while(temp.next) {
            preNewHead = temp;
            newHead = temp.next;
            temp = temp.next;
        }
        // 断开最后一个元素和前面元素的链接；将最后一个元素的 next 指向 head
        preNewHead.next = null;
        newHead.next = head;
        // 指定新 head
        head = newHead;
        k--;
    }
    return head;
};

// 快慢指针不错，但其实也要先获取一下链表长度的，因为要对 k 取模，k 太大了会；如果 k 很小，可以不用先拿链表长度
// 但是，拿链表长度是 o(n)，这个复杂度不会影响啥的
var rotateRight = function(head, k) {
    if (!head) return null;

    // [1,2,3], k=2000000000
    // 所以要先对 k 取模
    let temp = head;
    let len = 1;
    while(temp.next) {
        temp = temp.next;
        len++;
    }
    k = k % len;

    // [1], k=0：这种情况的解决方法是：先把链表连成环，这样 newHead = preNewHead.next 的时候就不会指向空了。怕啥的哟，只要不返回之前，环也没影响啊，环也是数据结构的一种啊！看不起谁！
    temp.next = head;

    // 找 newHead
    let count = 0;
    temp = head;
    let preNewHead = head;
    while(count < len - k) {
        preNewHead = temp;
        temp = temp.next;
        count++;
    }

    // temp 就是最后一个，断开最后一个元素和前面元素的链接；将最后一个元素的 next 指向 head
    newHead = preNewHead.next;
    preNewHead.next = null;
    return newHead;
};
