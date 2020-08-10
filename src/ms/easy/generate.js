/**
 * 118. 杨辉三角
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
    在杨辉三角中，每个数是它左上方和右上方的数的和。

    示例:

    输入: 5
    输出:
    [
        [1],
       [1,1],
      [1,2,1],
     [1,3,3,1],
    [1,4,6,4,1]
    ]

    链接：https://leetcode-cn.com/problems/pascals-triangle
*/
// 思路：反是这种 前一个 + 后一个 的，都可以用自身错位相加~~~好思路
var generate = function(numRows) {
    if (numRows === 0) return [];
    let result = [[1]];
    if (numRows === 1) return result;

    for (let i = 1; i < numRows; i++) {
        let base = result[i-1];
        let cur = [1];
        for(let j = 1; j < i; j++) {
            cur[j] = base[j] + base[j-1];
        }
        cur.push(1);

        result.push(cur);
    }

    return result;
};
