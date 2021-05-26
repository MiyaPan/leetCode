/**
 * 91. 解码方法
    一条包含字母 A-Z 的消息通过以下映射进行了 编码 ：

    'A' -> 1
    'B' -> 2
    ...
    'Z' -> 26
    要 解码 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，"11106" 可以映射为：

    "AAJF" ，将消息分组为 (1 1 10 6)
    "KJF" ，将消息分组为 (11 10 6)
    注意，消息不能分组为  (1 11 06) ，因为 "06" 不能映射为 "F" ，这是由于 "6" 和 "06" 在映射中并不等价。

    给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。
    题目数据保证答案肯定是一个 32 位 的整数。

    示例 1：
    输入：s = "12"
    输出：2
    解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
    
    示例 2：
    输入：s = "226"
    输出：3
    解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
    
    示例 3：
    输入：s = "0"
    输出：0
    解释：没有字符映射到以 0 开头的数字。
    含有 0 的有效映射是 'J' -> "10" 和 'T'-> "20" 。
    由于没有字符，因此没有有效的方法对此进行解码，因为所有数字都需要映射。
    
    示例 4：
    输入：s = "06"
    输出：0
    解释："06" 不能映射到 "F" ，因为字符串含有前导 0（"6" 和 "06" 在映射中并不等价）。

    提示：
    1 <= s.length <= 100
    s 只包含数字，并且可能包含前导零。
    链接：https://leetcode-cn.com/problems/decode-ways
*/
/**
 * =============================
 * 二刷
*/
export const numDecodings = (s) => {
    if (s[0] === '0') return 0;

    let n = s.length;
    let dp = Array(n).fill(0);
    dp[0] = 1;
    // "2101"
    for (let i = 1; i < n; i++) {
        if (s[i] === '0') {
            // s[i] = 0 的时候看得看 s[i-1] 是不是也是 0 
            // if (s[i] <= '2') {
            if (s[i-1] <= '2' && s[i-1] > '0') {
                dp[i] = dp[i-2] || 1;
            } else {
                return 0;
            }
        } else {
            // 06 这种情况要排除
            // if (s[i-1] + s[i] > '26') {
            if (s[i-1] + s[i] > '26' || s[i-1] + s[i] < '10') {
                // 不能和前一个结合，之能坠再后面，就是前一个的数量
                dp[i] = dp[i-1];
            } else {
                // 能和前一个结合
                // dp[i-2] 可能不存在，因为没处理 dp[1]，兜底下
                dp[i] = dp[i-1] + (dp[i-2] || 1);
            }
        }
    }
    return dp[n-1];
}
















/**
 * =============================
 * 一刷
*/
// 思路：动态规划也不是非得只有一种状态转移方程的，，，可以分类讨论，有多个的，，只要解出来就行啊，管它“规范不规范”
// 也不要上来就搞动态转移方程，先撕把题目啊
/**
 * 思路：
 * 看当前的字符自己能不能独立：
 *      能独立，其实就没贡献啥；【能不能独立就看是不是 0】
 *          能独立的也得看下和前一个可不可以组队
 *              能和前一个组，让它和前一个在一起，牺牲前一个，所以去找 dp[i-2]，取 max(dp[i-2]+2, dp[i-1])，看组队多还是 不组队多
 *              不能和前一个组，就是前面的排列，然后继续好了
 *      不能独立的还得拉上 s[i-1] 看：
 *          能和前一个组，就只能让它和前一个在一起，牺牲前一个，所以去找 dp[i-2] 是多少；
 *          不能和前一个组，就完了，整个题目都无解了，直接退出 0
 * 
*/
export const numDecodings = (s) => {
    let n = s.length;
    let dp = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        // 自己不能独立的
        if (s[i] === '0') {
            if (s[i-1] === '1' || s[i-1] === '2') {
                // || 1 就是个兜底
                dp[i] = dp[i-2] || 1;
            } else {
                return 0;
            }
        } else {
            // 自己能独立
            // 看能不能和前一个组队: 前一个是 1 那它是啥都行；前一个是 2，那他 <=6 就行；前一个是 0，就是不能组队的情况
            if (s[i-1] === '1' || s[i-1] === '2' && s[i] <= '6') {
                // "226" 这个可以看出来不是 max 的关系，它不是 dp[i-2] * 2 的关系，是包含 i 和不包含两种情况相加的关系
                // 因为 dp[i-2]*2，里面漏掉了[i-2]和[i-1]想组合的情况了，所以加吧，二刷吧，反正也记不住
                // dp[i] = Math.max((dp[i-2] || 1)*2, (dp[i-1] || 1));
                dp[i] = (dp[i-2] || 1) + (dp[i-1] || 1);
            } else {
                dp[i] = dp[i-1] || 1;
            }
        }
    }
    return dp[n-1];
}
