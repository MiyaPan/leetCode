/**
 * 467. 环绕字符串中唯一的子字符串
 * https://leetcode-cn.com/problems/unique-substrings-in-wraparound-string/
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
// dp 下标不一定非得是数字，也可以是别的！
export const findSubstringInWraproundString = (p) => {
    let n = p.length;
    let map = {};
    // let ans = 0;
    let ans = 0;
    const len = 26;
    let maxLen = 1;
    for (let i = 0; i < n; i++) {
        if ((p.charCodeAt(i) - p.charCodeAt(i-1) + len) % len === 1) {
            maxLen += 1;
        } else {
            maxLen = 1;
        }
        // 以 c 为结尾的最长串统计了，那么 bc 这种短串必然被统计了，包含在其中了，达到了去重
        map[p[i]] = Math.max(maxLen, map[p[i]] || 1);
    }
    ans = Object.keys(map).reduce((sum, char) => sum + map[char], 0);
    return ans;
}
















/**
 * =============================
 * 1 刷
*/
// 这个题的坑在于，处理重复字符串，比如 "cac"
// https://leetcode-cn.com/problems/unique-substrings-in-wraparound-string/solution/zhao-zui-chang-lian-xu-zi-fu-chuan-chang-du-by-pow/
// 思路：abcdabc，dp 保存以 字符 p[i] 为结尾的最长长度，这里的 dp 就间接起到了 map 的作用，因为后面的 abc 就不会重复记录，而是取 了最值
// 最后将 dp 中的数量全部加和，即可
// 看前4个abcd，得到 dp[a] =1 ... dp[d] = 4，再看后面的 abc，dp[a] = max(dp[a], curMaxLen)
export const findSubstringInWraproundString = (p) => {
    if (p.length < 2) return p.length;

    // let dp = Array(p.length).fill(0);
    let dp = {
        [p[0]]: 1
    };
    let curMaxLen = 1;

    // let map = new Map();
    // map.set(dp[0], 1);

    for (let i = 1; i < p.length; i++) {
        // 相邻的，或者 z 与 a
        // if (p[i].charCodeAt(0) - p[i-1].charCodeAt(0) === 1 || p[i].charCodeAt(0) - p[i-1].charCodeAt(0) === 25) {
        // js 中 -25 % 26 = -25 
        if ((p[i].charCodeAt(0) - p[i-1].charCodeAt(0) + 26) % 26 === 1) {
            curMaxLen += 1;
        } else {
            curMaxLen = 1;
        }
        // Math.max(undefined, 1)
        // NaN
        dp[p[i]] = Math.max(dp[p[i]] || 1, curMaxLen);
    }

    let sum = 0;
    Object.keys(dp).forEach(key => sum += dp[key]);

    return sum;
}