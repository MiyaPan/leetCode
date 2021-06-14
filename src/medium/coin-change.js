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
/**
 * =============================
 * 二刷
*/
// 套模板
// 哇靠，套模板好爽啊，套完再研究 dp 的意义
// 此题 dp 的意义是：[0, i] 的硬币可以组成 1...target 的最小数量。意义还是得从二位数组推出来，一维的不好看 
export var coinChange = function(coins, amount) {
    // coins = [1, 2, 5], amount = 11
    let dp = Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
    // 构成 target = 0 的背包需要选 0 个
    dp[0] = 0;

    for (let num of coins) {
        // 从二维优化后，tar 内层循环无需逆序
        // 因为依赖的是 j-num，j-num 就是需要更新，因为是可重复的，不更新 j-num，就拿不到最新的结果
        for (let j = num; j <= amount; j++) {
            // 选择 j 就是上一轮的 1 + dp[j-num], 不选择就维持上一轮的 dp[j]
            dp[j] = Math.min(1 + dp[j-num], dp[j]);
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};
// 思路:看到选取元素组成 target 的就要敏感，是背包问题！0-1 背包是不可重复，完全背包是可以重复
// 从循环角度，能不能重复，就决定当前这状态是从 i-1 行获取还是从本行 i 也可以取
export var coinChange = function(coins, amount) {
    // coins = [1, 2, 5], amount = 11
    let n = coins.length;
    let dp = Array(n).fill(null).map(_ => Array(amount+1).fill(Number.MAX_SAFE_INTEGER));
    for (let i = 0; i < n; i++) {
        dp[i][0] = 0;
    }
    for (let j = 0; j <= amount; j++) {
        if (coins[0] > j) continue;
        else if (coins[0] === j) dp[0][j] = 1;
        // 选当前或者不选，对于第一行，不选当前元素就没得选了，就
        else if (coins[0] < j) dp[0][j] = Math.min(1 + dp[0][j-coins[0]], Number.MAX_SAFE_INTEGER);
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (coins[i] > j) dp[i][j] = dp[i-1][j];
            if (coins[i] === j) dp[i][j] = 1;
            // 选当前或者不选，对于第一行，不选当前元素就没得选了，就
            if (coins[i] < j) dp[i][j] = Math.min(1 + Math.min(dp[i][j-coins[i]], dp[i-1][j-coins[i]]), dp[i-1][j]);
        }
    }
    return dp[n-1][amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[n-1][amount];
};
// 优化空间
export var coinChange = function(coins, amount) {
    // coins = [1, 2, 5], amount = 11
    let n = coins.length;
    let dp = Array(n).fill(null).map(_ => Array(amount+1).fill(Number.MAX_SAFE_INTEGER));
    for (let i = 0; i < n; i++) {
        dp[i][0] = 0;
    }
    for (let j = 0; j <= amount; j++) {
        if (coins[0] > j) continue;
        else if (coins[0] === j) dp[0][j] = 1;
        // 选当前或者不选，对于第一行，不选当前元素就没得选了，就
        else if (coins[0] < j) dp[0][j] = Math.min(1 + dp[0][j-coins[0]], Number.MAX_SAFE_INTEGER);
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (coins[i] > j) dp[i][j] = dp[i-1][j];
            if (coins[i] === j) dp[i][j] = 1;
            // 选当前或者不选，对于第一行，不选当前元素就没得选了，就
            if (coins[i] < j) dp[i][j] = Math.min(1 + Math.min(dp[i][j-coins[i]], dp[i-1][j-coins[i]]), dp[i-1][j]);
        }
    }
    return dp[n-1][amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[n-1][amount];
};























/**
 * =============================
 * 一刷
*/

// 遍历每个数字，就想拆解 平方数的和一样思路
// 11 = 1 + 10
// 11 = 2 + 9
// 11 = 5 + 6
// 然后看 10 9 6 谁的数量少用谁
export const coinChange1 = (coins, amount) => {
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
export const coinChange11 = (coins, amount) => {
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
