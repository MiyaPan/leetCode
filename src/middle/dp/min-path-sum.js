/**
 * 64. 最小路径和
 * https://leetcode-cn.com/problems/minimum-path-sum/
*/
// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。
export const minPathSum = (grid) => {
    let n = grid.length;
    let m = grid[0].length;

    let dp = Array(n).fill(null).map(() => Array(m).fill(0));

    dp[0][0] = grid[0][0];

    // 3 个 for 循环可以合并，就是 在最后的里面 if else 判断 i 和 j 呗
    for (let i = 1; i < n; i++) {
        dp[i][0] = grid[i][0] + dp[i-1][0]; 
    }
    for (let j = 1; j < m; j++) {
        dp[0][j] = grid[0][j] + dp[0][j-1];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }

    return dp[n-1][m-1];
}

// 合并 for 循环
export const minPathSum1 = (grid) => {
    let n = grid.length;
    let m = grid[0].length;

    let dp = Array(n).fill(null).map(() => Array(m).fill(0));

    // 3 个 for 循环可以合并，就是 在最后的里面 if else 判断 i 和 j 呗

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i===0 && j===0) {
                dp[i][j] = grid[0][0];
            } else if (j === 0) {
                dp[i][0] = grid[i][0] + dp[i-1][0]; 
            } else if (i === 0) {
                dp[0][j] = grid[0][j] + dp[0][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }
    }

    return dp[n-1][m-1];
}

// 优化空间，只需要记忆前一列的值
export const minPathSum2 = (grid) => {
    let n = grid.length;
    let m = grid[0].length;

    let curColumn = [];
    let preColumn = [grid[0][0]];
    for (let i = 1; i < n; i++) {
        preColumn[i] = preColumn[i-1] + grid[i][0];
    }

    for (let j = 1; j < m; j++) {
        for (let i = 0; i < n; i++) {
            if (i === 0) {
                curColumn[i] = grid[0][j] + preColumn[0];
            } else {
                curColumn[i] = Math.min(preColumn[i], curColumn[i-1]) + grid[i][j];
            }
        }
        preColumn = [...curColumn];
    }

    return preColumn[n-1];
}
