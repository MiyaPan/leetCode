/**
 * 49. 字母异位词分组
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

    示例:
    输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
    输出:
    [
    ["ate","eat","tea"],
    ["nat","tan"],
    ["bat"]
    ]
    
    说明：
    所有输入均为小写字母。
    不考虑答案输出的顺序。

    链接：https://leetcode-cn.com/problems/group-anagrams
*/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 和答案思路 2 一致的，但是答案 2 直接用 数组当 key了，没有像我这么麻烦的 去处理成 字符串。map 真灵活啊，直接用数组啊，唉，不用处理的啊
// https://leetcode-cn.com/problems/group-anagrams/solution/zi-mu-yi-wei-ci-fen-zu-by-leetcode-solut-gyoc/
// 这个时间复杂度分析有点厉害啊
export var groupAnagrams = function(strs) {
    let map = new Map();
    for (let str of strs) {
        // 生成 map 的 key，格式是 str 中字母的统计技术，例如：a3e5f17，按字典顺序
        let charMap = new Map();
        for (let char of str) {
            if (charMap.has(char)) {
                charMap.set(char, charMap.get(char) + 1);
            } else {
                charMap.set(char, 1);
            }
        }
        let mapArr = [...charMap.entries()];
        // 'e' - 'a' 是 NAN，只有 sort 不传 comare 才是按照字典排序的
        // mapArr.sort((a, b) => a[0] - b[0]);
        // charCodeAt不是这么用的，而是 str.charCodeAt(index)，只能返回一个字符的 Unicode
        // mapArr.sort((a, b) => charCodeAt(a[0]) - charCodeAt(b[0]));
        // mapArr.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
        // charCodeAt() 默认 index 是 0
        mapArr.sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt());
        let mapkey = mapArr.map(item => item.join(''));
        let key = mapkey.join('');

        // 检查是否已存了 key
        if (map.has(key)) {
            map.set(key, [...map.get(key), str]);
        } else {
            map.set(key, [str]);
        }
    }
    return [...map.values()];
};
