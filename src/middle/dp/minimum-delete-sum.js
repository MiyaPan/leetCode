/**
 * 712. 两个字符串的最小ASCII删除和
 * 给定两个字符串s1, s2，找到使两个字符串相等所需删除字符的ASCII值的最小和。

    示例 1:
    输入: s1 = "sea", s2 = "eat"
    输出: 231
    解释: 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。
    在 "eat" 中删除 "t" 并将 116 加入总和。
    结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。

    示例 2:
    输入: s1 = "delete", s2 = "leet"
    输出: 403
    解释: 在 "delete" 中删除 "dee" 字符串变成 "let"，
    将 100[d]+101[e]+101[e] 加入总和。在 "leet" 中删除 "e" 将 101[e] 加入总和。
    结束时，两个字符串都等于 "let"，结果即为 100+101+101+101 = 403 。
    如果改为将两个字符串转换为 "lee" 或 "eet"，我们会得到 433 或 417 的结果，比答案更大。

    注意:
    0 < s1.length, s2.length <= 1000。
    所有字符串中的字符ASCII值在[97, 122]之间。

    链接：https://leetcode-cn.com/problems/minimum-ascii-delete-sum-for-two-strings
*/
// 其实就是寻找 最长公共子序列 的 ascii 和，因为两个 s 的ASCII总和是固定的，所以减去 2 个最长的公共子序列，得到的就是最小代价
// 求最长公共子序列：
// 当 s1[i] === s2[j]：dp[i][j] = dp[i-1][j-1] + ASCII(s1[i])
// 当 s1[i] !== s2[j]：dp[i][j] = max(dp[i-1][j], dp[i][j-1])
// https://leetcode-cn.com/problems/minimum-ascii-delete-sum-for-two-strings/solution/lcsde-dpjie-fa-zhuan-hua-er-lai-c-by-shui-bing/
export const minimumDeleteSum = (s1, s2) => {
    let n = s1.length;
    let m = s2.length;

    let dp = Array(n+1).fill(null).map(_ => Array(m+1).fill(0));
    // s1 = "sea", s2 = "eat"
    // s1 = "delete", s2 = "leet"
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + s1[i-1].charCodeAt();
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
            }
        }
    }

    // 获取两条串的 总ASCII和
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < n; i++) {
        sum1 += s1[i].charCodeAt();
    }
    for (let i = 0; i < m; i++) {
        sum2 += s2[i].charCodeAt();
    }

    return sum1 + sum2 - 2 * dp[n][m];
}
