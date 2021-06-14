/**
 * 377. 组合总和 Ⅳ
 * https://leetcode-cn.com/problems/combination-sum-iv/
 * 
 * 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

    示例:

    nums = [1, 2, 3]
    target = 4

    所有可能的组合为：
    (1, 1, 1, 1)
    (1, 1, 2)
    (1, 2, 1)
    (1, 3)
    (2, 1, 1)
    (2, 2)
    (3, 1)
    请注意，顺序不同的序列被视作不同的组合。

    因此输出为 7。
*/

// [3,1,2,4], 4  -- 8
// TODO: 三刷！！！
/**
 * =============================
 * 二刷
*/
/**
 * 套模板
 * 1. 存在选择
 * 2. 组合成 目标数
 * 3. 可以重复选择所以不是 01 背包，是完全背包，所以内层循环需要正序，先更新 dp[j-num]
 * 4. 个数，则是“组合”问题 dp[j] =  dp[j] + dp[j-num] //我们一轮轮翻着更新的，要的是最后一轮的结果，不选当前项是 dp[j],要不选当前的加上选的总数
 * 5. 考虑顺序。即：不同顺序为不同解，则需要 target 在外侧，nums 在内侧.
 * ps:
 * target 在外侧，nums 在内侧，实际意义：对与每一个 target，都要去看所有数字可能组成的结果，这里面 num 就能
 * nums 在外侧，target 在内侧，实际意义：对与 [0, i] 内的数依次去组成 1... target，每轮去迭代更新
*/
export const combinationSum4 = (nums, target) => {
    // 因为要是的解的个数，所以初始化 0
    let dp = Array(target+1).fill(0);

    // 组成 target = 0 的解集就是 1 个
    dp[0] = 1;

    // targeet 在内层的时候是从 num 开始，现在在外层没法在这里判断了，就只能去里面判断了
    // for (let j = num; j <= target; j++) {
    for (let j = 1; j <= target; j++) {
        for (let i = 0; i < nums.length; i++) {
            let num = nums[i];
        // j 小于 num 的时候就不用管了，j 是背包容量，背包容量小于物品重量的根本不用更新，
        // 因为无法添加新的解集 dp[j-num] 进去的，所以维持上一轮的结果即可
            if (j >= num) {
                dp[j] = dp[j] + dp[j-num];
            }
        }
    }
    return dp[target];
}











/**
 * =============================
 * 一刷
*/
export const combinationSum4 = (nums, target) => {
    if (nums.length === 0 || target === 0) return 0;

    let dp = Array(target+1).fill(0);
    dp[0] = 1;

    for (let i = nums[0]; i <= target; i++) {
        for (let num of nums) {
            if (i < num) continue;
            dp[i] += dp[i-num];
        }
    }

    return dp[target];
}
