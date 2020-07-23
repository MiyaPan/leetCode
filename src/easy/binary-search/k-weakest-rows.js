/**
 * 1337. 方阵中战斗力最弱的 K 行
 * 给你一个大小为 m * n 的方阵 mat，方阵由若干军人和平民组成，分别用 1 和 0 表示。
    请你返回方阵中战斗力最弱的 k 行的索引，按从最弱到最强排序。
    如果第 i 行的军人数量少于第 j 行，或者两行军人数量相同但 i 小于 j，那么我们认为第 i 行的战斗力比第 j 行弱。
    军人 总是 排在一行中的靠前位置，也就是说 1 总是出现在 0 之前。

    示例 1：
    输入：mat = 
    [[1,1,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,1,0,0,0],
    [1,1,1,1,1]], 
    k = 3
    输出：[2,0,3]
    解释：
    每行中的军人数目：
    行 0 -> 2 
    行 1 -> 4 
    行 2 -> 1 
    行 3 -> 2 
    行 4 -> 5 
    从最弱到最强对这些行排序后得到 [2,0,3,1,4]

    示例 2：
    输入：mat = 
    [[1,0,0,0],
     [1,1,1,1],
     [1,0,0,0],
     [1,0,0,0]], 
    k = 2
    输出：[0,2]
    解释： 
    每行中的军人数目：
    行 0 -> 1 
    行 1 -> 4 
    行 2 -> 1 
    行 3 -> 1 
    从最弱到最强对这些行排序后得到 [0,2,3,1]

    提示：
    m == mat.length
    n == mat[i].length
    2 <= n, m <= 100
    1 <= k <= m
    matrix[i][j] 不是 0 就是 1

    链接：https://leetcode-cn.com/problems/the-k-weakest-rows-in-a-matrix
*/
// 是我蠢了，虽然 过了。每行加和，然后排序啊！！！
export const kWeakestRows = (mat, k) => {
    let m = mat.length;
    let n = mat[0].length;
    let result = [];
    let visited = [];

    for (let j = 0; j < n && k > 0; j++) {
        for (let i = 0; i < m && k > 0; i++) {
            if (!visited.includes(i) && mat[i][j] === 0) {
                result.push(i);
                visited.push(i);
                k--;
            }
        }
    }

    for (let i = 0; i < m && k > 0; i++) {
        if (!visited.includes(i)) {
            result.push(i);
            visited.push(i);
            k--;
        }
    }

    return result;
}

// 强行用二分了也是
export const kWeakestRows1 = (mat, k) => {
    let m = mat.length;
    let n = mat[0].length;
    let sum = [];

    for (let i = 0; i < m; i++) {
        let l = 0;
        let r = n-1;
        let row = mat[i];
        while(l <= r) {
            let m = parseInt((l+r)/2);
            if (row[m] === 1) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        // sum[i] = r;
        // 连同坐标一起放进去
        sum.push([i, r]);
    }

    sum.sort((a,b) => a[1]-b[1]);

    return sum.slice(0, k).map(item => item[0]);
}
