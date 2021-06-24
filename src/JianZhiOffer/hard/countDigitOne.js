/**
 * 剑指 Offer 43. 1～n 整数中 1 出现的次数
 * https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/
 * 输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。
    例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

    示例 1：
    输入：n = 12
    输出：5
    
    示例 2：
    输入：n = 13
    输出：6

    限制：
    1 <= n < 2^31
    注意：本题与主站 233 题相同：https://leetcode-cn.com/problems/number-of-digit-one/

    链接：https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof
*/
// TODO: 三刷！
// 看答案吧：https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/solution/mian-shi-ti-43-1n-zheng-shu-zhong-1-chu-xian-de-2/
var countDigitOne = function(n) {
    let ans = 0;
    let cur = n % 10;
    let low = 0;
    let high = parseInt(n/10);
    let power = 1;
    // while (high !== 0 || low !== 0) {
    while (high !== 0 || cur !== 0) {
        if (cur < 1) {
            ans += high * power;
        } else if (cur === 1) {
            // 高位是可以任意了，但高位最高的时候，low 位选不全，所以还是 (高位-1) * 权重 + (最后一位高位的低位变化种数)
            ans += high * power + (low+1);
        } else if (cur > 1) {
            ans += (high + 1) * power;
        }

        // 更新权重等
        // low = low + cur * 10;
        low = low + cur * power;
        power *= 10;
        cur = high % 10;
        high = parseInt(high / 10);
    }
    return ans;
};
