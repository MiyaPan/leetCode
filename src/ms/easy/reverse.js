/**
 * 7. 整数反转
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

    示例 1:
    输入: 123
    输出: 321
    
    示例 2:
    输入: -123
    输出: -321
    
    示例 3:
    输入: 120
    输出: 21
    
    注意:
    假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

    链接：https://leetcode-cn.com/problems/reverse-integer
*/
/**
 * =============================
 * 二刷
*/
export var reverse = function(x) {
    let sign = x > 0;
    let numArr = Math.abs(x).toString().split('');
    let i = 0;
    let j = numArr.length - 1;
    while (i < j) {
        let temp = numArr[i];
        numArr[i] = numArr[j];
        numArr[j] = temp;
        i++;
        j--;
    }
    let num = +numArr.join('');
    // 不能这么比啊，傻啊，321 和 23234234 谁大
    // let min = (Math.pow(2, 31) - 1).toString();
    // let max = (Math.pow(2, 31)).toString();
    // if (sign && numStr > max || !sign && numStr > min) {
    //     return 0;
    // }
    return sign ? (num > 2**31-1 ? 0 : num) : (num > 2**31 ? 0 : -num);
} 

/**
 * =============================
 * 一刷
*/
export var reverse = function(x) {
    let s = Math.abs(x).toString().split('');
    let n = s.length;
    for (let i = 0; i < n / 2; i++) {
        let temp = s[i];
        s[i] = s[n-1-i];
        s[n-1-i] = temp;
    }

    let num = +s.join('');
    //  Number.MAX_SAFE_INTEGER 是 js 的最大安全数，js 是 64 位的，所以是 2^53 - 1
    // 31 位 是因为是有符号数
    if (num > 2 ** 31 - 1 || num < -(2**31)) return 0;
    return x < 0 ? -num : num;
};