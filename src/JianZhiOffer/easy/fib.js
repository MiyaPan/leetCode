/**
 * 剑指 Offer 10- I. 斐波那契数列
*/
var fib = function(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let prepre = 0;
    let pre = 1;
    let ans = 0;
    for (let i = 2; i <= n; i++) {
        // ans = pre + prepre;
        ans = (pre + prepre) % 1000000007;
        prepre = pre;
        pre = ans;
    }
    return ans;
};
