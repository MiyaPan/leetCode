/**
 * 54. 螺旋矩阵
 * https://leetcode-cn.com/problems/spiral-matrix/
*/
/**
 * @param {number[][]} matrix
 * @return {number[]}
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
