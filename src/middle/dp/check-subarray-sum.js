/**
 * 523. 连续的子数组和
 * https://leetcode-cn.com/problems/continuous-subarray-sum/
 * 给定一个包含 非负数 的数组和一个目标 整数 k，编写一个函数来判断该数组是否含有连续的子数组，其大小至少为 2，
 * 且总和为 k 的倍数，即总和为 n*k，其中 n 也是一个整数。

    示例 1：
    输入：[23,2,4,6,7], k = 6
    输出：True
    解释：[2,4] 是一个大小为 2 的子数组，并且和为 6。

    示例 2：
    输入：[23,2,6,4,7], k = 6
    输出：True
    解释：[23,2,6,4,7]是大小为 5 的子数组，并且和为 42。
     
    说明：
    数组的长度不会超过 10,000 。
    你可以认为所有数字总和在 32 位有符号整数范围内。
*/
export const checkSubarraySum = (nums, k) => {
    let n = nums.length;
    // let dp = Array(n).fill(null).map(_ => Array(n).fill(0));
    let sum = Array(n).fill(0);
    sum[0] = nums[0];

    // for (let i = 0; i < n; i++) dp[i][i] = nums[i];
    for (let i = 1; i < n; i++) sum[i] = sum[i-1] + nums[i];

    for (let i = 0; i < n-1; i++) {
        for (let j = i + 1; j < n; j++) {
            // 二维数组时间没超，空间超了
            let sumInterval = sum[j] - sum[i] + nums[i];
            if (k === 0 && sumInterval === 0) return true;
            if (sumInterval % k === 0) {
                return true;
                // max = Math.max(max, j-i+1);
            }
        }
    }
    return false;
}