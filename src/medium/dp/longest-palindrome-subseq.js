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

// 回文看的是收尾元素，所以，显而易见，又是一个 区间 dp 的问题，而且要的是 回文的长度，所以 dp 值应该是区间内 最长回文子串的长度
// 对于 dp[i][j]，如果 s[i] === s[j]，那当前 dp 就是 i+1 到 j-1 区间的最大值 加上收尾这两个元素
// 如果 s[i] ！== s[j]，那当前值为 i+1 到 j 和 i到j-1 中取最值
// 从动态转移方程可用看出，依赖的是 i+1 ，所以 i 循环逆序；j-1，所以 j 顺序
export const longestPalindromeSubseq = (s) => {
    let n = s.length;
    let dp = Array(n).fill(null).map(_ => Array(n).fill(0));

    for (let i = 0; i < n; i++) dp[i][i] = 1;

    for (let i = n-1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }

    return dp[0][n-1];
}