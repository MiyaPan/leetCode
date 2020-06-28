/**
 * 5. 最长回文子串
 * https://leetcode-cn.com/problems/longest-palindromic-substring/
*/

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 输入: "cbbd"
// 输出: "bb"

// https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/
// 整个串肯定是都要遍历的，遍历几遍不是问题
// 回文串天然具有状态转移性：s[i,j] = s[i] === s[j] && s[i+1, j-1]
// 因为要看 i，j 两头的位置，所以数组肯定是二维的，
// 看到 s[i+1, j-1] 就要考虑 边界情况：
// 边界是 j-1 和 i+1 不构成区间，即： (j - 1) - (i + 1) + 1 < 2，整理得： j - i - 1 < 2，即 j - i < 3
// 等价于： j - i + 1 < 4，语义就是：j 和 i 的距离等于 3 或者等于 2 的时候，就只需要看两头就可以，就不存在判断子串了，也没有子串可供判断了。
// 因此，在 j - i < 3 并且 s[i] === s[j] 的情况下，可以直接下结论，就是true，不需要你再转移

// 二维的怎么填呢？通过动态转移方程可用看出后项依赖是是什么，决定了遍历顺序：
// s[i,j] 是依赖 s[i+1, j-1]，也就是二维表格中该项的左下角元素【以 i 为纵轴，j 为横轴】，所以不能按照横向遍历，得竖着填表
// 初始值：单个元素肯定是，所以对角线都是 true
// 所以，
export const longestPalindrome = (s) => {
    let n = s.length;
    if (n < 2) return s;

    let dp = Array(n).fill(null).map(() => Array(n).fill(false));

    // 对角线初始值是 true
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // 是 1！！！！！！！，因为单个字符也是回文，输入 ‘ac’，需要输出 ‘a’或者‘c’，而不是 ''
    // 要么就把 长度等于 2 的单独拿出来，但是答案不是这样
    // let maxLen = 0;
    let maxLen = 1;
    let start = 0;

    // 对角线已经处理了，所以 j 从 1 开始
    for (let j = 1; j < n; j++) {
        // 对角线已处理，不需要处理 i = j 的情况，所以 i < j
        for (let i = 0; i < j; i++) {
            if (s[i] !== s[j]) {
                // s[i] 不等于 s[j] 的情况
                dp[i][j] = false;
            } else {
                // s[i] === s[j] 的情况
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i+1][j-1];
                }
            }

            if (dp[i][j] && (j - i + 1) > maxLen) {
                maxLen = j - i + 1;
                start = i;
            }
        }
    }

    return s.substring(start, start + maxLen);
}
