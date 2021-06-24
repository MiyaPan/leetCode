/**
 * 剑指 Offer 19. 正则表达式匹配
 * 请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。
 * 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。

    示例 1:
    输入:
    s = "aa"
    p = "a"
    输出: false
    解释: "a" 无法匹配 "aa" 整个字符串。
    
    示例 2:
    输入:
    s = "aa"
    p = "a*"
    输出: true
    解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
    
    示例 3:
    输入:
    s = "ab"
    p = ".*"
    输出: true
    解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
    
    示例 4:
    输入:
    s = "aab"
    p = "c*a*b"
    输出: true
    解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
    
    示例 5:
    输入:
    s = "mississippi"
    p = "mis*is*p*."
    输出: false
    s 可能为空，且只包含从 a-z 的小写字母。
    p 可能为空，且只包含从 a-z 的小写字母以及字符 . 和 *，无连续的 '*'。
    注意：本题与主站 10 题相同：https://leetcode-cn.com/problems/regular-expression-matching/

    链接：https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof
*/
// TODO: 三刷, 大佬的解答令人惊艳！神清气爽，为了学习大佬的思路也要三刷下
// 大佬思路：https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/solution/zhu-xing-xiang-xi-jiang-jie-you-qian-ru-shen-by-je/
var isMatch = function(s, p) {
    let n = s.length;
    let m = p.length;
    let dp = Array(n+1).fill(null).map(_=> Array(m+1).fill(false));
    // 空字符串 是和 空正则 匹配的
    dp[0][0] = true;
    // 关键点哦：i 不能从 0 开始，因为 空字符串 是可能和 非空正则 匹配的，比如 s='',p=a*。 是需要计算的！要是不匹配这个空字符串，会影响后面的判断的
    // for (let i = 1; i <= n; i++) {
    for (let i = 0; i <= n; i++) {
        // 由于 i 是从 0 开始的，有空字符串的起步，j 也要从 0 开始，匹配一个空正则？
        // for (let j = 1; j <= m; j++) {
        for (let j = 0; j <= m; j++) {
            // 空正则
            if (j === 0) {
                dp[i][j] = i === 0; // 只有初始化的 dp[0][0] 为 true，其他 非空字符串 和 空正则 肯定不匹配
            } else {
                // j 是 *，这里 index 多了 1，因为 dp 初始化多了边界
                if (p[j-1] === '*') {
                    // if 和 else 不是互斥的关系，应该先尝试不考虑 char*，再看看考虑它的情况
                    // if (i >= 1 && j >= 2 && (s[i-1] === p[j-2] || p[j-2] === '.')) {
                    //     // dp[i][j] = dp[i-1][j];
                    //     // 原来边界还可以这样处理，即使用到了 i-2，也不一定非得 new 出 多两个边界的 dp，可以判断的，只要 越界的情况有确定的值，实际上肯定有确定的值啊
                    //     // 但是不能放到内层 if 中，会影响上层 if 的判断，比如s=ab,p=.*, i=0，j=2 时候因为 j=.就进来了，但由判断 i>=1 就啥也没做，保持了初始值 false，
                    //     // 就错了，其实应该进到下面的 if 的，所以这个 if 应该在上层 if 就判断
                    //     // if (i >= 1 && j >= 2) {
                    //         // 小于 1 的就不用管拉，直接是 false 啊
                    //         dp[i][j] = dp[i-1][j];
                    //     // }
                    // } else {
                    //     // "aaa", "ab*a*c*a"
                    //     if (j >= 2) {
                    //         dp[i][j] = dp[i][j-2];
                    //     }
                    // }
                    // 因为上面的 if else 处理成不互斥的了，就得取 | 的关系了
                    // 第一个if还可以处理["", ".*"]这样的输入，第二个if是第一个if的补充说明。
                    if (j >= 2) {
                        // dp[i][j] = dp[i][j-2];
                        dp[i][j] = dp[i][j] || dp[i][j-2];
                    }
                    if (i >= 1 && j >= 2 && (s[i-1] === p[j-2] || p[j-2] === '.')) {
                        // dp[i][j] = dp[i-1][j];
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                    }
                } else {
                    if (s[i-1] === p[j-1] || p[j-1] === '.') {
                        // // 原来边界还可以这样处理，即使用到了 i-2，也不一定非得 new 出 多两个边界的 dp，可以判断的
                        // dp[i][j] = dp[i-1][j-1];
                        if (i >= 1) {
                            dp[i][j] = dp[i-1][j-1];
                        }
                    } else {
                        dp[i][j] = false;
                    }
                }
            }
        }
    }
    return dp[n][m];
};
