/**
 * 392. 判断子序列
 * https://leetcode-cn.com/problems/is-subsequence/
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
    你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。
    字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

    示例 1:
    s = "abc", t = "ahbgdc"
    返回 true.

    示例 2:
    s = "axc", t = "ahbgdc"
    返回 false.

    后续挑战 :
    如果有大量输入的 S，称作S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

    链接：https://leetcode-cn.com/problems/is-subsequence
*/
/**
 * =============================
 * 二刷
*/
var isSubsequence = function(s, t) {
    let i = 0;
    let j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
            j++;
        } else {
            j++;
        }
    }
    return i === s.length;
}

/**
 * =============================
 * 一刷
*/
var isSubsequence = function(s, t) {
    let n = s.length;
    let m = t.length;
    let i = 0;
    let j = 0;
    
    while(i < n && j < m) {
        if (s[i] === t[j]) {
            i++;
            j++;
        } else {
            j++;
        }
    }
    // n-1 还不行，i = n-1，说明 i 还没找到匹配的 j，必须是越过了 n-1 才行，越过了才匹配成功了，对于二分的，结束边界一定要距举例验证 
    // return i >= n-1;
    return i >= n;
};