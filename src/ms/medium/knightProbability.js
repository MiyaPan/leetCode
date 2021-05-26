/**
 * 688. “马”在棋盘上的概率
 * https://leetcode-cn.com/problems/knight-probability-in-chessboard/
*/
/**
 * =============================
 * 二刷
*/
// 递归超时了，看看能不能剪枝或者 加备忘
export const knightProbability = (N, K, r, c) => {
    let note = Array(N).fill(null).map(_ => Array(N).fill(null).map(_ => Array(K).fill(0)));
    return bfs(N, K, r, c, note);
}
function bfs(N, K, r, c, note) {
    if (r < 0 || r >= N || c < 0 || c >= N) return 0;

    if (K === 0) return 1;

    if (note[r][c][K]) return note[r][c][K];

    let directions = [[-2, -1], [-1, -2], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2]];
    let result = 0;
    for (let direction of directions) {
        let newR = r + direction[0];
        let newC = c + direction[1];
        let res = bfs(N, K-1, newR, newC, note);
        result += 1/8 * res;
    }
    note[r][c][K] = result;

    return result;
}







/**
 * =============================
 * 一刷
*/
// 题目要的是在棋盘上的概率，所以走 k 步完，棋盘矩阵上所有概率的和就是，因为只要在盘上就算

// 小球是从边界往里走，初始值：边界都设为 1
// 这个是概率，初始值：dp[r][c] = 1，其他位置都是 0
// 开始的循环，当位置离 rc 很远时，概率都是 0，第一步，接近 rc 的那 8 个会被“波及”，产生非 0 的概率，再来一个 k，更大范围受波及
// 逐层扩散，相当于 马 往外走的各种情况

// 状态定义
// dp[i][j][k]：表示从(i,j)走k步，“马”仍然在棋盘上的概率，
// 我们如果逆向思考，从最终达到的目的地往回“跳”，那么dp[i][j][k]也表示从棋盘其他位置，走k步，到(i,j)的概率。

// 每一步的概率都是 1/8, 所以例子是：1/8 * 1/4(最后一步有 2 中方式) + 1/8 * 1/4 = 1/16 = 0.0625

// *************************************
// *总结*：dfs 就很快很好啊，不用 dp 也行哒，比之前用 dp 执行速度还快写，思路也简单，比 dp 好理解点，就是：
// 每个可能的节点去遍历，遍历的过程中记录一下已经走过的概率，带备忘的 dfs
// *************************************

// dp 思路是：K 从 1 到 K，刷 K 边棋盘，
// 第一次是 k=1 时，初始位为棋盘各个点时，不出去的概率
// 第二次是 k=2 时，初始位为棋盘各个点时，不出去的概率，因为有了 k=1 的，就可以简单求和算出 k=2 的
// ...
// 最终就取指定 r c 的结果就行
export const knightProbability = (N, K, r, c) => {
    if (N <= 0) return 0;
    
    let note = Array(N).fill(null).map(_ => Array(N).fill(null).map(_ => Array(K).fill(null)));

    return dfs(N, K, r, c, note);
}

function dfs(N, K, r, c, note) {
    if (K === 0) return 1;

    let rDirestion = [-2, -2, -1, -1, +1, +1, +2, +2];
    let cDirestion = [-1, +1, -2, +2, -2, +2, -1, +1];

    let res = 0;
    for (let i = 0; i < 8; i++) {
        let newR = r + rDirestion[i];
        let newC = c + cDirestion[i];
        if (0 <= newR && newR < N && 0 <= newC && newC < N) {
            if (note[newR][newC][K-1]) {
                res += note[newR][newC][K-1];
            } else {
                res += dfs(N, K-1, newR, newC, note);
            }
        }
    }

    note[r][c][K] = res * 1/8;
    return res * 1/8;
}
