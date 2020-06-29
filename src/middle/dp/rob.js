/**
 * 213. 打家劫舍 II - 环形打家劫舍
 * https://leetcode-cn.com/problems/house-robber-ii/
*/
// 示例 1:

// 输入: [2,3,2]
// 输出: 3
// 解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
// 示例 2:

// 输入: [1,2,3,1]
// 输出: 4
// 解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 整太复杂了，分析区别就是 加了个收尾相连，确实只处理它俩就够了，但是不需要下面这么麻烦的处理，省不了性能，只管代码变复杂
// 多了相连，无非就是可以拆成：要么首尾都不要，要么要头不要尾，要么要尾不要头，这 3 个取最大值就行了
export const rob = (nums) => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let dp = [{
        val: nums[0],
        includeFirst: true
    },{
        val: Math.max(nums[0], nums[1]),
        // 这里相等也取 false
        includeFirst: nums[0] > nums[1]
    }];
    let max = Math.max(nums[0], nums[1]);

    // 先不管最后一个
    for (let i = 2; i < nums.length - 1; i++) {
        // 如果当前是 0 ，dp[i-1].val 和 dp[i-2].val 相等，这个时候应该取不包含第一个的，
        if (dp[i-1].val > dp[i-2].val + nums[i]) {
            dp[i] = dp[i-1];
        } else if (dp[i-1].val === dp[i-2].val + nums[i]) {
            dp[i] = {
                val: dp[i-1].val,
                // 两者有一个不包含，就不包含
                includeFirst: dp[i-1].includeFirst && dp[i-2].includeFirst
            }
        } else {
            dp[i] = {
                val: dp[i-2].val + nums[i],
                includeFirst: dp[i-2].includeFirst
            }
        }
        max = Math.max(max, dp[i].val);
    }

    // 处理最后一个
    const arrNotIncludeFirst = dp.slice(1, dp.length-1).filter(item => !item.includeFirst);
    if (arrNotIncludeFirst.length > 0) {
        let lastMax = arrNotIncludeFirst.sort((a,b) => b.val-a.val)[0].val + nums[nums.length-1];
        max = Math.max(max, lastMax);
    }

    return max;
}

// 这三种情况，那种的结果最大，就是最终答案呗！不过，其实我们不需要比较三种情况，只要比较情况二和情况三就行了，因为这两种情况对于房子的选择余地比情况一大呀，房子里的钱数都是非负数，所以选择余地大，最优决策结果肯定不会小。
// https://leetcode-cn.com/problems/house-robber-ii/solution/tong-yong-si-lu-tuan-mie-da-jia-jie-she-wen-ti-by-/

function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    return Math.max(helper(nums, 0, nums.length-2), helper(nums, 1, nums.length-1));
}

function helper(nums, start, end) {
    if (start === end) return nums[start];
    if (end - start === 1) return Math.max(nums[start], nums[end]);

    let prepre = nums[start];
    let pre = Math.max(nums[start], nums[start+1]);
    let cur;
    for (let i = start + 2; i <= end; i++) {
        cur = Math.max(pre, prepre + nums[i]);
        prepre = pre;
        pre = cur;
    }
    return cur;
}
