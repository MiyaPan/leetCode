/**
 * 剑指 Offer 42. 连续子数组的最大和
 * https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/
*/
var maxSubArray = function(nums) {
    let n = nums.length;
    let dp = Array(n).fill(0);
    dp[0] = nums[0];
    let max = nums[0];
    for (let i = 1; i < n; i++) {
        // 这个题是要求连续子数组，而不是序列，所以必须包含当前元素，而去选择要不要添加前面的序列
        // 如果是子序列问题，那就是用前面的去选择 要不要加当前元素
        dp[i] = Math.max(nums[i], dp[i-1]+ nums[i]);
        max = dp[i] > max ? dp[i] : max;
    }
    return max;
};
