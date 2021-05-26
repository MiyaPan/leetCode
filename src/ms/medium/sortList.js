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
// TODO: 三刷!
/**
 * =============================
 * 二刷
*/
// 这个递归栈其实还占 了 o(logn) 的空间复杂度
// 这个是自顶向下的递归,可以做成自底向上的递归,以获得 o(1) 的空间复杂度,参考:https://leetcode-cn.com/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/
// 太晚了,三刷做自底向上吧
export var sortList = (head) => {
    if (!head || !head.next) return head;

    let node = head;
    let len = 0;
    while (node) {
        node = node.next;
        len++;
    }

    let dummy = new ListNode(0, head);

    for (let step = 1; step < len; step *= 2) {
        // h1 = head 就不对了，head 可能已经被调整到中间的位置了
        // let h1 = head;
        let pre = dummy;
        let h1 = dummy.next;
        while (h1) {
            let p = h1;
            // 找到 h2 的头, 断开 h1 的尾
            // for (let i = 1; i < step && p; i++) {
            for (let i = 1; i < step && p.next; i++) {
                p = p.next;
            }
            let h2 = p.next;
            p.next = null;
    
            // 断开 h2 的尾
            p = h2;
            for (let i = 1; i < step && p && p.next; i++) {
                p = p.next;
            }

            let newh1;
            if (p) {
                newh1 = p.next;
                p.next = null;
            }

            // 合并这一小段
            let merged = merge(h1, h2);

            // 连起来,这里不能直接连到 newh1, newh1 merge 的时候会混乱
            // 应该是让前一个排序好的指向现在 merge 的头
            // while (merged.next) {
            //     merged = merged.next;
            // }
            // merged.next = newh1;
            pre.next = merged;
            while (pre.next) {
                pre = pre.next;
            }

            h1 = newh1;
        }

    }

    // head 已经不在开头了，这也是 必须 dummy 的原因
    // return head;
    return dummy.next;
}
// export var sortList = (head) => {
//     if (!head || !head.next) return head;

//     let fast = head;
//     let slow = head;
//     while (fast.next && fast.next.next) {
//         fast = fast.next.next;
//         slow = slow.next;
//     }

//     // 只剩一个元素的情况,❎ 不能在这里判断还,在这里的话 2 个元素的也是 相等的
//     // if (fast === slow) return head;

//     let right = slow.next;
//     slow.next = null;

//     let l = sortList(head);
//     let r = sortList(right);

//     return merge(l, r);
// }
function merge(l, r) {
    let dummy = new ListNode();
    let node = dummy;
    while (l && r) {
        if (l.val < r.val) {
            node.next = l;
            l = l.next;
        } else {
            node.next = r;
            r = r.next;
        }
        node = node.next;
    }

    node.next = l || r;
    return dummy.next;
}



const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}

var sortList = function(head) {
    if (head === null) {
        return head;
    }
    let length = 0;
    let node = head;
    while (node !== null) {
        length++;
        node = node.next;
    }
    const dummyHead = new ListNode(0, head);
    for (let subLength = 1; subLength < length; subLength <<= 1) {
        let prev = dummyHead, curr = dummyHead.next;
        while (curr !== null) {
            let head1 = curr;
            for (let i = 1; i < subLength && curr.next !== null; i++) {
                curr = curr.next;
            }
            let head2 = curr.next;
            curr.next = null;
            curr = head2;
            for (let i = 1; i < subLength && curr != null && curr.next !== null; i++) {
                curr = curr.next;
            }
            let next = null;
            if (curr !== null) {
                next = curr.next;
                curr.next = null;
            }
            const merged = merge(head1, head2);
            prev.next = merged;
            while (prev.next !== null) {
                prev = prev.next;
            }
            curr = next;
        }
    }
    return dummyHead.next;
};














/**
 * =============================
 * 一刷
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
