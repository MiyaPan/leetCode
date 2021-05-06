/**
 * 242. 有效的字母异位词
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词[两个单词包含相同的字母，但是次序不同]。

    示例 1:
    输入: s = "anagram", t = "nagaram"
    输出: true

    示例 2:
    输入: s = "rat", t = "car"
    输出: false

    说明: 你可以假设字符串只包含小写字母。
    进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

    链接：https://leetcode-cn.com/problems/valid-anagram
*/
/**
 * =============================
 * 二刷
*/
export var isAnagram = function(s, t) {
    let arr1 = s.split('').sort();
    let arr2 = t.split('').sort();
    if (arr1.length !== arr2.length) return  false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

/**
 * =============================
 * 一刷
*/
export var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    let map = {};
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            map[s[i]] = map[s[i]] + 1;
        } else {
            map[s[i]] = 1;
        }

        if (map[t[i]]) {
            map[t[i]] = map[t[i]] - 1;
        } else {
            map[t[i]] = -1;
        }
    }
    const keys = Object.keys(map);
    for (let i = 0; i < keys.length; i++) {
        if (map[keys[i]] !== 0) return false;
    }
    return true;
};
