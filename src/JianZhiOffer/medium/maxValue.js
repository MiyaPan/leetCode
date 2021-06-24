/**
 * 剑指 Offer 47. 礼物的最大价值
 * https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/
*/
// TODO: 三刷
var maxValue = function(grid) {
    let n = grid.length;
    let m = grid[0].length;
    // let max = 0;
    let max = grid[0][0];
    // 先更更新上边和左边
    for (let j = 1; j < m; j++) {
        grid[0][j] += grid[0][j-1];
        if (j === m-1) max = Math.max(max, grid[0][j]);
    }
    for (let i = 1; i < n; i++) {
        grid[i][0] += grid[i-1][0];
        if (i === n-1) max = Math.max(max, grid[i][0]);
    }
    // 更新里面
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            grid[i][j] += Math.max(grid[i][j-1], grid[i-1][j]);
            if (i === n-1 || j === m-1) max = Math.max(max, grid[i][j]);
        }
    }
    return max;
}
// dfs 超时，想办法 dp，可以 滚动刷新 棋盘
var maxValue = function(grid) {
    let n = grid.length;
    let m = grid[0].length;
    let max = 0;
    const dfs = (r, c, sum) => {
        if (r >= n || c >= m) {
            max = Math.max(max, sum);
            return;
        }

        let directions = [[0, 1], [1, 0]];
        for (let direction of directions) {
            let newR = r + direction[0];
            let newC = c + direction[1];
            dfs(newR, newC, sum+grid[r][c]);
        }

    };

    dfs(0, 0, 0);

    return max;
};
