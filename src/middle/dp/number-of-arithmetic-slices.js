/**
 * 413. 等差数列划分
 * 如果一个数列至少有三个元素，并且任意两个相邻元素之差相同，则称该数列为等差数列。
    例如，以下数列为等差数列:
    1, 3, 5, 7, 9
    7, 7, 7, 7
    3, -1, -5, -9

    以下数列不是等差数列。
    1, 1, 2, 5, 7

    数组 A 包含 N 个数，且索引从0开始。数组 A 的一个子数组划分为数组 (P, Q)，P 与 Q 是整数且满足 0<=P<Q<N 。
    如果满足以下条件，则称子数组(P, Q)为等差数组：
    元素 A[P], A[p + 1], ..., A[Q - 1], A[Q] 是等差的。并且 P + 1 < Q 。
    函数要返回数组 A 中所有为等差数组的子数组个数。

    示例:
    A = [1, 2, 3, 4]
    返回: 3, A 中有三个子等差数组: [1, 2, 3], [2, 3, 4] 以及自身 [1, 2, 3, 4]。

    链接：https://leetcode-cn.com/problems/arithmetic-slices
*/
// https://leetcode-cn.com/problems/arithmetic-slices/solution/deng-chai-shu-lie-hua-fen-by-leetcode/
// dp[i] = dp[i-1] +1 :以 A[i] 为结尾的数组中等差数列的个数
// 如果当前元素和前一个的差和之前的相等，那对于所有 dp[i-1] 中的数列，加上当前元素必然是新的等差
// 额外的，当前元素和倒数 2 个也必然能组成一个新的，这两个数再 dp[i-1] 中是不存在的，所以 +1
// sum 是以所有元素结尾的和
export const numberOfArithmeticSlices = (A) => {
    if (A.length < 3) return 0;

    let dp = Array(A.length).fill(0);
    let sum = 0;
    for (let i = 2; i < A.length; i++) {
        if (A[i] - A[i-1] === A[i-1] - A[i-2]) {
            dp[i] = dp[i-1] + 1;
            sum += dp[i];
        }
    }

    return sum;
}
