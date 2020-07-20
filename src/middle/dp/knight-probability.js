/**
 * 688. “马”在棋盘上的概率
 * https://leetcode-cn.com/problems/knight-probability-in-chessboard/
*/
// 题目要的是在棋盘上的概率，所以走 k 步完，棋盘矩阵上所有概率的和就是，因为只要在盘上就算

// 小球是从边界往里走，初始值：边界都设为 1
// 这个是概率，初始值：dp[r][c] = 1，其他位置都是 0
// 开始的循环，当位置离 rc 很远时，概率都是 0，第一步，接近 rc 的那 8 个会被“波及”，产生非 0 的概率，再来一个 k，更大范围受波及
// 逐层扩散，相当于 马 往外走的各种情况

// 状态定义
// dp[i][j][k]：表示从(i,j)走k步，“马”仍然在棋盘上的概率，
// 我们如果逆向思考，从最终达到的目的地往回“跳”，那么dp[i][j][k]也表示从棋盘其他位置，走k步，到(i,j)的概率。
export const knightProbability = (N, K, r, c) => {
    // 0 步，则所有格子都是 1，即：马在任意节点(i,j)，走 0 步都在棋盘上，概率都是 1
    let dp = Array(N).fill(null).map(_ => Array(N).fill(1));
    let d = [[-1, -2], [-2,-1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2]];

    for (let k = 1; k <= K; k++) {
        let cur = Array(N).fill(null).map(_ => Array(N).fill(0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                let sum = 0;
                for (let t = 0; t < d.length; t++) {
                    const x = i + d[t][0];
                    const y = j + d[t][1];
                    // if (x >= 0 || y >= 0 || x < N || y < N) {
                    if (x >= 0 && y >= 0 && x < N && y < N) {
                        sum += dp[x][y]; 
                    }
                }
                cur[i][j] = sum / 8;
            }
        }

        dp = cur;
    }

    return dp[r][c];
}
