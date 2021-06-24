/**
 * 剑指 Offer 05. 替换空格
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

    示例 1：
    输入：s = "We are happy."
    输出："We%20are%20happy."

    限制：
    0 <= s 的长度 <= 10000

    链接：https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof
*/
var replaceSpace = function(s) {
    return s.replace(/\s/g, '%20');
};

var replaceSpace = function(s) {
   let ans = '';
   let p = 0;
   while (p < s.length) {
       if (s[p] === ' ') {
           ans += '%20';
       } else {
           ans += s[p];
       }
       p++;
   }
   return ans;
};
