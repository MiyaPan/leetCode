/**
 * 200. 岛屿数量
 * https://leetcode-cn.com/problems/number-of-islands/
*/
    // [
    // ['1','1','0','0','0'],
    // ['1','1','0','0','0'],
    // ['0','0','1','0','0'],
    // ['0','0','0','1','1']
    // ]
    // 输出: 3

// 不用 visited 来记录，直接访问过的都置成 0 就行了，注意是字符串
var numIslands = function(grid) {
    if (grid.length === 0) return 0;

    let ans = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '0') {
                continue;
            } else {
                ans++;
                mark(grid, i, j);
            }
        }
    }
   return ans;
};

function mark(grid, i, j) {
    let m = grid.length;
    let n = grid[0].length;
    if (grid[i][j] !== '0') {
        grid[i][j] = '0';
        // if 这个条件是不爆栈的根！！！这题就是细节！
        if (i+1 < m && grid[i+1][j] !== '0') mark(grid, i+1, j);
        if (j+1 < n && grid[i][j+1] !== '0') mark(grid, i, j+1);
        if (i-1 >= 0 && grid[i-1][j] !== '0') mark(grid, i-1, j);
        if (j-1 >= 0 && grid[i][j-1] !== '0') mark(grid, i, j-1);
    }
}
