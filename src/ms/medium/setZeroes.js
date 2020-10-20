/**
 * 73. 矩阵置零
 * https://leetcode-cn.com/problems/set-matrix-zeroes/
*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 思路1： 最差的情况空间复杂度其实是 O(M+N), 不行，这题不要时间复杂度，要的是空间
var setZeroes = function(matrix) {
    let m = matrix.length;
    if (m <= 0) return;
    let n = matrix[0].length;

    let iStack = new Set();
    let jStack = new Set();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                iStack.add(i);
                jStack.add(j);
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (iStack.has(i) || jStack.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
};

// 思路2： 像 1 的那个，为了空间小，不要两个 set 了，而是把 该行该列是否应该置零保存着矩阵中
// 具体做法就是：先不处理第一行和第一列，将其他行列的状态标记到 第一行列中；最后处理第一行列
// 易混点：第一行或者第一列中，不是[0][0] 的元素：没事啊，相当于自己标记了自己啊，他们对应的行列遍历到的时候会被置零的！
var setZeroes = function(matrix) {
    let m = matrix.length;
    if (m <= 0) return;
    let n = matrix[0].length;

    let isFistRow0 = false;
    let isFistCol0 = false;

    // 记录下第一行的原始情况
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            isFistRow0 = true;
            break;
        }
    }

    // 记录下第一列的原始情况
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            isFistCol0 = true;
            break;
        }
    }

    // 标记到第一行第一列
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    }

    // 根据第一行和第一列，转换其他行列
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[0][j] === 0 || matrix[i][0] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 刷新第一行
    if (isFistRow0) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }

    // 刷新第一列
    if (isFistCol0) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};
