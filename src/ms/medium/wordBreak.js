/**
 * 139. 单词拆分
 * 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

    说明：
    拆分时可以重复使用字典中的单词。
    你可以假设字典中没有重复的单词。
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
// TODO: 三刷!!!!
/**
 * =============================
 * 二刷
*/
// 超时了，看哪里能优化：
// "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
// ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
export var wordBreak = function(s, wordDict) {
    let words = new Set(wordDict);
    let n = s.length;
    let dp = Array(n+1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = i-1; j >= 0; j--) {
            if (dp[j] && words.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
};
function dfs(words, s, start) {
    let n = s.length;
    if (start >= n) return true;
    let str = '';
    for (let i = start; i < n; i++) {
        str += s[i];
        if (words.has(str)) {
            if (dfs(words, s, i+1)) return true;
        }
    }
    return false;
}


















/**
 * =============================
 * 一刷
*/
// 这其实也是一道 dp，二刷请再看透 dp 算法
export const wordBreak = (s, wordDict) => {
    let possibleIndex = [0];
    let len = s.length;
    // "goalspecial"
    // ["go","goal","goals","special"]

    // 这个 case 超内存了
    // "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
    // ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]、
    // 这其实是 BFS，上面 case 存在大量重复计算，例如，第二个和第三个 a 都会计算后面所有的去拆分，
    let p = 0;
    while(p < possibleIndex.length) {
        let idx = possibleIndex[p];
        if (idx >= len) return true;
    
        let j = idx + 1;
        while(j <= len) {
            if (wordDict.includes(s.substring(idx, j))) {
                // 这个 if 就是去除重复计算的
                if (!possibleIndex.includes(j)) {
                    possibleIndex.push(j);
                }
            }
            j++;
        }
        p++;
    }
    return false;
}

// dp 解法
// 思路：一个子串 s 能不能，就等于：从 i=0 遍历 s，看 s[0,i]能不能 && s[i,len]是不是词典中的一个词！！！
// 在子串 s 长度确定一次遍历中，只要有一个能划分成功的就标志 dp[s.len] 为 true，然后递推到整个问题的答案
// 初始值：空字符串为 true，才能往下递归呀
export const wordBreak1 = (s, wordDict) => {
    let len = s.length;
    let dp = new Array(len+1).fill(false);
    dp[0] = true;
    // "goalspecial"
    // ["go","goal","goals","special"]
    for (let i = 1; i <= len; i++) {
        // 这里要往后遍历每一种可能的分割的，所以还要一层 for
        for(let j = i - 1; j >= 0; j--) {
            if (dp[j] && wordDict.includes(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[len];
}
