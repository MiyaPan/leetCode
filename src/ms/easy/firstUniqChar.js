/**
 * 387. 字符串中的第一个唯一字符
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

    示例：

    s = "leetcode"
    返回 0

    s = "loveleetcode"
    返回 2
     
    提示：你可以假定该字符串只包含小写字母。
    链接：https://leetcode-cn.com/problems/first-unique-character-in-a-string
*/
/**
 * @param {string} s
 * @return {number}
 */
export var firstUniqChar = function(s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i])) {
            map.set(s[i], {count: 2, index: i});
        } else {
            map.set(s[i], {count: 1, index: i});
        }
    }

    const target = Array.from(map.keys()).find(item => map.get(item).count === 1);
    return target ? map.get(target).index : -1;
};