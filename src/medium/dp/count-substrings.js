/**
 * 647. 回文子串
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
    具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被计为是不同的子串。

    示例 1:
    输入: "abc"
    输出: 3
    解释: 三个回文子串: "a", "b", "c".

    示例 2:
    输入: "aaa"
    输出: 6
    说明: 6个回文子串: "a", "a", "a", "aa", "aa", "aaa".

    链接：https://leetcode-cn.com/problems/palindromic-substrings
*/

// 要区别于 516. 最长回文子序列
// https://leetcode-cn.com/problems/longest-palindromic-subsequence/

// 516 是区间，不用连续，这个是连续的，所以转移方程不是：
// if (s[i] === s[j]) {
//     dp[i][j] = dp[i+1][j-1] + 2;
// } else {
//     dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
// }

// dp 不优化
export const countSubstrings = (s) => {
    let n = s.length;

    let dp = Array(n).fill(null).map(_ => Array(n).fill(false));
    let count = 0;

    for (let i = n -1; i >= 0; i--) {
        // 因为字符自身也是，所以 j 从 i 开始，而不是 i+1
        for (let j = i; j < n; j++) {
            if (s[i] === s[j] && (j-i < 2 || dp[i+1][j-1])) {
                dp[i][j] = true;
                count++;
            }
        }
    }
    return count;
}

// 中心扩展法
// 思路： 长度为 N 的字符串，可能的回文中文有 2n-1 个：n 个字符，n-1 个空隙
// 如果中心是字符，那 left = right = 当前位置；如果中心是空隙，left = 空隙左，rigth = 空隙右
// 向外扩展：如果 s[left] === s[right] 就多一个，注意边界，left 要 >= 0, right <= n -1
export const countSubstrings1 = (s) => {
    let n = s.length;
    let count = 0;

    // 注意 i 从 0 开始，也就是 0 偶数位置是 字符，奇数位置是空隙
    for (let i = 0; i < 2 * n -1; i++) {
        // i 是字符加空隙啊，怎么能去索引 s 呢！！
        // if (i % 2 === 0) {
        //     left = right = i;
        // } else {
        //     left = i -1;
        //     right = i + 1;
        // }
        if (i % 2 === 0) {
            left = right = i / 2;
        } else {
            left = (i -1) / 2;
            right = (i + 1) / 2;
        }
        
        // left = center / 2
        // right = left + center % 2

        while(s[left] === s[right] && left >=0 && right < n) {
            count++;
            left--;
            right++;
        }
    }

    return count;
}
