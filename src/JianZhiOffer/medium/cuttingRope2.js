/**
 * 剑指 Offer 14- II. 剪绳子 II
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m - 1] 。请问 k[0]*k[1]*...*k[m - 1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
    答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

    示例 1：

    输入: 2
    输出: 1
    解释: 2 = 1 + 1, 1 × 1 = 1
    示例 2:

    输入: 10
    输出: 36
    解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36

    提示：

    2 <= n <= 1000
    注意：本题与主站 343 题相同：https://leetcode-cn.com/problems/integer-break/


    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * 尝试在动态规划的基础上取余，就算把数据类型都换成long也是无解的，对每次的dp[i]取余确实可以避免溢出的问题，但是由于过程中修改了值，会导致最终结果和预期不同。比如
    这一步：
    dp[i] = Math.max(dp[i] ，x * y );
    x * y = 1000000005 ，若dp[i] 本该等于 1000000008 ，但是经过上次取余后变成了1，本来的结果应该是1000000008 ，现在却变成了1000000005，所以在动态规划过程中是不能取余的，那么就只能使用BigInter存储中间结果了

    *******
    因为本题的动态规划涉及到数的比较，会出现取余后的数和取余前的数相比较的情况，自然会影响后面的结果，
    而贪心算法的求解过程就是简单的乘法，(100000009 % 1000000007) * 3 和 (100000009 * 3）% 1000000007的结果是一样的
    *******

    作者：al-viewer
    链接：https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/solution/di-zi-fen-xi-shi-yong-dong-tai-gui-hua-q-jlr7/
*/
// 通过数学证明可以证明每段都剪成 3 积最大
// 证明见： https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/solution/mian-shi-ti-14-ii-jian-sheng-zi-iitan-xin-er-fen-f/
var cuttingRope = function(n) {
    if (n < 3) return 1;
    if (n === 3) return 2;
    if (n === 4) return 4;
    let ans = 1;
    // 当剩余 4 的时候不应该再减去 3剩 1 ，而应该保留 4
    while (n > 4) {
        ans = ans * 3 % 1000000007;
        n -= 3;
    }
    // 剩余最后一段，值可能是 4 3 2 1 ，都不应该再分了，直接用，再分都小了
    return ans * n % 1000000007
}

var cuttingRope = function(n) {
    let dp = Array(n+1).fill(0);
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 2;
    for (let i = 4; i <= n; i++) {
        for (let j = 1; j <= i-1; j++) {
            // 本来dp，分两段 j和i-j ，分 n 段，其中 j 固定，i-j去看分多少段最大
            // 肯定不能过程中取余，一取余再运算就不对了
            // 因为本题的动态规划涉及到数的比较，会出现取余后的数和取余前的数相比较的情况，自然会影响后面的结果

            // Math.max不能求BigInt类型的最值，所以我们要自己写一个max函数判断最值。
            dp[i] = max(BigInt(dp[i]), BigInt(j * (i-j)), BigInt(j) * BigInt(dp[i-j]));
        }
    }
    return dp[n] % (1000000007n);
};
const max = (...args) => args.reduce((prev, curr) => prev > curr ? prev : curr)
