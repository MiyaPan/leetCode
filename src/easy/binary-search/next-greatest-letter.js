/**
 * 744. 寻找比目标字母大的最小字母
 * https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/
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
