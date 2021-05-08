/**
 * 746. 使用最小花费爬楼梯
 * https://leetcode-cn.com/problems/min-cost-climbing-stairs/
 * 数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。
    每当你爬上一个阶梯你都要花费对应的体力值，一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。
    请你找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。

    示例 1：
    输入：cost = [10, 15, 20]
    输出：15
    解释：最低花费是从 cost[1] 开始，然后走两步即可到阶梯顶，一共花费 15 。
     
    示例 2：
    输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    输出：6
    解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。

    提示：
    cost 的长度范围是 [2, 1000]。
    cost[i] 将会是一个整型数据，范围为 [0, 999] 。

    链接：https://leetcode-cn.com/problems/min-cost-climbing-stairs
*/
/**
 * =============================
 * 二刷
*/
export const minCostClimbingStairs = (cost) => {
    // cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    let n = cost.length;
    let dp = Array(n+1).fill(0);
    dp[0] = cost[0];
    dp[1] = cost[1];
    for (let i = 2; i < n+1; i ++) {
        dp[i] = Math.min(dp[i-1], dp[i-2]) + (cost[i] || 0);
    }
    return dp[n];
}

/**
 * =============================
 * 一刷
*/
// 讲解超好https://leetcode-cn.com/problems/min-cost-climbing-stairs/solution/yi-bu-yi-bu-tui-dao-dong-tai-gui-hua-de-duo-chong-/
// 和 rob 是有区别的，不同在题意中，在转换的过程中
// cost数组是从每个阶梯继续向上走所需的体力，而登顶是走到数组外，最后一个元素也要算体力值，
// 走一下 1，100 那个例子总结一下就知道了，自己标一下
export const minCostClimbingStairs = (cost) => {
    if (!cost.length) return 0;
    if (cost.length === 1) return cost[0];
    if (cost.length === 2) return cost[1];

    let dp = [cost[0], cost[1]];

    // 不能计算到 length -1，等再计算一个，因为顶台阶是出去数组的
    for (let i =2;i <= cost.length;i++) {
        dp[i] = (cost[i] || 0)  + Math.min(dp[i-2], dp[i-1]);
    }

    return dp[cost.length];
}
