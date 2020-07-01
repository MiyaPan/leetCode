/**
 * 338. 比特位计数
 * https://leetcode-cn.com/problems/counting-bits/
 * 
 * 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

    示例 1:
    输入: 2
    输出: [0,1,1]

    示例 2:
    输入: 5
    输出: [0,1,1,2,1,2]
*/
// 列出来找规律发现 dp[i] = dp[int(i/2)] + dp[i%2]，实质规律应该是，将当前数字右移一位，看去掉的尾巴是 0 还是 1 ，再加上右移后的数字即可
export const countBits = (num) => {
    let dp = [0];

    for (let i = 1; i <= num; i++) {
        let tail = i % 2;
        let preDp = i >> 1;
        dp[i] = dp[preDp] + tail;
    }

    return dp;
}