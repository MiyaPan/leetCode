/**
 * 767. 重构字符串
 * 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
    若可行，输出任意可行的结果。若不可行，返回空字符串。

    示例 1:
    输入: S = "aab"
    输出: "aba"
    
    示例 2:
    输入: S = "aaab"
    输出: ""
    
    注意:
    S 只包含小写字母并且长度在[1, 500]区间内。

    链接：https://leetcode-cn.com/problems/reorganize-string
*/
/**
 * @param {string} S
 * @return {string}
 */
/**
 * case:
 * "baaba"
 * "ababa"
*/
// 思路：贪心思想。按照出现频率排序。如果想间隔不同，出现频率最高的不能超过 (n+1)/2【偶数个是：n/2, 奇数个是 (n+1)/2，都可以统一成(n+1)/2】
// 超过了一半就直接返回''，没超过就先把高频的间隔放上，先放奇数位还是偶数位呢，奇数位，因为 奇数位 >= 偶数位
export var reorganizeString = function(S) {
    // map 可以用 Array.from 或者 ... 直接转换成数组，数组是二维的键值对 [[key, value], ...]，比 对象好使
    // let map = {};
    let map = new Map();
    let len = S.length;

    for (let i = 0; i < len; i++) {
        if (map.has(S[i])) {
            map.set(S[i], map.get(S[i])+1);
        } else {
            map.set(S[i], 1);
        }
    }

    let arr = [...map];
    arr.sort((a, b) => b[1] - a[1]);
    if (arr[0][1] > (len+1)/2) return '';
    console.log(arr)

    let ans = Array(len).fill(0);

    let j = 0;
    // 两个 for 挺好啊，有啥不好的，为啥非写一个 for，然后里面加个 pos 控制插入位置，再判断奇数位放完了，再让 index = 1
    for (let i = 0; i < len; i = i+2) {
        ans[i] = arr[j][0];
        arr[j][1]--;
        // 一个字符用完了 j++
        if (arr[j][1] === 0) j++;
    }
    for (let i = 1; i < len; i = i+2) {
        ans[i] = arr[j][0];
        arr[j][1]--;
        // 一个字符用完了 j++
        if (arr[j][1] === 0) j++;
    }

    return ans.join('');
};
