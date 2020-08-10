/**
 * 62. 不同路径
 * https://leetcode-cn.com/problems/unique-paths/
*/
export const uniquePaths = (m, n) => {
    let dp = Array(n).fill(null).map(() => Array(m).fill(1));

    for (let j = 1; j < m; j++) {
        for (let i = 1; i < n; i++) {
            dp[i][j] = dp[i][j-1] + dp[i-1][j];
        }
    }

    return dp[n-1][m-1];
}

// 因为答案只需要最后一个，所以可以优化空间，不记录所有数值
// 新建数组只保存前一列的，这样就可以推当前列了【行也一样】
export const uniquePaths1 = (m, n) => {
    let curColumn = Array(n).fill(1);
    let preColumn = Array(n).fill(1);

    for (let j = 1; j < m; j++) {
        for (let i = 1; i < n; i++) {
            curColumn[i] = preColumn[i] + curColumn[i-1];
        }
        preColumn = [...curColumn];
    }

    return curColumn[n-1];
}
