/**
 * 557. 反转字符串中的单词 III
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

    示例 1:
    输入: "Let's take LeetCode contest"
    输出: "s'teL ekat edoCteeL tsetnoc" 

    注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

    链接：https://leetcode-cn.com/problems/reverse-words-in-a-string-iii
*/
/**
 * =============================
 * 二刷
*/
var reverseWords = function(s) {
    let words = s.split(' ');
    let ans = [];
    for (let word of words) {
        // 字符串本身没有 reverse 方法
        let chars = word.split('');
        chars.reverse();
        ans.push(chars.join(''));
    }
    return ans.join(' ');
};

/**
 * =============================
 * 一刷
*/
var reverseWords = function(s) {
    let a = s.split(' ');

    for (let i = 0; i < a.length; i++) {
        a[i] = helper(a[i]);
    }
    return a.join(' ');
};

function helper(s) {
    let a = s.split('');
    a.reverse();
    return a.join('');
}
