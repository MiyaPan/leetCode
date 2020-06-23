/**
 * 121. 买卖股票的最佳时机
*/
// 在历史最低点买肯定对，一次遍历
export const maxProfit = (prices) => {
    let min = prices[0];
    let max = 0;
    for (let i = 0; i< prices.length;i++) {
        if (prices[i] < min) min = prices[i];
        if (prices[i] - min > max) max = prices[i] - min;
    }

    return max;
}