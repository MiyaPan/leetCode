/**
 * 151. 翻转字符串里的单词
 * https://leetcode-cn.com/problems/reverse-words-in-a-string/
*/
// 用内置 api 贼简单，如果不让用的话，trim 也不用的话
var reverseWords = function(s) {
    let l = 0;
    let r = s.length - 1;
    let ans = '';

    while(s[l] === ' ') {
        l++;
    }
    while(s[r] === ' ') {
        r--;
    }

    while(l <= r) {
        if (s[l] === ' ') {
            l++
            continue;
        }
        let word = '';
        while(l <= r && s[l] !== ' ') {
            word += s[l];
            l++;
        }
        ans = word + (ans ? ' ' : '') + ans;
    }

    return ans;
};
