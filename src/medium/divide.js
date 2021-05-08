/**
 * 29. 两数相除
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
    返回被除数 dividend 除以除数 divisor 得到的商。
    整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

    示例 1:
    输入: dividend = 10, divisor = 3
    输出: 3
    解释: 10/3 = truncate(3.33333..) = truncate(3) = 3

    示例 2:
    输入: dividend = 7, divisor = -3
    输出: -2
    解释: 7/-3 = truncate(-2.33333..) = -2

    提示：
    被除数和除数均为 32 位有符号整数。
    除数不为 0。
    假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2147483648(2^31) − 1。

    链接：https://leetcode-cn.com/problems/divide-two-integers
*/
// 思路：看 10 比 3 大，那 10 比 3 的 2 倍【2倍用加法】大吗，大的话就看比 3的2倍 + 3的2倍 = 6 大吗，如果小了，就锁定在 3 的 2 倍 和 4 倍中间了
// 此时，看 10 - (3+3) = 4，看 4 是 3 的几倍，如上类推，因为锁定的倍数是 2 分找到的，可能相差很多，中间差了很多 3，所以还要继续分解
export const divide = (dividend, divisor) => {
    if (dividend === 0) return 0;

    // 除数是 1 的话会因为被二分，减少统计次数，单独处理
    if (divisor === 1) return dividend;
    if (divisor === -1) {
        if (dividend > -Math.pow(2, 31)) {
            return -dividend;
        }
        return Math.pow(2, 31) - 1;
    };

    // 处理符号问题
    let sign = dividend > 0 && divisor > 0 || dividend < 0 && divisor < 0 ? 1 : 0;
    let rest = Math.abs(dividend);
    divisor = Math.abs(divisor);

    let quotient = 0;
    while(rest >= divisor) {
        let {quotient: q, rest: r} = helper(rest, divisor);
        rest = r;
        quotient += q;
    }

    return sign ? quotient : -quotient;
}

function helper(dividend, divisor) {
    if (dividend < divisor) return 0;

    let sum = divisor;
    let quotient = 1;
    let rest = 0;
    while((sum + sum) <= dividend) {
        if (sum === dividend) {
            return {quotient, rest: 0};
        } else {
            sum = sum + sum;
            // 不是 ++，因为 sum 是指数翻倍的，商也指数翻
            quotient += quotient;
        }
    }
    rest = dividend - sum;
    return {quotient, rest};
}
