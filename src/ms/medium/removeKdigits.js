/**
 * 402. 移掉K位数字
 * 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
    
    注意:
    num 的长度小于 10002 且 ≥ k。
    num 不会包含任何前导零。
   
    示例 1 :
    输入: num = "1432219", k = 3
    输出: "1219"
    解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
    
    示例 2 :
    输入: num = "10200", k = 1
    输出: "200"
    解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
    
    示例 3 :
    输入: num = "10", k = 2
    输出: "0"
    解释: 从原数字移除所有的数字，剩余为空就是0。

    链接：https://leetcode-cn.com/problems/remove-k-digits
*/
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
// TODO: 三刷，千万不要看之前的，你第一次做出来了，第二次错了(主要是11点了着急回家)=.=看看三刷咋样
/**
 * =============================
 * 二刷
*/
export var removeKdigits = function(num, k) {
    // num = "1432219", k = 3
    // num = "10200", k = 1
    let n = num.length;
    let ans = [];
    let i = 0;
    let rest = n - k;
    while (i < n && rest > 0) {
        let min = Number.MAX_SAFE_INTEGER;
        let minLoc = i;
        for (let j = i; j <= n-rest; j++) {
            if (+num[j] < min) {
                min = +num[j];
                minLoc = j;
            }
        }
        ans.push(min);
        rest--;
        i = minLoc + 1;
    }

    console.log('ans:',ans)
    while (ans[0] === 0) ans.shift();

    return ans.length > 0 ? ans.join('') : '0';
}















/**
 * =============================
 * 一刷
*/
// 思路：去掉 k 位，也就是对剩下的 len-k 位进行填充，只是这个填充是有顺序要求的，不是随意选择的
// 思路倒是和答案异曲同工，但是答案有优化，下面这个效率确实不高，答案借助了栈
export var removeKdigits1 = function(num, k) {
    let len = num.length;
    if (len === k) return '0';

    let rest = len - k;
    let start = 0;
    let ans = '';
    while (rest > 0) {
        let min = Number.MAX_SAFE_INTEGER;
        // 按顺序，寻找区间内最小的插入高位。区间是：比如： mnum = "1432219", k = 3
        for (let i = start; i <= len - rest; i++) {
            if (+num[i] < min) {
                min = +num[i];
                start = i + 1;
            }
        }
        ans += min + '';
        rest--;
    }
    // ans 前面的零去掉: 10200 k=1，只剩一个 0 的时候就不要删除了，不能返回 ''
    while (ans[0] === '0' && ans.length > 1) {
        // string 没有 splice 方法哦！！substring 不修改原字符串哦！
        // ans.substring(0, 1);
        ans = ans.substring(1);
    }
    return ans;
};
