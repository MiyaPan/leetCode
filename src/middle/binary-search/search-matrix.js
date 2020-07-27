/**
 * 74. 搜索二维矩阵
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
    每行中的整数从左到右按升序排列。
    每行的第一个整数大于前一行的最后一个整数。
    
    示例 1:
    输入:
    matrix = [
    [1,   3,  5,  7],
    [10, 11, 16, 20],
    [23, 30, 34, 50]
    ]
    target = 3
    输出: true

    示例 2:
    输入:
    matrix = [
    [1,   3,  5,  7],
    [10, 11, 16, 20],
    [23, 30, 34, 50]
    ]
    target = 13
    输出: false

    链接：https://leetcode-cn.com/problems/search-a-2d-matrix
*/
export const searchMatrix = function(matrix, target) {
    let n = matrix.length;
    if (n === 0) return false;
    let m = matrix[0].length;
    if (m === 0) return false;

    let l = 0;
    let r = n * m - 1;

    while(l <= r) {
        let mid = parseInt((l+r)/2);
        let i = parseInt(mid / m);
        let j = mid % m;
        if (matrix[i][j] === target) {
            return true;
        } else if (matrix[i][j] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return false;
};
