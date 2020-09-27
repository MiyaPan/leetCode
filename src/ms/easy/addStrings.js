/**
 * 415. 字符串相加
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

    提示：
    num1 和num2 的长度都小于 5100
    num1 和num2 都只包含数字 0-9
    num1 和num2 都不包含任何前导零
    你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

    链接：https://leetcode-cn.com/problems/add-strings
*/
var addStrings = function(num1, num2) {
    let p1 = num1.length - 1;
    let p2 = num2.length - 1;
    let s = '';
    let carry = 0;

    while(p1 >=0 || p2 >= 0 || carry === 1) {
        let temp = (num1[p1] ? +num1[p1] : 0) + (num2[p2] ? +num2[p2] : 0) + carry;
        carry = temp >= 10 ? 1 : 0;
        s = temp % 10 + s;
        p1--;
        p2--;
    }

    return s;

    // while(p1 !== -1 || p2 !== -1 || carry === 1) {
    //     let temp = (num1[p1] ? +num1[p1] : 0) + (+num2[p2] ? +num2[p2] : 0) + carry;
    //     if (temp > 10) {
    //         carry = 1;
    //         sum += (temp - 10) * Math.pow(10, count++);
    //     } else {
    //         carry = 0;
    //         sum += temp * Math.pow(10, count++);
    //     }
    //     p1--;
    //     p2--;
    // }

    // return sum + '';
};
