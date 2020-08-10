/**
 * 120. 三角形最小路径和
 * https://leetcode-cn.com/problems/triangle/
*/
// 例如，给定三角形：

// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

export const minimumTotal = (triangle) => {
    if (triangle.length === 0) return 0;
    if (triangle.length === 1) return triangle[0][0];

    let pre = triangle[0];
    let dpCurRow = [];
    // 傻子吗，给 min 赋值 0 ，那啥时候能更新！
    // let min = 0;
    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 1; i < triangle.length; i++) {
        let row = triangle[i];
        for (let j = 0; j < row.length; j++) {
            if (j === 0) {
                dpCurRow[j] = triangle[i][0] + pre[0];
            } else if (j === row.length - 1) {
                dpCurRow[j] = triangle[i][j] + pre[pre.length-1];
            } else {
                dpCurRow[j] = triangle[i][j] + Math.min(pre[j], pre[j-1]);
            }

            if (i === triangle.length - 1) {
                min = Math.min(min, dpCurRow[j]);
            }
        }
        pre = [...dpCurRow];
    }
    return min;
}
