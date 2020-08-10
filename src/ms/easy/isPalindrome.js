/**
 * 125. 验证回文串
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    说明：本题中，我们将空字符串定义为有效的回文串。

    示例 1:
    输入: "A man, a plan, a canal: Panama"
    输出: true

    示例 2:
    输入: "race a car"
    输出: false

    链接：https://leetcode-cn.com/problems/valid-palindrome
*/
var isPalindrome = function(s) {
    let len = s.length;
    let p1 = 0;
    let p2 = len-1;

    while(p1 <= p2) {
        if (!isValid(s[p1])) {
            p1++;
            continue;
        }

        if (!isValid(s[p2])) {
            p2--;
            continue;
        }
        if (s[p1].toLowerCase() !== s[p2].toLowerCase()) return false;
        p1++;
        p2--;
    }
    return true;
};

function isValid(s) {
    let reg = /[a-zA-Z0-9]/;
    return reg.test(s);
}
