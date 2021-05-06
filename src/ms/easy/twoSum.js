/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，
 * 并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
    你可以按任意顺序返回答案。

    示例 1：
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
    
    示例 2：
    输入：nums = [3,2,4], target = 6
    输出：[1,2]
    
    示例 3：
    输入：nums = [3,3], target = 6
    输出：[0,1]

    提示：
    2 <= nums.length <= 103
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    只会存在一个有效答案

    链接：https://leetcode-cn.com/problems/two-sum
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// [3,2,4], 6
var twoSum = function(nums, target) {
    let n = nums.length;
    // 啊擦，不能 sort 这样 index 就不对了，，，所以还不能用快速的方法，，，
    // nums.sort((a,b) => a-b);
    // let i = 0;
    // let j = n-1;
    // let jStart = i + 1;
    // while (i < j && j >= jStart) {
    //     let l = nums[i];
    //     let r = nums[j];
    //     if (l + r === target) return [i,j];
    //     if (l + r > target) {
    //         j -= 1;
    //     } else {
    //         i += 1;
    //         // 每个 i 都从后向前找
    //         jStart = j;
    //         j = n-1;
    //     }
    // }
    // 靠，这个也不行，因为元素不能重用，只能用最笨的方法
    // for (let i = 0; i < n; i++) {
    //     let otherIdx = nums.findIndex(item => item === target - nums[i]);
    //     if (~otherIdx) {
    //         return [i, otherIdx];
    //     }
    // }
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            if (nums[j] === target - nums[i]) {
                return [i, j];
            }
        }
    }
    return false;
};
