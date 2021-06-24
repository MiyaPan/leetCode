/**
 * 剑指 Offer 64. 求1+2+…+n
 * 求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

    示例 1：
    输入: n = 3
    输出: 6
    
    示例 2：
    输入: n = 9
    输出: 45

    限制：
    1 <= n <= 10000

    链接：https://leetcode-cn.com/problems/qiu-12n-lcof
*/
var sumNums = function(n) {
    // 这样到 0 的时候返回不是 0，但是 case 也能通过，，，，
    // return n > 0 && (n + sumNums(n-1));
    n > 0 && (n += sumNums(n-1));
    return n;
};
