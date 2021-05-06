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
 * =============================
 * 二刷
*/
export var firstUniqChar = function(s) {
    // object.keys() 返回的顺序和 for...in 一致，取决于浏览器实现，
    // getOwnPropertyKeys 按照先 数字 key，再字符 key 按照插入顺序，再 symbol key
    // Map 是按照插入顺序返回的

    // 我们可以用 对象存储啊，先一遍存储频率，再跑一遍，找到第一个频率为 1 的就退出就行啦
    // let map = new Map();
    let map = {};
    let n = s.length;
    for (let i = 0; i < n; i++) {
        if (map[s[i]]) {
            map[s[i]] +=1;
        } else {
            map[s[i]] =1;
        }
    }
    for (let i = 0; i < n; i++) {
        if (map[s[i]] === 1) {
            return i;
        }
    }
    return -1;
}

/**
 * =============================
 * 一刷
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