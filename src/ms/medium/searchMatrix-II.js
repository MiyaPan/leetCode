/**
 * 240. 搜索二维矩阵 II
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
    每行的元素从左到右升序排列。
    每列的元素从上到下升序排列。
    示例:

    现有矩阵 matrix 如下：

    [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
    ]
    给定 target = 5，返回 true。

    给定 target = 20，返回 false。

    链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii
*/
/**
 * =============================
 * 二刷
*/
var searchMatrix = function(matrix, target) {
    let n = matrix.length;
    let m = matrix[0].length;
    let i = n-1;
    let j = 0;
    while (i >= 0 && j < m) {
        if (target === matrix[i][j]) return true;
        if (target < matrix[i][j]) {
            i--;
        } else {
            j++;
        }
    }
    return false;
}















/**
 * =============================
 * 一刷
*/
// https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/sou-suo-er-wei-ju-zhen-ii-by-leetcode-2/
var searchMatrix = function(matrix, target) {
    if (matrix.length === 0) return false;

    let i = matrix.length - 1;
    let j = 0;

    while(i >= 0 && j < matrix[0].length) {
        if (matrix[i][j] === target) return true;
        if (target > matrix[i][j]) j++;
        if (target < matrix[i][j]) i--;
    }
    return false;
};
