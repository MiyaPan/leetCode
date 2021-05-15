/**
 * 445. 两数相加 II
 * 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。
 * 将这两数相加会返回一个新的链表。
    你可以假设除了数字 0 之外，这两个数字都不会以零开头。

    进阶：
    如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

    示例：

    输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
    输出：7 -> 8 -> 0 -> 7

    链接：https://leetcode-cn.com/problems/add-two-numbers-ii
*/
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
/**
 * =============================
 * 二刷
*/
var addTwoNumbers = function(l1, l2) {
    let stack1 = [];
    let stack2 = [];
    while (l1) {
        // stack1.push(l1);
        stack1.push(l1.val);
        l1 = l1.next;
    }
    while (l2) {
        // stack2.push(l2);
        stack2.push(l2.val);
        l2 = l2.next;
    }

    let carry = 0;
    let node = null;
    while (stack1.length || stack2.length || carry) {
        let n1 = +stack1.pop() || 0;
        let n2 = +stack2.pop() || 0;
        let sum = n1 + n2 + carry;
        let temp = new ListNode(sum%10 + '');
        temp.next = node;
        node = temp;
        carry = parseInt(sum/10);
    }
    return node;
}

/**
 * =============================
 * 一刷
*/
// 不能字符串转数字再计算的，因为会有大数啊！！！
// 思路：想逆序，就用栈！！！！
// 不等长的数组怎么倒着访问！！pop啊！！！！数组就是栈啊！
var addTwoNumbers = function(l1, l2) {
    let s1 = [];
    let s2 = [];

    while(l1) {
        s1.push(l1.val);
        l1 = l1.next;
    }

    while(l2) {
        s2.push(l2.val);
        l2 = l2.next;
    }

    // 不能是 null，无法加 next 属性
    let ans = null;
    // 得是 null，不然会生成一个值为 空 的节点，会转成 0，不对
    // let ans = new ListNode();
    let carry = 0;
    while(s1.length || s2.length || carry) {
        let num1 = +(s1.pop() || 0);
        let num2 = +(s2.pop() || 0);
        let sum = num1 + num2 + carry;
        if (sum > 9) {
            carry = 1;
            sum = sum - 10;
        } else {
            // 这一步不能省略！！！
            carry = 0;
        }
        let node = new ListNode(sum);
        node.next = ans;
        // 傻啊，不是循环引用了吗
        // ans.next = node;
        ans = node;
    }
    return ans;
};
