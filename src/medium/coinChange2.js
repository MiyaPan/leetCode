/**
 * 518. 零钱兑换 II
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 

    示例 1:
    输入: amount = 5, coins = [1, 2, 5]
    输出: 4
    解释: 有四种方式可以凑成总金额:
    5=5
    5=2+2+1
    5=2+1+1+1
    5=1+1+1+1+1
    
    示例 2:
    输入: amount = 3, coins = [2]
    输出: 0
    解释: 只用面额2的硬币不能凑成总金额3。
    
    示例 3:
    输入: amount = 10, coins = [10] 
    输出: 1

    注意:
    你可以假设：
    0 <= amount (总金额) <= 5000
    1 <= coin (硬币面额) <= 5000
    硬币种类不超过 500 种
    结果符合 32 位符号整数
    链接：https://leetcode-cn.com/problems/coin-change-2
*/
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
/**
 * 套模板
 * 1. 存在选择
 * 2. 组合成 amount
 * 3. 可以重复选择所以不是 01 背包，是完全背包，所以内层循环需要正序，先更新 dp[j-num]
 * 4. 种数，则是“组合”问题 dp[j] =  dp[j] + dp[j-num] //我们一轮轮翻着更新的，要的是最后一轮的结果，不选当前项是 dp[j],要不选当前的加上选的总数
 * 5. 不考虑考虑顺序。则 nums 在外侧，target 在内侧
 * ps:
 * target 在外侧，nums 在内侧，实际意义：对与每一个 target，都要去看所有数字可能组成的结果，这里面 num 就能
 * nums 在外侧，target 在内侧，实际意义：对与 [0, i] 内的数依次去组成 1... target，每轮去迭代更新
*/
 var change = function(amount, coins) {
    // amount = 5, coins = [1, 2, 5] - 4
    // 要的是种数，所以初始化 0
    let dp = Array(amount+1).fill(0);

    // 组成 0 元的 coin 组合是 1 种：什么都不选
    dp [0] = 1;

    for (let num of coins) {
        for (let j = num; j <= amount; j++) {
            dp[j] = dp[j] + dp[j-num];
        }
    }
    return dp[amount];
};
