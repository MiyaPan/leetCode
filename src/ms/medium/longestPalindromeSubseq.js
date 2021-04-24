/**
 * 516. 最长回文子序列
 * https://leetcode-cn.com/problems/longest-palindromic-subsequence/
 * 给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。

    示例 1:
    输入: "bbbab"
    输出: 4
    一个可能的最长回文子序列为 "bbbb"。

    示例 2:
    输入: "cbbd"
    输出: 2
    一个可能的最长回文子序列为 "bb"。

    提示：
    1 <= s.length <= 1000
    s 只包含小写英文字母
*/
export const longestPalindromeSubseq = (s) => {
    let n = s.length;
    let dp = Array(n).fill(null).map(_ => Array(n).fill(0));
    
    for (let i = n-1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            // 初始化对角线
            if (i === j) {
                dp[i][j] = 1;
                continue;
            }

            // 动态转移方程
            if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                // dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
                dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j]);
            }
        }
    }

    return dp[0][n-1];
}