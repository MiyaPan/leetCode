/**
 * 剑指 Offer 46. 把数字翻译成字符串
 * https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
*/
var translateNum = function(num) {
    let s = num.toString();
    let n = s.length;
    let dp = Array(n+1).fill(1);
    for (let i = 1; i < n; i++) {
        if (s[i-1] === '1' || s[i-1] === '2' && s[i] <= '5') {
            // dp 是多一个的，所以 index 要比 i 多一个，本应是
            // dp[i] = dp[i-1] + dp[i-2];
            dp[i+1] = dp[i-1] + dp[i];
        } else {
            // dp[i] = dp[i-1];
            dp[i+1] = dp[i];
        }
    }
    return dp[n];
};
