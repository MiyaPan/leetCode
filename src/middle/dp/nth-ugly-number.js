/**
 * 264. 丑数 II
 * 编写一个程序，找出第 n 个丑数，丑数就是质因数只包含 2, 3, 5 的正整数。
 * https://leetcode-cn.com/problems/ugly-number-ii/
 * 
 *  输入: n = 10
    输出: 12
    解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
    说明:  

    1 是丑数。
    n 不超过1690。
*/
// 爆栈了
export const nthUglyNumber1 = (n) => {
    let dp = [false, true];

    let count = n === 0 ? 0 : 1;
    let i = 1;
    while (n > 1) {
        i++;
        let fac = i%2 === 0
            ? i/2
            : i%3 === 0
                ? i/3
                : i%5 === 0
                    ? i/5
                    : 0;

        dp[i] = dp[fac];
        if (dp[i]) count++;

        if (count === n) break;
    }

    return i;
}

// 只有质因数 2 3 5，那不就是 由 2 3 5 乘起来的吗，所以每一轮都排列组合的乘以 2 3 5 得到数字就行，这样访问到的只有丑数，避免了全部遍历
// https://leetcode-cn.com/problems/ugly-number-ii/solution/san-zhi-zhen-fang-fa-de-li-jie-fang-shi-by-zzxn/
// 3 指针法，如果指针位置的丑数*指针的值等于当前的丑数，该指针加一
export const nthUglyNumber = (n) => {
    let dp = [0,1];

    let p2 = 1;
    let p3 = 1;
    let p5 = 1;

    let i = 2;
    while (i <= n) {
        // 这里是 2*dp[p2]，而不是 p2*dp[p2] 啊！
        dp[i] = Math.min(2*dp[p2], 3*dp[p3], 5*dp[p5]);

        if (dp[i] === 2*dp[p2]) p2++;
        if (dp[i] === 3*dp[p3]) p3++;
        if (dp[i] === 5*dp[p5]) p5++;
        i++;
    }

    return dp[n];
}
