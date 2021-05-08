/**
 * 744. 寻找比目标字母大的最小字母
 * 给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母 target，
 * 请你寻找在这一有序列表里比目标字母大的最小字母。
    在比较时，字母是依序循环出现的。举个例子：

    如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'
    示例：

    输入:
    letters = ["c", "f", "j"]
    target = "a"
    输出: "c"

    输入:
    letters = ["c", "f", "j"]
    target = "c"
    输出: "f"

    输入:
    letters = ["c", "f", "j"]
    target = "d"
    输出: "f"

    输入:
    letters = ["c", "f", "j"]
    target = "g"
    输出: "j"

    输入:
    letters = ["c", "f", "j"]
    target = "j"
    输出: "c"

    输入:
    letters = ["c", "f", "j"]
    target = "k"
    输出: "c"

    提示：
    letters长度范围在[2, 10000]区间内。
    letters 仅由小写字母组成，最少包含两个不同的字母。
    目标字母target 是一个小写字母。

 * https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/
*/
/**
 * =============================
 * 二刷
*/
export const nextGreatestLetter = (letters, target) => {
    let n = letters.length;
    let l = 0;
    let r = n - 1;
    // letters = ["c", "f", "j"]
    // target = "g"
    // letters = ["c", "f", "j"]
    // target = "a"
    // letters = ["c", "f", "j"]
    // target = "c"
    // letters = ["c", "f", "j"]
    // target = "j" 输出 c
    // letters = ["c", "f", "j"]
    // target = "k" 输出 c
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (letters[m] > target) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    // l 是目标
    if (l >= n) l = 0;
    return letters[l];
}

/**
 * =============================
 * 一刷
*/
// 主要数组是有重复的，比如输入 ["e","e","e","e","e","e","n","n","n","n"]，"e"
// 输出为 n
export const nextGreatestLetter = (letters, target) => {
    let n = letters.length;
    if (target.charCodeAt() >= letters[n-1].charCodeAt()) return letters[0];

    let l = 0;
    let r = n-1;

    while (l <= r) {
        let m = parseInt((l+r)/2);
        if (letters[m].charCodeAt() <= target.charCodeAt()) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return letters[l];
}
