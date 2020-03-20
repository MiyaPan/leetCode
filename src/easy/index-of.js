/**
 * 28. 实现 indexOf 函数
 * 实现 strStr() 函数。
 * 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
 * 
 * 说明：
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 JavaScript 的 indexOf() 定义相符。
*/
// 执行用时 : 60 ms，击败了 60.73%
// 和官方解答2思路一样，方法二：双指针 - 线性时间复杂度
export const indexOf = (haystack, needle) => {
    if (needle === '') {
        return 0;
    }

    let i = 0;
    let j = 0;
    const len = needle.length;
    let hasMatched = false;

    for (; j < haystack.length; j++) {
        if (haystack[j] === needle[i]) {
            hasMatched = true;
            i++;
            if (i === len) {
                return j - len + 1;
            }
        } else {
            if (hasMatched) {
                // "mississippi","issip" 这样压着的情况，j 要跳回去重来
                // j = j - i + 1; // 这里不要 +1，因为 for 循环 会给 +1
                j = j - i;
                i = 0;

                hasMatched = false;
            }
        }
    }

    return -1;
}

// 官方方法三：Rabin Karp - 常数复杂度 KMP 方法？？
// https://leetcode-cn.com/problems/implement-strstr/solution/kmp-suan-fa-xiang-jie-by-labuladong/
// 知乎思路解法：https://www.zhihu.com/question/21923021
