/**
 * 474. 一和零
 * https://leetcode-cn.com/problems/ones-and-zeroes/description/
 * 现在，假设你分别支配着 m 个 0 和 n 个 1。另外，还有一个仅包含 0 和 1 字符串的数组。

    你的任务是使用给定的 m 个 0 和 n 个 1 ，找到能拼出存在于数组中的字符串的最大数量。每个 0 和 1 至多被使用一次。
    注意:
    给定 0 和 1 的数量都不会超过 100。
    给定字符串数组的长度不会超过 600。

    示例 1:

    输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
    输出: 4
    解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。

    示例 2:

    输入: Array = {"10", "0", "1"}, m = 1, n = 1
    输出: 2
     解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。
*/
// TODO: 三刷!!！！！，背包啊啊啊！！！不刷就忘！
// ！！！关键点啊：如果没有节省最外层 物品的 i 的话，就正序，不然会有更多数据没更新到，如果物品层写成 for of 就是优化了空间，这个时候要逆序
/**
 * =============================  
 * 二刷
*/
// 定义状态：尝试题目问啥，就把啥定义成状态。dp[i][j][k] 表示输入字符串在子区间 [0, i] 能够使用 j 个 0 和 k 个 1 的字符串的最大数量。
// 多数情况背包问题就应该直接套公式，然后推动态转移方程，不要一开始就过度研究 dp 的含义，当你套完模板，含义就出来了，dp含义应尝试问什么就怎么定义
export const findMaxForm = (strs, m, n) => {
    let len = strs.length;
    let dp = Array(len+1).fill(null).map(_=> Array(m+1).fill(null).map(_=> Array(n+1).fill(0)));
    // ["111","1000","1000","1000"],9,3
    for (let i = 1; i <= len; i++) {
        let {num0, num1} = get01(strs[i-1]);
        // 关键点啊：如果没有节省最外层 物品的 i 的话，就正序，不然会有更多数据没更新到
        // 01 背包不能重复选择，内层循环需要逆序，保证后面数据更新的时候不收前面数据更新的影响
        // for (let j = m; j >= m-num0; j--) {
        // for (let j = m; j >= num0; j--) {
        //     // for (let k = n; k >= n-num1; k--) {
        //     for (let k = n; k >= num1; k--) {
        //         // 不用当前的字符串 vs 用当前的
        //         // 如果用当前的话，肯定不是 i 这层，是 i-1 层啊啊
        //         // dp[i][j][k] = Math.max(dp[i-1][j][k], dp[i][j-num0][k-num1]+1);
        //         dp[i][j][k] = Math.max(dp[i-1][j][k], dp[i-1][j-num0][k-num1]+1);
        //     }
        // }
        for (let j = 0; j <= m; j++) {
            // for (let k = n; k >= n-num1; k--) {
            for (let k = 0; k <= n; k++) {
                dp[i][j][k] = dp[i-1][j][k];
                if (j >= num0 && k >= num1) {
                    dp[i][j][k] = Math.max(dp[i-1][j][k], dp[i-1][j-num0][k-num1]+1);
                }
            }
        }
        
    }
    return dp[len][m][n];
}
function get01(str) {
    let count0 = 0;
    let count1 = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '0') {
            count0++;
        } else {
            count1++;
        }
    }
    return {
        num0: count0,
        num1: count1
    }
}















/**
 * =============================  
 * 1 刷
*/
// https://leetcode-cn.com/problems/ones-and-zeroes/solution/dong-tai-gui-hua-zhuan-huan-wei-0-1-bei-bao-wen-ti/
// 物品选择方或者不放，容量一点点变大，去遍历
export const findMaxForm = (strs, m, n) => {
    let dp = Array(m+1).fill(null).map(_ => Array(n+1).fill(0));

    for (let s of strs) {
        const zeros = getZero(s);
        const ones = s.length - zeros;
        // 只需要统计 1 和 0 的个数在 总数 和 用掉之后剩下的数  之间的数
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                dp[i][j] = Math.max(1 + dp[i-zeros][j-ones], dp[i][j]);
            }
        }
    }

    return dp[m][n];
}

function getZero(s) {
    let len = s.length;
    let zero =0;
    for (let i = 0; i<len; i++) {
        if (s[i] === '0') zero++;
    }
    return zero;
}