/**
 * 279. 完全平方数
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。
 * 你需要让组成和的完全平方数的个数最少。
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
/**
 * =============================
 * 二刷
*/
// 套背包模板
/**
 * 1. 存在选择
 * 2. 组合成 n
 * 3. 最小，则是最值问题 dp[j] = Math.min(dp[j], dp[j-num]+1)
 * 4. 可以重复选择所以不是 01 背包，是完全背包，所以内层循环需要正序，先更新 dp[j-num]
*/
// 套模板就是爽，贼快！你要做的只是鉴定边界就行，剩下就是调试 case
export const numSquares = (n) => {
    // 这个没必要了，没说不让用 sqrt，又不是让你写算法算根号
    // let numMax = n/2; // 这个设置也可以，就是 1 这个 case 过不了，得单独判断，因为 1 直接进不了循环
    let numMax = Math.sqrt(n);
    let dp = Array(n+1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    for (let i = 1; i <= numMax; i++) {
        let num = i*i;
        for (let j = num; j <= n; j++) {
            dp[j] = dp[j] = Math.min(dp[j], dp[j-num]+1);
        }
    }
    return dp[n];
}














/**
 * =============================
 * 一刷
*/
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
