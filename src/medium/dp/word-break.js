/**
 * 139. 单词拆分
 * https://leetcode-cn.com/problems/word-break/
*/

// 示例 1：

// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
// 示例 2：

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
//      注意你可以重复使用字典中的单词。
// 示例 3：

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false

// 思路：一个子串 s 能不能，就等于：从 i=0 遍历 s，看 s[0,i]能不能 && s[i,len]是不是词典中的一个词
// 在子串 s 长度确定一次遍历中，只要有一个能划分成功的就标志 dp[s.len] 为 true，然后递推到整个问题的答案
// 初始值：空字符串为 true，才能往下递归呀
export const wordBreak = (s, wordDict) => {
    // js 数组也要初始化长度，不然那些默认的 fasle就没有，访问不到
    // let dp = [true];
    let dp = Array(s.length+1).fill(false);
    dp[0] = true;

    for (let sublen = 1; sublen <= s.length; sublen++) {
        // for (let i = 0; i < sublen.length; i++) {
        for (let i = 0; i < sublen; i++) {
            // 优化，如果 dp[j] 不是，那后面也不用判断了进 if 了
            if (dp[i] === false) continue;
            if (dp[i] && wordDict.includes(s.substring(i, sublen))) {
                dp[sublen] = true;
                break;
            }
        }
    }

    return dp[s.length];
}
