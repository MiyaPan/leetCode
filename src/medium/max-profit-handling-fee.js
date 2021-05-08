/**
 * 714. 买卖股票的最佳时机含手续费
 * 给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。
    你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
    返回获得利润的最大值。

    注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

    示例 1:

    输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
    输出: 8
    解释: 能够达到的最大利润:  
    在此处买入 prices[0] = 1
    在此处卖出 prices[3] = 8
    在此处买入 prices[4] = 4
    在此处卖出 prices[5] = 9
    总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

    链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee
*/
// 股票问题就是：把钱包当 base，买就减，卖就加，遍历所有条件下的状态：天数 n，交易次数 k，持有与否 s
// for 0 <= i < n
//     for 0 <= k < K
//         for s in {0, 1} // 持有状态只有 0 或 1 两个
//             dp[i][k][s] = max(buy, sell,reset) // 导致状态的动作有这 3个，逐个分析这 3 中操作导致什么样的状态和收益

// 比如说 dp[3][2][1] 的含义就是：今天是第三天，我现在手上持有着股票，至今最多进行 2 次交易。
// 再比如 dp[2][3][0] 的含义：今天是第二天，我现在手上没有持有股票，至今最多进行 3 次交易。
// 我们想求的最终答案是 dp[n - 1][K][0]，即最后一天，最多允许 K 次交易，最多获得多少利润。
// 读者可能问为什么不是 dp[n - 1][K][1]？因为 [1] 代表手上还持有股票，[0] 表示手上的股票已经卖出去了，很显然后者得到的利润一定大于前者。
// 链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-l-2/
export const maxProfit = (prices, fee) => {
    let n = prices.length;
    let dp = Array(n+1).fill(null).map(_ => Array(2).fill(0));
    // 初始状态不能赋值 0，因为第一天买入，是负数，会被 0 max 掉啊！
    dp[0] = [0, Number.MIN_SAFE_INTEGER];
    for (let i = 1; i <= n; i++) {
        // fee 是买的时候减，还是卖的时候减，：上面解法是 卖的是减 。都行
        // 交易次数 k 是买的时候加，还是卖的时候加：上面解法是 买的是加 1
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i-1] - fee);
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i-1]);
    }

    return dp[n][0];
}
