/**
 * 646. 最长数对链
 * 给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。
    现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。
    给定一个对数集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。

    示例 :

    输入: [[1,2], [2,3], [3,4]]
    输出: 2
    解释: 最长的数对链是 [1,2] -> [3,4]

    注意：
    给出数对的个数在 [1, 1000] 范围内。

    链接：https://leetcode-cn.com/problems/maximum-length-of-pair-chain
*/
/**
 * =============================  
 * 二刷
*/
// [[-6,9],[1,6],[8,10],[-1,4],[-6,-2],[-9,8],[-5,3],[0,3]]
// 输出：
// 1
// 预期：
// 3
var findLongestChain = function(pairs) {
    let n = pairs.length;
    pairs.sort((a, b) => a[0] === b[0] ? a[1]-b[1] : a[0]-b[0]);
    // 还不能默认 0 呢，得看具体题目分析，这里即使前面没有合适的，自己也能构成 1 ，所以默认值就该是 1，不然后面加就不对了
    // let dp = Array(n).fill(0);
    let dp = Array(n).fill(1);
    let max = 1;
    for (let i = 1; i < n; i++) {
        for (let j = i-1; j >= 0; j--) {
            if (pairs[j][1] < pairs[i][0]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return max;
}













/**
 * =============================  
 * 1 刷
*/
// [[-6,9],[1,6],[8,10],[-1,4],[-6,-2],[-9,8],[-5,3],[0,3]]
// 输出：
// 1
// 预期：
// 3
export const findLongestChain = (pairs) => {
    pairs.sort((a,b) => a[0] - b[0]);

    let n = pairs.length;
    let dp = Array(n).fill(1);
    let max = 0;

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i+1; j < n; j++) {
            if (pairs[i][1] < pairs[j][0]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        max = Math.max(max, dp[i]);
    }

    return max;
}
