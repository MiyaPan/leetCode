/**
 * 54. 螺旋矩阵
 * https://leetcode-cn.com/problems/spiral-matrix/
*/
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/**
 * =============================
 * 二刷
*/
export var spiralOrder = function(matrix) {
    let n = matrix.length;
    let m = matrix[0].length;
    let top = 0;
    let bottom = n-1;
    let left = 0;
    let right = m-1;
    let ans = [];
    while (left <= right && top <= bottom) {
        for (let j = left; j <= right && top <= bottom; j++) ans.push(matrix[top][j]);
        top++;
        for (let i = top; i <= bottom && left <= right; i++) ans.push(matrix[i][right]);
        right--;
        for (let j = right; j >= left && top <= bottom; j--) ans.push(matrix[bottom][j]);
        bottom--;
        for (let i = bottom; i >= top && left <= right; i--) ans.push(matrix[i][left]);
        left++;
        // 最后统一操作，比如只剩一行的时候，第一个 for 走完就应该更新以阻止进入别的 for，这样就是 for 循环的条件要改下❌
        // 也可以最后统一操作，上面这句话的问题，是出现在 for 的控制条件上了，答案也免不了要判断控制条件的
        // top++;
        // bottom--;
        // left++;
        // right--;
    }
    return ans;
}













/**
 * =============================
 * 二刷
*/
export var spiralOrder = function(matrix) {
    if (matrix.length === 0) return [];

    let count = 0;
    let iStart = 0;
    let iEnd = matrix.length - 1;
    let jStart = 0;
    let jEnd = matrix[0].length - 1;
    let param = {matrix, count, iStart, iEnd, jStart, jEnd};
    let ans = [];

    while(param.iStart <= param.iEnd && param.jStart <= param.jEnd) {
        param = helper(param);
        ans = ans.concat(param.result);
    }

    return ans;
};

function helper(params) {
    let {matrix, count, iStart, iEnd, jStart, jEnd} = params;
    let result = [];
    switch (count % 4) {
        case 0:
            for (let j = jStart; j <= jEnd; j++) result.push(matrix[iStart][j]);
            iStart++;
            break;
        case 1:
            for (let i = iStart; i <= iEnd; i++) {
                result.push(matrix[i][jEnd]);
            }
            jEnd--;
            break;
        case 2:
            for (let j = jEnd; j >= jStart; j--) result.push(matrix[iEnd][j]);
            iEnd--;
            break;
        case 3:
            for (let i = iEnd; i >= iStart; i--) result.push(matrix[i][jStart]);
            jStart++;
            break;
    }

    count++;

    return {matrix, count, iStart, iEnd, jStart, jEnd, result};
}
