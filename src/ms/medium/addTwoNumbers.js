/**
 * 445. 两数相加 II
 * https://leetcode-cn.com/problems/add-two-numbers-ii/
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
