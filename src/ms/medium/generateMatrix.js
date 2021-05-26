/**
 * 59. 螺旋矩阵 II
 * 给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

    示例 1：
    输入：n = 3
    输出：[[1,2,3],[8,9,4],[7,6,5]]
    
    示例 2：
    输入：n = 1
    输出：[[1]]
    
    提示：
    1 <= n <= 20

    链接：https://leetcode-cn.com/problems/spiral-matrix-ii
*/
/**
 * @param {number} n
 * @return {number[][]}
 */
/**
 * =============================
 * 二刷
*/
export var generateMatrix = function(n) {
    let ans = Array(n).fill(null).map(_ => Array(n).fill(0));
    let row = 0;
    let col = 0;
    let right = n - 1;
    let left = 0;
    let top = 0;
    let bottom = n - 1;
    let i = 1;
    while (i <= n*n) {
        for (col = left; col <= right; col++) {
            ans[row][col] = i++;
        }
        // for 中 col 越界了，调整
        col--;
        top++;
        for (row = top; row <= bottom; row++) {
            ans[row][col] = i++;
        }
        // for 中越界了，调整
        row--;
        right--;
        for (col = right; col >= left; col--) {
            ans[row][col] = i++;
        }
        // for 中越界了，调整
        col++;
        bottom--;
        for (row = bottom; row >= top; row--) {
            ans[row][col] = i++;
        }
        // for 中越界了，调整
        row++;
        left++;
    }
    return ans;
}






/**
 * =============================
 * 一刷
*/
export var generateMatrix1 = function(n) {
    let maxtrix = Array(n).fill(null).map(_ => Array(n).fill(0));
    let num = 1;
    let i = 0;
    let j = 0;
    let iStart = 0;
    let iEnd = n-1;
    let jStart = 0;
    let jEnd = n-1;
    while(num <= n*n) {
        // ---->
        i = iStart;
        for (j = jStart; j <= jEnd; j++) {
            maxtrix[i][j] = num;
            num++;
        }
        iStart++;
        // |
        // v
        j = jEnd;
        for (i = iStart; i <= iEnd; i++) {
            maxtrix[i][j] = num;
            num++;
        }
        jEnd--;
        // <----
        i = iEnd;
        for (j = jEnd; j >= jStart; j--) {
            maxtrix[i][j] = num;
            num++;
        }
        iEnd--;
        // ^
        // |
        j = jStart;
        for (i = iEnd; i >= iStart; i--) {
            maxtrix[i][j] = num;
            num++;
        }
        jStart++;
    }
    return maxtrix;
};
