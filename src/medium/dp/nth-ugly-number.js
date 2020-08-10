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

        // 这里不管哪一步相等，都 ++，保证了不会出现 2*3 和 3*2 这种重复，不要用 else if
        if (dp[i] === 2*dp[p2]) p2++;
        if (dp[i] === 3*dp[p3]) p3++;
        if (dp[i] === 5*dp[p5]) p5++;
        i++;
    }

    return dp[n];
}
// 2,3,5
export const nthUglyNumber2 = (n) => {
    if (n === 1) return 1;
    let pa = 1;
    let pb = 1;
    let pc = 1;
    let dp = [0, 1];
    let pre = 0;
    // 因为 1 是丑数，所以要少数一个
    while(n > 1) {
        // 这里是只包含 2 3 5，就不能有别的因数了，所以只能由 2 3 5 产生的数接着乘，从 dp 中按照每次加 1 的索引去拿被乘数，而不能 px++; 每次加一
        let min = Math.min(dp[pa]*2, dp[pb]*3, dp[pc]*5);
        dp.push(min);
        if (min === dp[pa]*2) {
            pa++;
            // if (pre === min) continue;
            // dp.push(min);
        }
        if (min === dp[pb]*3) {
            pb++;
            // if (pre === min) continue;
            // dp.push(min);
        }
        if (min === dp[pc]*5) {
            pc++;
            // if (pre === min) continue;
            // dp.push(min);
        }
        pre = min;
        n--;
    }
    return pre;
}
