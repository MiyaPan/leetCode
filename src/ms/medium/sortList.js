/**
 * 148. 排序链表
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 
    进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

    示例 1：
    输入：head = [4,2,1,3]
    输出：[1,2,3,4]

    示例 2：
    输入：head = [-1,5,3,4,0]
    输出：[-1,0,3,4,5]

    示例 3：
    输入：head = []
    输出：[]

    提示：
    链表中节点的数目在范围 [0, 5 * 104] 内
    -105 <= Node.val <= 105

    链接：https://leetcode-cn.com/problems/sort-list
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
/*
思路：常见的 ologn 的排序有：堆、归并、快排。插入、选择和冒泡都是 n^2，堆排序最后还要链接起来，反正不太好，用归并
    归并有两种方式：
        1. 自顶向下：递归，每次将数组分成 2 半，直到只剩一个元素；然后逐个合并，但是这种要占用 额外的空间-递归栈占用的空间：空间复杂度：O(logn)，其中 n 是链表的长度。空间复杂度主要取决于递归调用的栈空间。
        2. 自底向上：步长从 1 开始，每次 *2，逐个合并
    主要考察链表怎么取终点，怎么设置一半去递归
**/ 
// 1. 自顶向下
// 参考：https://leetcode-cn.com/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/
// 因为太晚了还有活，没来得及做自底向上，一定要二刷
export var sortList = (head) => {
    if (!head) return null;

    // 难点：怎么判断只剩一个元素了
    // 每次将 slow.next = null,断掉链表，这样每次访问到 某节点.next = null 的时候，就知道只剩一个了
    if (head.next === null) {
        return head;
    }

    let slow = head;
    let fast = head;
    // 1 2 3 4 5
    // while(quick && quick.next) 这样得到的 slow 是奇数的中间，偶数的后半段第一个，即：把奇数中间的归到后半段
    // ** 所以得让 slow 少走一步，多判断一个 next，或者 fast 的初始值设置为 head.next,让 fast 本来就早走一步
    // while(quick.next && quick.next.next) 行，这样得到的 slow 偶数的前半段最后一个，即：把奇数中间的归到前半段
    // while(fast && fast.next) {
    while(fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let temp = slow.next;
    slow.next = null;

    // tail 最开始就传入 null，除了结尾节点会被一直传 null 下去，其他的 段，tail 是有值的
    // merge 的时候得判断下，包含右边还是左边，都包含不死循环了吗: 右边的你传 mid.next, 别传 mid 啊
    return merge(sortList(head), sortList(temp));
}

function merge(head1, head2) {
    let head = new ListNode(0);
    let h = head;
    while(head1 && head2) {
        if (head1.val < head2.val) {
            head.next = head1;
            head1 = head1.next;
        } else {
            head.next = head2;
            head2 = head2.next;
        }
        head = head.next;
    }
    // if (!head1) {
    //     head.next = head1;
    // } else if (!head2) {
    //     head.next = head2;
    // }
    head.next = head1 !== null ? head1 : head2;
    return h.next;
}
