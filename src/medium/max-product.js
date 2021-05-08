/**
 * 152. 乘积最大子数组
 * https://leetcode-cn.com/problems/maximum-product-subarray/
*/
// 这个不是单纯的取最大值的，因为存在：虽然前面是负数，可是后面也是，负负得正，变最大
// [-2,3,-4]：24
export const maxProduct = (nums) => {
    if (!nums.length) return 0;

    // let dp = [];
    let preMax = nums[0];
    let preMin = nums[0];
    let curMax = nums[0];
    let curMin = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curMax = Math.max(nums[i] * preMax, nums[i] * preMin, nums[i]);
        curMin = Math.min(nums[i] * preMax, nums[i] * preMin, nums[i]);
        max = Math.max(curMax, max);
        preMax = curMax;
        preMin = curMin;
    }

    return max;
}
