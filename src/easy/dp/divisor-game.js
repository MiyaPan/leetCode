/**
 * 1025. 除数博弈
 * 爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。
    最初，黑板上有一个数字 N 。在每个玩家的回合，玩家需要执行以下操作：

    选出任一 x，满足 0 < x < N 且 N % x == 0 。
    用 N - x 替换黑板上的数字 N 。
    如果玩家无法执行这些操作，就会输掉游戏。

    只有在爱丽丝在游戏中取得胜利时才返回 True，否则返回 False。假设两个玩家都以最佳状态参与游戏。

    示例 1：
    输入：2
    输出：true
    解释：爱丽丝选择 1，鲍勃无法进行操作。
    
    示例 2：
    输入：3
    输出：false
    解释：爱丽丝选择 1，鲍勃也选择 1，然后爱丽丝无法进行操作。

    提示：
    1 <= N <= 1000
 * https://leetcode-cn.com/problems/divisor-game/
*/
/**
 * =============================
 * 二刷
*/
export const divisorGame = (N) => {
    let dp = Array(N+1).fill(false);
    dp[2] = true;
    for (let i = 3; i <= N; i++) {
        for (let j = 1; j < i; j++) {
            if (i % j === 0) {
                dp[i] = !dp[i-j];
                if (dp[i]) break;
            }
        }
    }
    return dp[N];
}

/**
 * =============================
 * 一刷
*/
export const divisorGame = (N) => {
    // N = 0,1,2 的时候
    let dp = [0, false, true];

    for (let i = 3; i<= N; i++) {
        dp[i] = false;
        for (let j = i - 1; j > 0; j--) {
            if (i%j===0 && dp[i-j] === false) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[N];
}
