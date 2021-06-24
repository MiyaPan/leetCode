/**
 * 剑指 Offer 58 - I. 翻转单词顺序
 * https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/
*/
var reverseWords = function(s) {
    let ans = '';
    s = s.trim();
    let n = s.length;
    let i = n-1;
    let j = n-1;
    while (i >= 0) {
        while (i >= 0 && s[i] !== ' ') i--;
        ans += s.substring(i+1, j+1) + ' ';
        while (i >= 0 && s[i] === ' ') {
            i--;
        }
        j = i;
    }
    // return ans.substring(0, s.length-1);
    return ans.substring(0, ans.length-1);
};
