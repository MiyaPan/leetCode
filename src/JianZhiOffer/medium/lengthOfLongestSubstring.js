/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/
*/
// 自己的思路很棒，答案的思路也可以看下：https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/solution/mian-shi-ti-48-zui-chang-bu-han-zhong-fu-zi-fu-d-9/
// 终归是要判断 起点和前一个重复的谁距离较近的，也就是下面 start 的取值是和答案异曲同工的
var lengthOfLongestSubstring = function(s) {
    if (s === '') return 0;
    let n = s.length;
    let map = new Map();
    let len = 0;
    let maxLen = 0;
    let start = 0;
    for (let i = 0; i < n; i++) {
        if (map.has(s[i])) {
            // 不能直接计算 len，得标记下起始点，要不就得把 map 中 index 小于上一轮重复元素的都删掉
            // len = i - map.get(s[i]);
            // start 不能始终找前一个重复的，比如 abba，应该取 start 指针和前一个重复的中较靠后的一个
            start = Math.max(map.get(s[i]), start);
            len = i - start;
        } else {
            len++;
        }

        map.set(s[i], i);
        if (len > maxLen) {
            maxLen = len;
        }
    }
    return maxLen;
};
