/**
 * 
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
