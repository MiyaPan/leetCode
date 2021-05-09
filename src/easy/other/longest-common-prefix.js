/**
 * 14. 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。
    如果不存在公共前缀，返回空字符串 ""。

    示例 1：
    输入：strs = ["flower","flow","flight"]
    输出："fl"
    
    示例 2：
    输入：strs = ["dog","racecar","car"]
    输出：""
    解释：输入不存在公共前缀。

    提示：
    0 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] 仅由小写英文字母组成

    链接：https://leetcode-cn.com/problems/longest-common-prefix
*/
/**
 * =============================
 * 二刷
*/
export const longestCommonPrefix = (strs) => {
    let n = strs.length;
    let j = 0;
    let minLen = Number.MAX_SAFE_INTEGER;
    for (let word of strs) {
        minLen = Math.min(minLen, word.length);
    }

    while (j <= minLen) {
        let char = strs[0].charAt(j);
        for (let i = 1; i < n; i++) {
            if (strs[i].charAt(j) !== char) {
                return strs[0].substring(0, j);
            }
        }
        j++;
    }
    return '';
}

/**
 * =============================
 * 二刷
*/
// 执行用时 : 76 ms，击败了 34.82%
// 内存消耗 : 35.3 MB, 击败了 43.61%
export const longestCommonPrefix = (strs) => {
    if (strs.length === 0) {
        return '';
    }

    if (strs.length === 1) {
        return strs[0];
    }

    for (let j = 0; j < strs[0].length; j++) {
        for (let i = 1; i < strs.length; i++) {
            // 保证 [0] 是最短的
            if (strs[i].length < strs[0].length) {
                let temp = strs[0];
                strs[0] = strs[i];
                strs[i] = temp;
            }

            if (i === strs.length -1 && j === strs[0].length - 1 && strs[i][j] === strs[0][j]) {
                return strs[0];
            }
            if (strs[i][j] !== strs[0][j]) {
                return (strs[0]).substring(0,j);
            }
        }
    }

    return '';
}

// 执行用时 : 92 ms，击败了 10.71%
// 内存消耗 : 33.9 MB, 击败了 89.18%
export const longestCommonPrefix2 = (strs) => {
    if (strs.length === 0) {
        return '';
    }

    strs.sort();

    const first = strs[0];
    const last = strs[strs.length - 1];

    // 1. 这样写正则不行！
    // if (first === last || last.match(`/^${first}/`)) {
    
    // 2. 正则效率低
    // const reg = new RegExp(`^${first}`)
    // if (first === last || last.match(reg)) {

    // 3. includes 不对，includes 是只要包含就 true，不是起始位置
    // if (first === last || last.includes(first)) {

    // 执行用时 : 64 ms，击败了 84.91%
    // 内存消耗 : 33.8 MB, 击败了 91.72%
    if (first === last || last.startWith(first)) {
        return first;
    } else {
        for (let i = 0; i< first.length; i++) {
            if (first[i] !== last[i]) {
                return first.substring(0, i);
            }
        }
    }

    return '';
}
