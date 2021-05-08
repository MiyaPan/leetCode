/**
 * 304. 二维区域和检索 - 矩阵不可变
 * https://leetcode-cn.com/problems/range-sum-query-2d-immutable/
*/
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }
    
    let n = matrix.length;
    let m = matrix[0].length;
    let dp = Array(n+1).fill(null).map(_ => Array(m+1).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i === 0 && j === 0) {
                dp[i+1][j+1] = matrix[i][j];
            } else if (i === 0) {
                dp[i+1][j+1] = matrix[i][j] + dp[i+1][j];
            } else if (j === 0) {
                // dp[i+1][j+1] = matrix[i][j] + dp[i-1, j];
                dp[i+1][j+1] = matrix[i][j] + dp[i][j+1];
            } else {
                dp[i+1][j+1] = matrix[i][j] + dp[i+1][j] + dp[i][j+1] - dp[i][j];
            }
        }
    }

    this.dp = dp;
    this.matrix = matrix;
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
// 加一行缓存好处理，不然取值还要处理边界
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    if (!this.matrix || this.matrix.length === 0 || this.matrix[0].length === 0) {
        return 0;
    }
    return this.dp[row2+1][col2+1] - this.dp[row2+1][col1] - this.dp[row1][col2+1] + this.dp[row1][col1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */