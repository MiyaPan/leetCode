/**
 * 322. 零钱兑换
 * https://leetcode-cn.com/problems/coin-change/
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 
    示例 1:
    输入: coins = [1, 2, 5], amount = 11
    输出: 3 
    解释: 11 = 5 + 5 + 1

    示例 2:
    输入: coins = [2], amount = 3
    输出: -1

    提示：
    1 <= coins.length <= 12
    1 <= coins[i] <= 231 - 1
    0 <= amount <= 104
*/

export const coinChange = (coins, amount) => {
    // mdzz有病啊，求的是最小值，初始化用 -1，用 max 啊！
    // let dp = Array(amount+1).fill(-1);
    let dp = Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        // 看提示，都说了coins不超过 12个，但是金额很大，当然要遍历 coins，而不是金额递减的检查了啊,果然超时了、、、、
        // for (let j = i - 1; j >= 0; j--) {
        //     if (coins.includes(i - j)) {
        //         dp[i] = Math.min(dp[i], dp[j]+1);
        //     }
        // }
        // of 啊，in 是对象的！！
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i-coin]+1);
            }
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
