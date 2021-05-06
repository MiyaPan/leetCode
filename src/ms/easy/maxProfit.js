/**
 * 121. 买卖股票的最佳时机
 * 示例 1:
    输入: [7,1,5,3,6,4]
    输出: 5
    解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
        注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
    
    示例 2:
    输入: [7,6,4,3,1]
    输出: 0
    解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

    链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock
*/
/**
 * =============================
 * 二刷
*/
var maxProfit = function(prices) {
    let n = prices.length;
    let dp = Array(n).fill(null).map(_ => Array(2).fill(Number.MIN_SAFE_INTEGER));
    // dp[i][0]: 当天买入的收益
    // dp[i][1]: 当天卖出的收益
    let max = 0;
    dp[0][0] = -prices[0];
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i-1][0], -prices[i]);
        dp[i][1] = dp[i-1][0] + prices[i];
        max = Math.max(max, dp[i][1]);
    }
    return max;
};

/**
 * =============================
 * 一刷
*/
//     7  1  5  3  6  4
// 0:  0
// 1: -7
// 0 表示不持有，不持有有两种情况：昨天就不持有 vs 昨天持有今天卖出 的最大值，所以不持有的收益
                                        // ：max(dp[i-1][0], dp[i-1][1]+prices[i])
// 1 表示持有，因为只能交易一次，所以持有的收益本来应该是 max(dp[i-1][1], dp[i-1][0]-prices[i])【之前有持有，和 之前不持有今天买入 的最大值】
                                        // 现在是：【之前有持有 和 今天直接买入 的最大值】：max(dp[i-1][1], -prices[i])
var maxProfit = function(prices) {
    let len = prices.length;
    if (!len) return 0;

    let dp = Array(len).fill(null).map(_ => Array(2));
    dp[0][0] = 0;
    dp[0][1] = -prices[0];
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
    }
    return dp[len-1][0];
};
