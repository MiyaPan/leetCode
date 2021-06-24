/**
 * 576. 出界的路径数
 * https://leetcode-cn.com/problems/out-of-boundary-paths/
*/
// TODO: 三刷，
/**
 * =============================
 * 二刷
*/
export const findPaths = (m, n, N, i, j) => {
    let note = new Map();
    let directions = [[-1,0], [0, 1], [1,0], [0,-1]];
    
    const dfs = (N, i, j) => {
        // N === 0 的时候得进去，不然下面的越界加不到?
        // if (N <= 0) return 0;
        if (N < 0) return 0;
        if (i == 0 || i == m-1 || j == 0 || j== n-1) return 1
        // if (i < 0 || i >= m || j < 0 || j >= n) return 1;

        let key =`${i}-${j}-${N}`;
        if (note.has(key)) {
            return note.get(key);
        }

        let res = 0;
        for (let direction of directions) {
            let r = i + direction[0];
            let c = j + direction[1];
            // res += dfs(N-1, r, c) % 1000000007;
            res = (res + dfs(N-1, r, c)) % 1000000007;
        }
        note.set(key, res);
        return res;
    }

    return dfs(N, i, j);
}












/**
 * =============================
 * 1 刷
*/
// dp[i][j][k]:表示从(i,j)出发第k步出界的路径总数，等价于从外界出发第k步走到(i,j)的路径总数
// 用 dp[i][j][k] 覆盖整个矩阵 表示第 k 步，到达 [i,j] 的路径数，由于 第 k 次的矩阵只依赖 k-1 次矩阵的结果，所以去掉 k，改为保存临时变量，以节省空间
// 思路：如果 k-1 步能到达 [i,j]，那么第 k 步可以到达 [i,j] 的4个临边
// 反过来说：我们想知道第 k 步的路径数，只需遍历 k-1 次小球所有可以到达的格子，每个格子都再走一步
// 走一步的过程中校验是否到达边界即可
// 边界条件：小球当前的 x < 0 || y < 0 || x >= m || y >= n 【小球坐标是 0 开始的，最后到达 m 或者 n 就已经出边界了】
export const findPaths = (m, n, N, i, j) => {
    if(m==0||n==0||N==0) return 0;
    let mod = Math.pow(10,9) +7;

    // 任意节点 (x,y) 走 0 步，都不会出界，也就是都 为 0 条
    // 为什么tmd 要都遍历，因为小球 (i,j) 出不出去，依赖它的上下左右的出去路径数，要是 小球在 0，0 开始走，那不用这样全遍历
    let dp = Array(m).fill(null).map(_ => Array(n).fill(0));

    for (let k = 1; k <= N; k++) {
        let cur = Array(m).fill(null).map(_ => Array(n).fill(0));
        for (let x = 0; x < m; x++) {
            for (let y = 0; y < n; y++) {
                // 不能合并，是每个边累加的
                // 当前这步，x 是 0，再移动就出去了，所以这里是 0 就要加了
                if (x -1 < 0) {
                    cur[x][y] += 1;
                }
                if (y -1 < 0) {
                    cur[x][y] += 1;
                }
                if (x >= m -1) {
                    cur[x][y] += 1;
                }
                if (y >= n -1) {
                    cur[x][y] += 1;
                }

                if (x-1 >= 0) {
                    // cur[x][y] += dp[x-1][y];
                    cur[x][y] = (cur[x][y] + dp[x-1][y]) % mod;
                }
                if (y-1 >= 0) {
                    // cur[x][y] += dp[x][y-1];
                    cur[x][y] = (cur[x][y] + dp[x][y-1]) % mod;
                }
                if (x < m -1) {
                    // cur[x][y] += dp[x+1][y];
                    cur[x][y] = (cur[x][y] + dp[x+1][y]) % mod;
                }
                if (y < n -1) {
                    // cur[x][y] += dp[x][y+1];
                    cur[x][y] = (cur[x][y] + dp[x][y+1]) % mod;
                }
            }
        }
        dp = cur;
    }

    return dp[i][j];
}