/**
 * 剑指 Offer 44. 数字序列中某一位的数字
 * https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/
*/
var findNthDigit = function(n) {
    if (n < 10) return n;

    let dp = [0];
    let dpSum = 0;
    let dpLenSum = 0;
    let power = 1;
    let digit = 0;
    let preDpLenSum = 0;
    while (dpLenSum <= n) {
        if (dpLenSum === n) return 1;

        power *= 10;
        digit += 1;
        dp[digit] = power - dpSum;
        dpSum += dp[digit];
        preDpLenSum = dpLenSum;
        dpLenSum += dp[digit] * digit;
    }
    // n = n - Math.pow(10, digit-1);
    n = n - preDpLenSum;
    let num = parseInt(n/digit);
    let mod = n % digit;

    let tarNum = Math.pow(10, digit-1) + num + '';
// console.log('dp:',dp,'digit:', digit,'n:',n,'num:',num,'mod:',mod,'tarNum:',tarNum)
    let ans = tarNum[0];
    for (let i = 0; i <= mod; i++) {
        ans = tarNum[i];
    }
    return ans;
};
