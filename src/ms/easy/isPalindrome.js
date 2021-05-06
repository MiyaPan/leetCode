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
/**
 * =============================
 * 二刷
*/
/**
 * 错误笔记：
 * 
    1. string 没有一个方法是改变原字符串的。在 js 中字符串是不可变的，所以更新字符串的操作都是去申请了新的空间，指向了新的地址。
        所以批量修改字符串会有明显的效率问题
    2. array 不确定的方法中修改原数组的方法就 3 个！reverse、sort 和 splice
*/
var isPalindrome = function(s) {
    // s.replace(/![a-zA-Z0-9]/, '');
    // 正则 非某个字符是 ^，正则中的 ! 只用在零宽匹配中，不是表示非的意思
    // ^ 在中括号中表示非这个集合的任意一个字符，在中括号外面表示以 XX 开头
    // s.replace(/[^a-zA-Z0-9]/, '');
    // 我靠！！！ replace 不改变原数组！！！！只返回新数组
    s = s.replace(/[^a-zA-Z0-9]/g, '');
    let i = 0;
    let j = s.length-1;
    // 我靠，toLowerCase 也不改变原字符串！！！！！啊啊啊
    // s.toLowerCase();
    s = s.toLowerCase();
    while (i <= j) {
        // 还得忽略大小写
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
};

/**
 * =============================
 * 一刷
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
