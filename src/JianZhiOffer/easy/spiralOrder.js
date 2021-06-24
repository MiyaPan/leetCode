/**
 * 剑指 Offer 29. 顺时针打印矩阵
 * https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
*/
var spiralOrder = function(matrix) {
    let n = matrix.length;
    if (n === 0) return [];
    let m = matrix[0].length;
    let top = 0;
    let bottom = n-1;
    let left = 0;
    let right = m-1;
    let ans = [];
    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) ans.push(matrix[top][j]);
        top++;
        for (let i = top; i <= bottom; i++) ans.push(matrix[i][right]);
        right--;
        for (let j = right; top <= bottom && j >= left; j--) ans.push(matrix[bottom][j]);
        bottom--;
        for (let i = bottom; left <= right && i >= top; i--) ans.push(matrix[i][left]);
        left++;
    }
    return ans;
};
