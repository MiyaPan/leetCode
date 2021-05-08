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
*/

// 遍历每个数字，就想拆解 平方数的和一样思路
// 11 = 1 + 10
// 11 = 2 + 9
// 11 = 5 + 6
// 然后看 10 9 6 谁的数量少用谁
export const coinChange = (coins, amount) => {
    let dp = [0];

    for (let i = 1; i <= amount; i++) {
        dp[i] = -1;
        for (let coin of coins) {
            if (dp[i-coin] >= 0) {
                dp[i] = !~dp[i] ? Number.MAX_SAFE_INTEGER : dp[i];
                dp[i] = !~dp[i-coin] ? -1 : Math.min(dp[i], dp[i-coin] + 1);
            }
        }
    }

    return dp[amount];
}

// 没啥优化
export const coinChange1 = (coins, amount) => {
    let dp = [0];

    for (let i = 1; i <= amount; i++) {
        dp[i] = -1;
        for (let coin of coins) {
            if (dp[i-coin] >= 0) {
                if (!~dp[i-coin]) continue;
                dp[i] = !~dp[i] ? Number.MAX_SAFE_INTEGER : dp[i];
                dp[i] = Math.min(dp[i], dp[i-coin] + 1);
            }
        }
    }

    return dp[amount];
}
