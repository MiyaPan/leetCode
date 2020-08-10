/**
 * 53. 最大子序和
 * 
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例:
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 进阶:
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
*/
export const maxSubArray = (nums) => {
    let n = nums.length;
    if (n === 0) return 0;
    let dpPre = nums[0];
    let max = dpPre;
    for (let i = 1; i < n; i++) {
        dpPre = Math.max(dpPre + nums[i], nums[i]);
        max = Math.max(max, dpPre);
        // 简化不了了，得留个 dpPre 下次判断用
    }
    return max;
}