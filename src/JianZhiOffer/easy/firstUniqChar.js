/**
 * 剑指 Offer 50. 第一个只出现一次的字符
 * https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/
*/
var firstUniqChar = function(s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]+1));
        } else {
            map.set(s[i], 1);
        }
    }
    for (let key of map.keys()) {
        if (map.get(key) === 1) {
            return key;
        }
    }
    return ' ';
};
