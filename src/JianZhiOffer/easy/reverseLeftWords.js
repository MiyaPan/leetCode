/**
 * 剑指 Offer 58 - II. 左旋转字符串
 * https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
*/
var reverseLeftWords = function(s, n) {
    // 如果面试不让用 substring，就，，
    let ans = '';
    for (let i = n; i < s.length; i++) {
        ans += s[i];
    }
    for (let i = 0; i < n; i++) {
        ans += s[i];
    }
    return ans;
};
