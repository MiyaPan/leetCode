
// 执行用时 : 116 ms，击败了 5.50%
// 内存消耗 : 35.3 MB, 击败了 55.63%
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export const mergeTwoLists = (l1, l2) => {
    let p = new ListNode(null);
    let preHead = p;
    // 执行用时 : 116 ms，击败了 5.50%
    // while(l1 && l2) {
    // 执行用时 : 116 ms，击败了 99.32%
    // 对象不能用全等比较，全等比较的是引用
    while(l1 != null && l2 !=null) {
        if (l1.val <= l2.val) {
            p.next = l1;
            l1 = l1.next;
        } else {
            p.next = l2;
            l2 = l2.next;
        }
        p = p.next;
    }

    p.next = l1 ? l1 :l2;

    return preHead.next;
}

// 72ms, 打败 62.16%，一样的代码第一次提交是 86ms， 打败 26.20%，所以 LeetCode 这个耗时不准，跟环境有关
// 第三次 68ms， 91.10%，这个就神奇了
export const mergeTwoLists2 = (l1, l2) => {
    if (l1 === null) {
        return l2;
    }

    if (l2 === null) {
        return l1;
    }

    if(l1.val <= l2.val) {
        l1.next = mergeTwoLists2(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists2(l1, l2.next)
        return l2;
    }
}
