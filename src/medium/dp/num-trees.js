/**
 * 96. 不同的二叉搜索树
 * https://leetcode-cn.com/problems/unique-binary-search-trees/
*/
// 因为不需要关注内容了，比如 1和2 构成的数的数量和 3和4 是一样的，所以计数可以直接用动态规划，划分子问题。
// 对于 1到n 构成多少颗二叉搜索树，和等于：
// 以 1 为根，[] 为左子树，[2,n] 为右子树，左右子树的笛卡尔积(即排列组合数)
// 以 2 为根，[1] 为左子树，[3,n] 为右子树，左右子树的笛卡尔积(即排列组合数)
// ...
// 以 n 为根，[1，n] 为左子树，[] 为右子树，左右子树的笛卡尔积(即排列组合数)

// 注意 dp[0] 也就是空数组的时候，也是一种情况，不能返回 0
// https://leetcode-cn.com/problems/unique-binary-search-trees/solution/bu-tong-de-er-cha-sou-suo-shu-by-leetcode/ 
export const numTrees = (n) => {
    if (n === 0) return [];

    // let dp = [];
    let dp = Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let num = 2; num <=n; num++) {
        for (let i = 1; i <=num; i++) {
            dp[num] += dp[i-1] * dp[num-i];
        }
    }

    return dp[n];
}