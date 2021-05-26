/**
 * 151. 翻转字符串里的单词
 * https://leetcode-cn.com/problems/reverse-words-in-a-string/
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
var reverseWords = function(s) {
    let n = s.length;
    let ans = '';
    let l = 0;
    while (l < n && s[l] === ' ') l++;
    let r = n-1;
    while (r >= 0 && s[r] === ' ') r--;

    let word = '';
    while (l <= r) {
        word = ''
        while (l <= r && s[l] !== ' ') {
            word += s[l++];
        }
        ans = word + (ans ? ' ' : '') + ans;
        while (l <= r && s[l] === ' ') l++;
    }

    return ans;

    // 不挣扎了，还是写个当做 ans 不占用空间的吧
    // 思路是和答案的 o(1) 一样的，但是 字符串是不可变的没办法，答案 java 还是用是 stringBuffer
    // // 去掉开头的空格
    // while (i < n && s[i] === ' ') i++;
    // // 去掉的空格
    // while (i < n) {
    //     while (s[i] !== ' ') {
    //         s[p++] = s[i++];
    //     }
    //     while (i < n && s[i] === ' ') i++;
    //     s[p++] = ' ';
    // }

    // // 逆转整个字符串
    // let i = 0;
    // let j = p;
    // while (i < j) {
    //     swap(s, i, j)
    //     i++;
    //     j--;
    // }

    // // 逆转每个单词
}
function swap(arr, i, j) {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
}


















/**
 * =============================
 * 一刷
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
