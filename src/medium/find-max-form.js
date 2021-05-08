/**
 * 474. 一和零
 * https://leetcode-cn.com/problems/ones-and-zeroes/description/
 * 现在，假设你分别支配着 m 个 0 和 n 个 1。另外，还有一个仅包含 0 和 1 字符串的数组。

    你的任务是使用给定的 m 个 0 和 n 个 1 ，找到能拼出存在于数组中的字符串的最大数量。每个 0 和 1 至多被使用一次。
    注意:
    给定 0 和 1 的数量都不会超过 100。
    给定字符串数组的长度不会超过 600。

    示例 1:

    输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
    输出: 4
    解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。

    示例 2:

    输入: Array = {"10", "0", "1"}, m = 1, n = 1
    输出: 2
     解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。
*/

// https://leetcode-cn.com/problems/ones-and-zeroes/solution/dong-tai-gui-hua-zhuan-huan-wei-0-1-bei-bao-wen-ti/
// 物品选择方或者不放，容量一点点变大，去遍历
export const findMaxForm = (strs, m, n) => {
    let dp = Array(m+1).fill(null).map(_ => Array(n+1).fill(0));

    for (let s of strs) {
        const zeros = getZero(s);
        const ones = s.length - zeros;
        // 只需要统计 1 和 0 的个数在 总数 和 用掉之后剩下的数  之间的数
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                dp[i][j] = Math.max(1 + dp[i-zeros][j-ones], dp[i][j]);
            }
        }
    }

    return dp[m][n];
}

function getZero(s) {
    let len = s.length;
    let zero =0;
    for (let i = 0; i<len; i++) {
        if (s[i] === '0') zero++;
    }
    return zero;
}