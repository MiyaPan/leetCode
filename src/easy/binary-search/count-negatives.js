/**
 * 1351. 统计有序矩阵中的负数
 * 给你一个 m * n 的矩阵 grid，矩阵中的元素无论是按行还是按列，都以非递增顺序排列。 
    请你统计并返回 grid 中 负数 的数目。

    示例 1：
    输入：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
    输出：8
    解释：矩阵中共有 8 个负数。

    示例 2：
    输入：grid = [[3,2],[1,0]]
    输出：0

    示例 3：
    输入：grid = [[1,-1],[-1,-1]]
    输出：3

    示例 4：
    输入：grid = [[-1]]
    输出：1


    提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 100
    -100 <= grid[i][j] <= 100

    链接：https://leetcode-cn.com/problems/count-negative-numbers-in-a-sorted-matrix
*/
/**
 * =============================
 * 二刷
*/
export const countNegatives = (grid) => {
    let count = 0;
    let n = grid.length;
    let m = grid[0].length;
    
    for (let i = n -1; i >= 0; i--) {
        if (grid[i][0] < 0) {
            count += m;
            continue;
        }
        let firstNegIdx = getFirstNeg(grid, i);
        if (firstNegIdx >= m) {
            break;
        } else {
            count += m - firstNegIdx;
        }
    }
    return count;
}
function getFirstNeg(grid, i) {
    let l = 0;
    let r = grid[i].length - 1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (grid[i][m] < 0 && grid[i][m-1] > 0) return m;
        if (grid[i][m] >= 0) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return l;
}

/**
 * =============================
 * 一刷
*/
export const countNegatives = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let count = 0;

    for (let i = 0; i < m; i++) {
        let row = grid[i];
        let l = 0;
        let r = n - 1;
        while(l <= r) {
            let m = parseInt((l+r)/2);
            if (row[m] < 0) {
                r = m -1;
            } else {
                l = m + 1;
            }
        }
        count += n - l;
    }

    return count;
}
