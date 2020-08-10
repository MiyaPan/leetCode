/**
 * 343. 整数拆分
 * https://leetcode-cn.com/problems/integer-break/
 * 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

    示例 1:

    输入: 2
    输出: 1
    解释: 2 = 1 + 1, 1 × 1 = 1。

    示例 2:

    输入: 10
    输出: 36
    解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。

    说明: 你可以假设 n 不小于 2 且不大于 58。
*/
// 10 = 3 + 7，积 = 3 * dp[7]
export const integerBreak = (n) => {
    if (n===1) return 0;
    let dp = [0, 0, 1];

    for (let i = 3; i <= n; i++) {
        dp[i] = 0;
        for (let j = 1; j < i; j++) {
            // 为啥凭空加个 j*(i-j)？？
            // 因为乘积的最大值从其值可能从下面两种方式产生
            // 1. 从两个数中产生j * (i-j)
            // 2. 从多个数中产生dp[j]*(i-j)
            dp[i] = Math.max(dp[i], j * dp[i-j], j*(i-j));
        }
    }

    return dp[n];
}
