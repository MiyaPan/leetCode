/**
 * 70. 爬楼梯
 * 
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 * 
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 * 示例 2：
 * 
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
*/
/**
 * =============================
 * 二刷
*/
export const climbStairs = (n) => {
    let dp = Array(n).fill(0);
    dp[0] = 1;
    dp[1] = 2;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n-1];
}

/**
 * =============================
 * 一刷
*/
// 超时了
export const climbStairs = (n) => {
    if (n === 1) return 1;
    if (n === 2) return 2;
    return climbStairs(n-1) + climbStairs(n-2);
}
// 递归超时，所以就改成带备忘录的呗，就动态规划呗
export const climbStairs1 = (n) => {
    let dp = [0, 1, 2];

    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
}
// 观察到只用到了动态规划数组的前两个，所以可以压缩状态
export const climbStairs1 = (n) => {
    if (n < 3) return n;
    let pre = 2;
    let prepre = 1;

    for(let i = 3; i <= n; i++) {
        let temp = pre;
        pre = pre + prepre;
        prepre = temp;
    }

    return pre;
}
