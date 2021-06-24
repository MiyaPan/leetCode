/**
 * 剑指 Offer 60. n个骰子的点数
 * https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/
*/
// TODO: 三刷！!
// 用减法总比加法好
var dicesProbability = function(n) {
    let nums = [1,2,3,4,5,6];
    let dp = Array(n+1).fill(null).map((_, index)=>Array(index*6+1).fill(0));
    for (let i = 1; i <= 6; i++) {
        dp[1][i] = 1;
    }
    for (let i = 2; i <= n; i++) {
        for (let j = 1 * i; j <= 6*i; j++) {
            for (let num of nums) {
                // if (j-num <= 0) continue;
                if (j-num <= 0) break;
                if (dp[i][j]) {
                    dp[i][j] += dp[i-1][j-num];
                } else {
                    // dp[i][j] = 1;
                    dp[i][j] = dp[i-1][j-num];
                }
            }
        }
    }

    let base = Math.pow(6, n);
    // let ans = dp[n].map(val => val / base);
    let ans = [];
    for (let i = n; i <= 6*n; i++) {
        ans.push(dp[n][i]/base);
    }
    return ans;
};
