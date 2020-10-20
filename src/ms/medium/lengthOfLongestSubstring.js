/**
 * 3. 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

    示例 1:
    输入: "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
    
    示例 2:
    输入: "bbbbb"
    输出: 1
    解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
    
    示例 3:
    输入: "pwwkew"
    输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
         请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
*/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = s.length;
    if (len <= 0) return 0;

    let undupli = [s[0]];
    let max = 1;
    // "dvdf" 3
    // "pwwkew" 3
    let i = 1;
    for (let i = 1; i < len; i++) {
        let index = undupli.indexOf(s[i]);
        undupli.push(s[i]);
        // 如果包含，i 不用回退呀，想下就知道了
        if (~index) {
            undupli = undupli.slice(index + 1);
        }
        max = Math.max(max, undupli.length);
    }
    return max;
};
