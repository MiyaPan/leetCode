/**
 * 198. 打家劫舍
 * https://leetcode-cn.com/problems/house-robber/
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
    给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

    示例 1：
    输入：[1,2,3,1]
    输出：4
    解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
         偷窃到的最高金额 = 1 + 3 = 4 。
    
    示例 2：
    输入：[2,7,9,3,1]
    输出：12
    解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
         偷窃到的最高金额 = 2 + 9 + 1 = 12 。

    提示：
    1 <= nums.length <= 100
    0 <= nums[i] <= 400

    链接：https://leetcode-cn.com/problems/house-robber
*/
/**
 * =============================
 * 二刷
*/
export const rob = (nums) => {
    let n = nums.length;
    let dp = Array(n).fill(0);
    // [2,1]
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i]);
    }
    return dp[n-1];
}

/**
 * =============================
 * 一刷
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

