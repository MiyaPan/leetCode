/**
 * 48. 旋转图像
 * 给定一个 n × n 的二维矩阵表示一个图像。将图像顺时针旋转 90 度。
    说明：
    你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

    示例 1:
    给定 matrix = 
    [
    [1,2,3],
    [4,5,6],
    [7,8,9]
    ],

    原地旋转输入矩阵，使其变为:
    [
    [7,4,1],
    [8,5,2],
    [9,6,3]
    ]
    
    示例 2:
    给定 matrix =
    [
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
    ], 

    原地旋转输入矩阵，使其变为:
    [
    [15,13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7,10,11]
    ]

    链接：https://leetcode-cn.com/problems/rotate-image
*/
/**
 * =============================
 * 二刷
*/
export var rotate = function(matrix) {
    let n = matrix.length;
    let m = matrix[0].length;
    let l = 0;
    let r = m-1;
    let top = 0;
    let bottom = n-1;
    while (l < r) {
        let temp = [...matrix[l]];
        // 左边往上边挪
        for (let i = bottom, j = l; i > top; i--, j++) matrix[top][j] = matrix[i][l];
        // 底边往左边挪
        for (let j = l+1, i = top+1; j <= r; i++, j++) matrix[i][l] = matrix[bottom][j];
        // 右边往底边挪
        for (let i = bottom-1, j = l+1; i >= top; i--, j++) matrix[bottom][j] = matrix[i][r];
        // 上边往右边挪
        for (let j = l, i = top; j < r; j++, i++) matrix[i][r] = temp[j];

        l++;
        r--;
        top++;
        bottom--;
    }
    // return matrix;
}








































/**
 * =============================
 * 一刷
*/
// 思路：每个元素挪，会发现规律，转着圈的挪的。和答案的解法 1 是一样的
var rotate11 = function(matrix) {
    let end = matrix.length - 1;
    let start = 0;
    let rotateNum = parseInt(end/2);
    while(rotateNum >= 0) {
        let s = start;
        let e = end;
        for (let i = start, n = end; i < end; i++,n--) {
            let temp = matrix[n][s];
            matrix[n][s] = matrix[e][n];
            matrix[e][n] = matrix[i][e];
            matrix[i][e] = matrix[s][i];
            matrix[s][i] = temp;
        }
        start++;
        end--;
        rotateNum--;
    }
};

// 解法2：先上下对折(镜像)，再沿着对角线翻转。很厉害了，，
// 图解见：https://leetcode-cn.com/problems/rotate-image/solution/man-hua-xuan-zhuan-tu-xiang-by-ivan1/
// 上下翻转这步：就相当于把解法 1 中每圈 的四个角弄好了
// 再沿着左上-右下对角线，一翻，就等于把剩余的翻了，靠想象啊
var rotate2 = function(matrix) {
    let len = matrix.length;
    
    // 上线对折
    for (let j= 0; j < len; j++) {
        for(let i = 0; i < parseInt(len/2); i++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[len-i-1][j];
            matrix[len-i-1][j] = temp;
        }
    }

    // 沿着左上-右下对角线翻转
    for(let i = 0; i < len; i++) {
        // 注意这里因为是交换，所以只遍历右上三角即可
        for (let j = i + 1; j < len; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
};
