/**
 * 279. 完全平方数
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 * https://leetcode-cn.com/problems/perfect-squares/
*/

// 示例 1:
// 输入: n = 12
// 输出: 3 
// 解释: 12 = 4 + 4 + 4.

// 示例 2:
// 输入: n = 13
// 输出: 2
// 解释: 13 = 4 + 9.
export const numSquares = (n) => {
    // 这种不是最少的，比如 12 这种会分成 9+1+1+1 4个，而正确的是 4+4+4 3个
    let dis = n;
    let count = 0;
    while(dis) {
        let num = Math.floor(Math.pow(dis, 1/2));
        dis = dis - num * num;
        count++;
    }
    return count;
}

// 这种不是最少的，比如 12 这种会分成 9+1+1+1 4个，而正确的是 4+4+4 3个
// 但是 12 可以分成
// 12 = 1 + 11
// 12 = 4 + 8
// 12 = 9 + 3
// 就看 11 8 和 3 这 3 个子问题谁的数量少了

// for 循环的时候不能填充平方值，而应该填充最小平方数个数
// 两重 for 循环也可以是动态规划啊！！！凭啥瞧不起两重 for 循环！！！！总比解不出来强，高级的难的动态规划都是 两重 for 循环呢！
export const numSquares1 = (n) => {
    let dp = Array(n+1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = i;
        for (j = 1; j <= Math.pow(i, 1/2); j++) {
            // 这里要跟 dp[i] 比啊，所以要给个初始值，不能是 0 ，最大是多少呢，最大就全分解成 1，就是 i
            dp[i] = Math.min(dp[i-j*j] + 1, dp[i]);
        }
    } 

    return dp[n];
}
