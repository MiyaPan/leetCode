/**
 * 1025. 除数博弈
 * https://leetcode-cn.com/problems/divisor-game/
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
