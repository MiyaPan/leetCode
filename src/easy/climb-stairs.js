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
// 60.12%
export const climbStairs = (n) => {
    // if (n <= 2) {
        //     return n;
        // }
        
    // 这是斐波那契数算法，但是用递归超时了，这不是动态规划，虽然状态转移方程有了，但是没"记忆"
    // return climbStairs(n-1) + climbStairs(n-2);

    // dp 中是以n作为下标志记录的，所以是从 1 开始的，0 的地方要补 0
    let dp = [0,1,2];
    for (let i =3; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// 斐波那契数算法 - for 循环版，不要递归，打败 60.12%
// 和动态规划的区别就是不记忆，只保留 2 个数
export const climbStairs1 = (n) => {
    if (n <= 2) {
        return n;
    }

    let first = 1;
    let second = 2;
    let temp = 0;
    for (let i = 3; i<=n; i++) {
        temp = first + second;
        first = second;
        second = temp;
    }

    return second;
}
