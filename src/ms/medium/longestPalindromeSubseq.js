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
// TODO: 三刷！
/**
 * =============================
 * 二刷
 * 5. 最长回文子串 是两端相等就看中间，不相等就直接是 0
 * 516. 最长回文子序列 是两端相等就是中间的 +2，不相等就得看中间的+两侧各添一个最大是多少
*/
export const longestPalindromeSubseq = (s) => {
    let n = s.length;
    let dp = Array(n).fill(null).map(_ => Array(n).fill(0));
    for (let i = n-1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (j-i <= 1) {
                dp[i][j] = i === j ? 1 : s[i] === s[j] ? 2 : 1;
            } else if (s[i] === s[j]) {
                // 这种情况不用取 max，因为 i，j 定下的情况就定了 dp 该项了，不会再走到这一项
                // dp[i][j] = Math.max(dp[i][j], dp[i+1][j-1]+2);
                dp[i][j] = dp[i+1][j-1]+2;
            } else {
                // dp[i][j] = Math.max(dp[i][j], dp[i][j-1]);
                // 这个时候 dp[i+1][j] 已经有了的
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }
    return dp[0][n-1];
}







/**
 * =============================
 * 一刷
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