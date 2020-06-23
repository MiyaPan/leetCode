/**
 * 198. 打家劫舍
 * https://leetcode-cn.com/problems/house-robber/
*/

// 这不是动态规划，这是递归啊，里面有n多的重复计算，没有利用内存保存可用子结果啊
export const rob = (nums) => {
    return helper(nums, 0);
}

function helper(nums, pointer) {
    if (pointer === nums.length-1 || pointer === nums.length-2) {
        return nums[pointer];
    }

    return Math.max(nums[pointer] + helper(nums, pointer+2), helper(nums, pointer+1))
}

// ******* 思路讲解超级清晰 *******
// https://leetcode-cn.com/problems/house-robber/solution/dong-tai-gui-hua-jie-ti-si-lu-javascript-by-liusho/

// 递归转迭代
// 到上一步为止，该问题就已经解决了。但是递归的方式性能太差，中间有太多重复的计算，所以还需要最后一步：将 自顶向下 的递归，转化成 自底向上 的迭代。
export const rob = (nums) => {
    if (!nums.length) return 0;
    if (nums.length === 1) return nums[0];

    // 错在 dp[1], dp[1]应是 nums[0]和nums[1] 的最大值，而不是 nums[1]！！！！两间房的时候当然要偷最大的了
    let dp =[nums[0], Math.max(nums[0],nums[1])];

    for (let i = 2; i< nums.length;i++) {
        dp[i] = Math.max(nums[i]+dp[i-2], dp[i-1]);
    }

    return dp[nums.length-1];
}

