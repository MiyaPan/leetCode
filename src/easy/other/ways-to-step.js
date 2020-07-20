/**
 * 面试题 08.01. 三步问题
 * https://leetcode-cn.com/problems/three-steps-problem-lcci/
*/

export const waysToStep = (n) => {
    let dp = [1,2,4];
    for (let i = 3; i<n;i++) {
        // 题目要求 %1000000007，最后模的话，中间会溢出，所以中间就要模了
        dp[i] = (dp[i-1] + dp[i-2] + dp[i-3])%1000000007;
    }
    return dp[n-1];
    // 不能最后
    // return dp[n-1]%1000000007;
}
