/**
 * 剑指 Offer 13. 机器人的运动范围
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

    示例 1：
    输入：m = 2, n = 3, k = 1
    输出：3
    
    示例 2：
    输入：m = 3, n = 1, k = 0
    输出：1
    
    提示：
    1 <= n,m <= 100
    0 <= k <= 20

    链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof
*/
// TODO: 三刷！
export var movingCount = function(m, n, k) {
    let visited = Array(m).fill(null).map(_ => Array(n).fill(false));

    let count = 0;
    let stack = [[0,0]];
    visited[0][0] = true;
    let p = 0;
    let directions = [[0,1], [1, 0]]
    while (p < stack.length) {
        let [r, c] = stack[p++];
        // visited[r][c] = true;
        count++;
        for (let direction of directions) {
            let newR = r + direction[0];
            let newC = c + direction[1];
            if (newR >= 0 && newR < m && newC >= 0 && newC < n
                && !visited[newR][newC]
                && getSum(newR, newC) <= k) {
                // 放的过程中就得去重，不能到取的时候判断 
                visited[newR][newC] = true;
                stack.push([newR, newC]);
            }
        }
    }
    return count;
}
function getSum(x, y) {
    let sum = 0;
    // 如果这样写，别忘了 等于 10 的情况啊
    // while (x >= 10) {
    while (x > 0) {
        sum += x % 10;
        x = parseInt(x/10);
    }

    while (y > 0) {
        sum += y % 10;
        y = parseInt(y/10);
    }
    return sum;
}

// 还不能用二分，比如 k=8, [0,19] 不行，[0, 20] 可以，会导致多算
// 也不是遍历，从上面这个case可以看出会断掉，所以是 bfs或者 dfs才对
export var movingCount1 = function(m, n, k) {
    if (k === 0) return 1;
    if (getSum(m, n) <= k) return n*m;

    let count = 0;
    for (let i = 0; i < m; i++) {
        // 剪枝
        if (getSum(i, 0) > k) break;

        let l = 0;
        let r = n-1;
        while (l <= r) {
            let m = l + parseInt((r-l)/2);
            let sum = getSum(i, m);
            // 不一定都在这里出去，还可能 r 都小于 k 的
            // if (sum === k) {
            //     count += m+1;
            //     break;
            // } else 
            if (sum <= k) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        console.log(l);
        // r 可能是 -1，该行没有一个可以的
        // l 是刚好大 1 的数，r 可能为 -1或 0 不好搞
        if (l > 0) {
            count += l;
        }
    }
    return count;
};
