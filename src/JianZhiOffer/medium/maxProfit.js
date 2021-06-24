/**
 * 剑指 Offer 63. 股票的最大利润
 * https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/
*/
var maxProfit = function(prices) {
    let n = prices.length;
    let dp = Array(2).fill(null).map(_ => Array(n).fill(0));
    // dp[0] 这行记录买入 花的最少的钱
    // dp[1] 这行记录卖出 赚的最多的钱，想今天卖出，必须昨天或者昨天之前买入，也就是上一行买入的最少的钱
    dp[0][0] = -prices[0];
    dp[0][1] = 0;
    let max = 0;
    for (let i = 1; i < n; i++) {
        dp[0][i] = Math.max(dp[0][i-1], -prices[i]);
        dp[1][i] = dp[0][i-1] + prices[i];
        // max 更新 肯定是卖出的最后的结算
        max = Math.max(max, dp[1][i]);
    }
    return max;
};
