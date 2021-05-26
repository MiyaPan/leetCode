/**
 * 1248. 统计「优美子数组」
 * 给你一个整数数组 nums 和一个整数 k。
    如果某个 连续 子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。
    请返回这个数组中「优美子数组」的数目。

    示例 1：
    输入：nums = [1,1,2,1,1], k = 3
    输出：2
    解释：包含 3 个奇数的子数组是 [1,1,2,1] 和 [1,2,1,1] 。
    
    示例 2：
    输入：nums = [2,4,6], k = 1
    输出：0
    解释：数列中不包含任何奇数，所以不存在优美子数组。
    
    示例 3：
    输入：nums = [2,2,2,1,2,2,1,2,2,2], k = 2
    输出：16

    提示：
    1 <= nums.length <= 50000
    1 <= nums[i] <= 10^5
    1 <= k <= nums.length

    链接：https://leetcode-cn.com/problems/count-number-of-nice-subarrays
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 思路是对的，写的不好看
var numberOfSubarrays = function(nums, k) {
    let n = nums.length;
    let i = 0;
    let ans = 0;
    let count = 0;
    // 当前窗口的第一个奇数
    let left = -1;
    // 当前窗口的最后一个奇数
    let right = 0;
    // 当前窗口开始的 index
    let start = 0;
    // nums = [2,2,2,1,2,2,1,2,2,2], k = 2
    while (i < n) {
        while (count < k && i < n) {
            if (nums[i] % 2 === 1) count++;
            if (count === 1 && left === -1) left = i;
            if (count === k) right = i;
            i++;
        }

        // 很关键的一个case，这就是最后一个case不过的原因
        if (count < k) break;

        // count === k 时，继续向后找，直到奇数的前一个停止
        while (i < n && nums[i] % 2 === 0) i++;
        ans += (left - start + 1) * (i-right);

        // 再次起步
        start = left + 1;
        let j = start;
        while (j < n && nums[j] % 2 === 0) j++;
        left = j;
        count--;
    }
    return ans;
};
