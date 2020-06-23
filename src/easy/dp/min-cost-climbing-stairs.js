/**
 * 746. 使用最小花费爬楼梯
 * https://leetcode-cn.com/problems/min-cost-climbing-stairs/
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
