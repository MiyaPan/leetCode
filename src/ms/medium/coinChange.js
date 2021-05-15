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
// TODO: 三刷！
/**
 * =============================
 * 二刷
*/
// 强行靠 dp 反而影响了自己的思路，本身的递归就是对的
// 用递归才是思路的根源，记得加备忘，再自下而上的反着考虑，就是 dp 了
export const coinChange = (coins, amount) => {
    let dp = Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
    // amount 可能是 0，此时返回 0
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        if (coins.includes(i)) {
            dp[i] = 1;
        } else {
            // dp 遍历只是为了好找 dp[i-coin]，并不必要每次都要算 dp[i-j]
            // 每次遍历 dp[i-j] 就太多了，而且里面是包含了一种结果，这种结果是先扣除 coin，再找到 剩余的 dp 
            for (let coin of coins) {
                if (dp[i-coin]) {
                    dp[i] = Math.min(dp[i], dp[i-coin]+1);
                }
            }
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
// 这个写法，金额大了必然超时啊
// export const coinChange = (coins, amount) => {
//     let dp = Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
//     // amount 可能是 0，此时返回 0
//     dp[0] = 0;
//     for (let i = 1; i <= amount; i++) {
//         if (coins.includes(i)) {
//             dp[i] = 1;
//         } else {
//             for (let j = 1; j < i; j++) {
//                 if (dp[i-j]) {
//                     dp[i] = Math.min(dp[i], dp[i-j]+dp[j]);
//                 }
//             }
//         }
//     }
//     return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
// }





/**
 * =============================
 * 一刷
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
