/**
 * 392. 判断子序列
 * https://leetcode-cn.com/problems/is-subsequence/
*/
var isSubsequence = function(s, t) {
    if (s === '') return true;
    let j = 0;
    let i = 0;
    while (i<t.length) {
        if (t[i] === s[j]) {
            i++;
            j++;
        } else {
            i++;
        }
        if (j === s.length) return true;
    }
    return false;
};