/**
 * 234. 回文链表
 * 请判断一个链表是否为回文链表。
    
 示例 1:
    输入: 1->2
    输出: false
    
    示例 2:
    输入: 1->2->2->1
    输出: true
    
    进阶：
    你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

    链接：https://leetcode-cn.com/problems/palindrome-linked-list
*/
/**
 * =============================
 * 二刷
*/
export var isPalindrome = function(head) {
    let slow = head;
    let fast = head;
    // slow 就是 mid，如果是偶数，位于前半段
    // while (fast.next.next) {
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // 翻转后半部分，就不用管是 偶数个还是奇数了，翻转前半部分还得看，得区分谁是头
    let next = slow.next;
    let pre = null;
    while (next) {
        let newNext = next.next;
        next.next = pre;
        pre = next;
        next = newNext;
    }

    let l = head;
    let r = pre;
    while (l && r) {
        if (l.val !== r.val) return false;
        l = l.next;
        r = r.next;
    }

    return true;
};

/**
 * =============================
 * 一刷
*/
export var isPalindrome = function(head) {
    if (!head || !head.next) return true;
    let p1 = head;
    let p2 = head;

    let left = [];
    let isOdd = false;
    while(p2) {
        left.push(p1.val);
        p1 = p1.next;
        if (!p2.next) isOdd = true;
        p2 = p2.next && p2.next.next;
    }

    let n = left.length;
    let i = n -1;
    if (isOdd) i = n - 2;
    while(p1) {
        if (p1.val !== left[i--]) return false;
        p1 = p1.next;
    }

    return i < 0;
};
