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
