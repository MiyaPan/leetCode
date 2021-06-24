/**
 * 剑指 Offer 57. 和为s的两个数字
 * https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/
*/
// TODO: 三刷，空间 o(1)
var twoSum = function(nums, target) {
    let n = nums.length;
    let i = 0;
    let j = n-1;
    while (i < j) {
        let sum = nums[i] + nums[j];
        if (sum === target) return [nums[i], nums[j]];
        if (sum < target) {
            i++;
        } else {
            j--;
        }
    }
    return [];
}
var twoSum = function(nums, target) {
    let set = new Set();
    for (let num of nums) {
        if (set.has(target-num)) {
            return [num, target-num];
        }
        if (!set.has(num)) {
            set.add(num);
        }
    }
    return [];
};
