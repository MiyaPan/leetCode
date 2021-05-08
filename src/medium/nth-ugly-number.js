/**
 * 1201. 丑数 III
 * 请你帮忙设计一个程序，用来找出第 n 个丑数。
    丑数是可以被 a 或 b 或 c 整除的 正整数。

    示例 1：
    输入：n = 3, a = 2, b = 3, c = 5
    输出：4
    解释：丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。
    
    示例 2：
    输入：n = 4, a = 2, b = 3, c = 4
    输出：6
    解释：丑数序列为 2, 3, 4, 6, 8, 9, 10, 12... 其中第 4 个是 6。
    
    示例 3：
    输入：n = 5, a = 2, b = 11, c = 13
    输出：10
    解释：丑数序列为 2, 4, 6, 8, 10, 11, 12, 13... 其中第 5 个是 10。
    
    示例 4：
    输入：n = 1000000000, a = 2, b = 217983653, c = 336916467
    输出：1999999984

    提示：
    1 <= n, a, b, c <= 10^9
    1 <= a * b * c <= 10^18
    本题结果在 [1, 2 * 10^9] 的范围内
    链接：https://leetcode-cn.com/problems/ugly-number-iii
*/
// 大 case 就超时了...
export var nthUglyNumber1 = function(n, a, b, c) {
    [a, b, c] = [a,b,c].sort((a,b) => a-b);
    let pa = 1;
    let pb = 1;
    let pc = 1;
    let pre = 0;
    while(n > 0) {
        let min = Math.min(pa*a, pb*b, pc*c);
        if (min === pa*a) pa++;
        if (min === pb*b) pb++;
        if (min === pc*c) pc++;
        pre = min;
        n--;
    }

    return pre;
};

// https://leetcode-cn.com/problems/ugly-number-iii/solution/er-fen-fa-si-lu-pou-xi-by-alfeim/
// 按照题意，所谓丑数是可以至少被a、b、c三者中的一者整除的，那么对于一个丑数X，我们能够确定它是第几个丑数吗？
// -- 答案显然是可以的，我们只需要计算X中包含了多少个丑数因子即可。
// 即只需要知道在[0,X]范围内,还有多少个丑数即可，而这些丑数，无非就是一些能被a或者b或者c所整除的数。x / a = 4，那么就有 1个4，2个4，3个4，4个4这几个因子
// 那么显然，我们直接用X/a、X/b、X/c就能计算出[0,X]范围内有多少数能被a或者b或者c整除，然后把它们加起来就是答案！

// 中间发生了重复计算？如果一个数既能被a整除，又能被b整除，那么实际上该数在先前的计算中就被重复计算了一次(分别是在计算X/a和X/b时)。
// 思考所有可能的情况

// 1.该数只能被a整除 (该数一定是a 的整数倍)
// 2.该数只能被b整除 (该数一定是b 的整数倍)
// 3.该数只能被c整除 (该数一定是c 的整数倍)
// 4.该数只能被a和b同时整除 (该数一定是a、b最小公倍数的整数倍)
// 5.该数只能被a和c同时整除 (该数一定是a、c最小公倍数的整数倍)
// 6.该数只能被b和c同时整除 (该数一定是b、c最小公倍数的整数倍)
// 7.该数只能被a和b和c同时整除（该数一定是a、b、c的最小公倍数的整数倍）

// 所以，我们只需要分别计算以上七项就能得到结果了！让我们分别来看（用MCM+下标表示最小公倍数）：

// 情况1 = X/a - 情况4 - 情况5 - 情况7
// 情况2 = X/b - 情况4 - 情况6 - 情况7
// 情况3 = X/c - 情况5 - 情况6 - 情况7
// 情况4 = X/MCM_a_b - 情况7
// 情况5 = X/MCM_a_c - 情况7
// 情况6 = X/MCM_b_c - 情况7
// 情况7 = X/MCM_a_b_c

// 让我们整理上述方程后也就得到：

// sum(情况) = X/a + X/b + X/c - X/MCM_a_b - X/MCM_a_c - X/MCM_b_c + X/MCM_a_b_c

// 好了，现在也就得到了计算X中包含多少个丑数因子的方法了！
// 示例 1：
//     输入：n = 3, a = 2, b = 3, c = 5
//     输出：4
//     解释：丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。

// 一直超时的 case 是因为 a b c d 溢出了。全要用 bigInt 存，全部，，，，，
export var nthUglyNumber = function(n, a, b, c) {
    let l = BigInt(Math.min(a,b,c));
    // let r = BigInt(2000000000);
    // ** 求幂 的简写
    let r = 2n * 10n ** 9n;

    a = BigInt(a);
    b = BigInt(b);
    c = BigInt(c);
    n = BigInt(n);
    while(l <= r) {
        let m = l + BigInt(parseInt((r-l)/2n));
        
        let MLM_a_b = minCommonMultiple(a, b);
        let MLM_b_c = minCommonMultiple(b, c);
        let MLM_a_c = minCommonMultiple(a, c);
        let MLM_a_b_c = minCommonMultiple(MLM_a_b, c);
        let count = parseInt(m/a) + parseInt(m/b) + parseInt(m/c)
            - parseInt(m/MLM_a_b)
            - parseInt(m/MLM_b_c)
            - parseInt(m/MLM_a_c)
            + parseInt(m/MLM_a_b_c);

        if (count >= n) {
            r = m - 1n;
        } else {
            l = m + 1n;
        }
    }

    return l;
};

// 至于计算最小公倍数的方法，这里不多介绍，概括而言就是对于两个数a和b，它们的最小公倍数 = a*b/(a和b的最大公约数)，
// 最大公约数可以通过辗转相除法得到
function minCommonMultiple(a, b) {
    let mutil = a * b;
    // 可以用在一个整数字面量后面加 n 的方式定义一个 BigInt ，如：10n，或者调用函数BigInt()。
    while(b !== 0n) {
        let t = a % b
        a = b 
        b = t
    }
    // return mutil / maxCommonDivider(a,b);
    return mutil / a;
}

// function maxCommonDivider(a,b) {
//     return a % b === 0 ? b : maxCommonDivider(b, a % b);
// }
