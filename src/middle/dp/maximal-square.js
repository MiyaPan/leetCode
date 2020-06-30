/**
 * 221. 最大正方形
 * https://leetcode-cn.com/problems/maximal-square/
 * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
*/
// 输入: 

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0

// 输出: 4

// 思路不错，但是不要记 true和false 啊，直接记录边长就好了，大于 0 的都可以归为一类
export const maximalSquare = (matrix) => {
    // 没说输入是正方形
    // if (matrix.length === 0 || m !== n) return 0;
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;
    // 下面两句不能放到最上面，因为tmd matrix 可能一行也没有，计算 m 就出错了
    let n = matrix.length;
    let m = matrix[0].length;
    // 因为输入会为这个 [["0","1"]]，输出应该是 1，所以 1 这个不用单独判，在 if 中就能处理
    // if (n === 1 || m === 1) return matrix[0][0];
    
    let dp = Array(n).fill(null).map(() => Array(m).fill(0));
    let max = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 先用 if 更省一点
            if (matrix[i][j] === '1') {
                if (i === 0 || j === 0) {
                    // 处理边框
                    dp[i][j] = 1;
                } else {
                    // 处理中间的
                    // dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1],dp[i-1][j-1]) + matrix[i][j];
                    dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1],dp[i-1][j-1]) + 1;
                }
                // 计算 max 不能只放到中间，边框也要，不过是等于 1 而已，要么就 if 和 else 中都 计算 max ，if 中直接 max=1
                // 这是为了边框处理的时候不出错，因为输入可能只有一行这种，不给 max 赋值，max就一直是 0，遇到边框有 1 也没更新
                max = Math.max(max, dp[i][j]);
            }
        }
    }

    return max * max;
}
