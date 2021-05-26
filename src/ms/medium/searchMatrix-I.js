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
/**
 * =============================
 * 二刷
*/
// 可以看成一维数组啊，[2,1] 和 [1,2] 是不同的鸭!不是 i+j 啊，是 i*n + j，是唯一的啊
export const searchMatrix = function(matrix, target) {
    let n = matrix.length;
    let m = matrix[0].length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (matrix[m][0] === target) return true;
        if (matrix[m][0] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    if (r < 0) return false;

    let row = r;
    l = 0;
    r = m-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (matrix[row][m] === target) return true;
        if (matrix[row][m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return false;
}

export const searchMatrix = function(matrix, target) {
    let n = matrix.length;
    let m = matrix[0].length;
    let l = 0;
    let r = n*m - 1;
    while (l <= r) {
        let mid = l + parseInt((r-l)/2);
        let i = parseInt(mid/m);
        let j = mid%m;
        if (matrix[i][j] === target) return true;
        if (matrix[i][j] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return false;
}

















/**
 * =============================
 * 一刷
*/
export const searchMatrix = function(matrix, target) {
    let n = matrix.length;
    if (n === 0) return false;
    let m = matrix[0].length;
    if (m === 0) return false;

    let i = n - 1;
    let j = 0;
    while(i >= 0 && j < m) {
        if (matrix[i][j] === target) return true;
        // 要先判断这种，要是先 i-- 会导致 i 成了 -1，再进下一个由于要先取行再去列，取 i 的时候 if 就不对了
        // 但是先 j++ 就不会有问题，因为 i 行能取到，j 不存在也不会报错
        if (matrix[i][j] < target) {
            j++;
        }
        if (matrix[i][j] > target) {
            i--;
        }
        // if (matrix[i][j] < target) {
        //     j++;
        // }
    }
    return false;
};
