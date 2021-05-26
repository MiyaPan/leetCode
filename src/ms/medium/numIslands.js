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
// TODO: 三刷!
/**
 * 
 * =============================
 * 二刷
*/
// 当然并查集
var numIslands = function(grid) {
    let n = grid.length;
    let m = grid[0].length;
    let uf = new UnionFind(grid);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                if (i+1 < n && grid[i+1][j] === '1') uf.union([i, j], [i+1, j]);
                if (j+1 < m && grid[i][j+1] === '1') uf.union([i, j], [i, j+1]);
                if (i-1 >= 0 && grid[i-1][j] === '1') uf.union([i, j], [i-1, j]);
                if (j-1 >= 0 && grid[i][j-1] === '1') uf.union([i, j], [i, j-1]);
            }
        }
    }
    return uf.components;
}
class UnionFind {
    constructor(grid) {
        let n = grid.length;
        let m = grid[0].length;
        this.parents = Array(n).fill(null).map(_ => Array(m).fill(null));
        let count = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === '1') {
                    this.parents[i][j] = [i, j];
                    count++;
                }
            }
        }
        this.components = count;
    }
    findParent(x) {
        let [i, j] = x;
        let [pi ,pj] = this.parents[i][j];
        if (i !== pi || j !== pj) {
            // 这里是去接着找父亲的父亲哦！！！
            // this.parents[i][j] = this.findParent(x);
            this.parents[i][j] = this.findParent([pi ,pj]);
        }
        return this.parents[i][j];
    }
    union(x, y) {
        let [pxi, pxj] = this.findParent(x);
        let [pyi, pyj] = this.findParent(y);
        if (pxi !== pyi || pxj !== pyj) {
            this.parents[pyi][pyj] = [pxi, pxj];
            this.components--;
        }
    }
}


var numIslands = function(grid) {
    let count = 0;
    let n = grid.length;
    let m = grid[0].length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                count++;
                mark0(grid, i, j)
            }
        }
    }
    return count;
}
function mark0(grid, i, j) {
    let n = grid.length;
    let m = grid[0].length;
    
    grid[i][j] = '0';
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let direction of directions) {
        let newi = i + direction[0];
        let newj = j + direction[1];
        
        if (newi < 0 || newi >= n || newj < 0 || newj >= m) {
            continue;
        }
        if (grid[newi][newj] === '1') {
            mark0(grid, newi, newj);
        }
    }
}














/**
 * =============================
 * 一刷
*/
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
