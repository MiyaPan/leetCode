/**
 * 303. 区域和检索 - 数组不可变
 * 给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。
    实现 NumArray 类：

    NumArray(int[] nums) 使用数组 nums 初始化对象
    int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，
    包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
     

    示例：

    输入：
    ["NumArray", "sumRange", "sumRange", "sumRange"]
    [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
    输出：
    [null, 1, -1, -3]

    解释：
    NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
    numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
    numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
    numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))

    提示：
    0 <= nums.length <= 104
    -105 <= nums[i] <= 105
    0 <= i <= j < nums.length
    最多调用 104 次 sumRange 方法

    链接：https://leetcode-cn.com/problems/range-sum-query-immutable
*/
/**
 * =============================
 * 二刷
*/
var NumArray = function(nums) {
    let n = nums.length;
    // 2 维还不行，最后一个超长 case 超时，还是得一维
    // this.dp = Array(n).fill(null).map(_ => Array(n).fill(0));
    // for (let i = 0; i < n; i++) {
    //     for (let j = i; j < n; j++) {
    //         if (i === j) {
    //             this.dp[i][j] = nums[i];
    //         } else {
    //             this.dp[i][j] = this.dp[i][j-1] + nums[j];
    //         }
    //     }
    // }
    // this.nums = nums;
    this.dp = Array(n).fill(0);
    this.dp[0] = nums[0];
    for (let i = 1; i < n; i++) {
        this.dp[i] = this.dp[i-1] + nums[i];
    }
}
NumArray.prototype.sumRange = function(i, j) {
    // 干啥呢，直接 - dp[i-1] 不就行了
    if (i === 0) return dp[j];
    return this.dp[j] - this.dp[i-1];
    // return this.dp[j] - this.dp[i] + this.nums[i];
};

/**
 * =============================
 * 一刷
*/
// 动态规划不一定非得有动态转移方程，或者说动态转移方程可用极其简单，就是元素当前本身，不用做运算；但是不能没有缓存，没缓存就成了递归了！！
var NumArray = function(nums) {
    let dp = [nums[0]];
    for (let i=1;i<nums.length;i++) {
        dp[i] = nums[i] + dp[i-1];
    }

    this.dp = dp;
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    if (i===0) return this.dp[j];
    return dp[j] - dp[i-1];
};
