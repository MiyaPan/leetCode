/**
 * 50. Pow(x, n)
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。

    示例 1:
    输入: 2.00000, 10
    输出: 1024.00000

    示例 2:
    输入: 2.10000, 3
    输出: 9.26100

    示例 3:
    输入: 2.00000, -2
    输出: 0.25000
    解释: 2-2 = 1/22 = 1/4 = 0.25

    说明:
    -100.0 < x < 100.0
    n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。

    链接：https://leetcode-cn.com/problems/powx-n
*/
// https://leetcode-cn.com/problems/powx-n/solution/powx-n-by-leetcode-solution/
// 答案解法2，二进制厉害了
export const myPow = (x, n) => {
    if (x === 0 || n === 0) return 1;

    // sign 是不用处理的，反正就是乘法而已
    // let sign = x > 0 ? 1 : 0;
    // if (!sign) {
    //     sign = n % 2 === 0;
    // }
    // x = Math.abs(x);
    
    let powSign = n > 0 ? true : false;
    n = Math.abs(n);

    let ans = helper(x, n);

    if (!powSign) {
        ans = 1 / ans;
    }

    return ans;
    // return sign ? ans : -ans;
}

function helper(x, n) {
    if (x === 0 || n === 0) return 1;
    
    let ans = x;
    let count = 1;
    while((count + count) <= n) {
        if (count === n) return ans;
        ans *= ans;
        count += count;
    }

    ans *= helper(x, n-count);

    return ans;
}
