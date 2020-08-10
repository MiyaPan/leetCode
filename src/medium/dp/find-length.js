/**
 * 718. 最长重复子数组
 * 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

    示例：
    输入：
    A: [1,2,3,2,1]
    B: [3,2,1,4,7]
    输出：3
    解释：
    长度最长的公共子数组是 [3, 2, 1] 。
     
    提示：
    1 <= len(A), len(B) <= 1000
    0 <= A[i], B[i] < 100

    链接：https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray
*/
// 最长公共子序列 LCS：
// 当 a[i] === b[j]: dp[i][j] = dp[i-1][j-1] + 1 
// 当 a[i] !== b[j]: dp[i][j] = max(dp[i][j-1], dp[i-1][j]) 
// 最长公共子数组【要求连续】：
// 当 a[i] === b[j]: dp[i][j] = dp[i-1][j-1] + 1 
// 当 a[i] !== b[j]: dp[i][j] = 0，用 max 记录下最长 
export const findLength = (A, B) => {
    let n = A.length;
    let m = B.length;
    let max = 0;

    let dp = Array(n+1).fill(null).map(_ => Array(m+1).fill(0));
    // A: [1,2,3,2,1]
    // B: [3,2,1,4,7]
    // [0,1,1,1,1],
    // [1,0,1,0,1]
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (A[i-1] === B[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                // 前一项交叉对比，求得的是最长公共子序列，但是这里要的是子数组，必须连续的，所以只要结尾不一样就是 0 了
                // 序列是能跳的，子数组必须连续
                // else 保存的是当前元素之前的最长子数组统计和，但是会导致下一个 if 出错，如果下个 if 离这很远，
                // 但是下个 if 里 A[i-1] === B[j-1]了，会导致 if 的个数被加 1 ，统计成了最长子序列
                // 这里我们想要的只是以元素为结尾的最长数组，如果它前面出现了，那我们已经记录在那个子数组结尾的元素的 dp 上了
                // 用 max 统计即可，不可向后传递长度
                // dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                dp[i][j] = 0;
            }
            max = Math.max(dp[i][j], max);
        }
    }

    // return dp[n][m];
    return max;
}
