/**
 * 26. 删除排序数组中的重复项
https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 * 示例 1:
    给定数组 nums = [1,1,2], 
    函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
    你不需要考虑数组中超出新长度后面的元素。

    示例 2:
    给定 nums = [0,0,1,1,1,2,2,3,3,4],
    函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
*/
/**
 * =============================
 * 二刷, done
*/
// 执行用时 : 60 ms，击败了 99.93%
// 内存消耗 : 36.7 MB, 击败了 85.74%
export const removeDuplicates = (nums) => {
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return 1;
    }


    let loc = 1;
    // count 就是 loc 呀
    // let count = 1;
    // current 其实就是 nums[loc-1] 呀，重复了
    // let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // if (current !== nums[i]) {
        if (nums[loc - 1] !== nums[i]) {
            nums[loc++] = nums[i];
            // current = nums[i];
            // count += 1;
        }
    }

    // return count;
    return loc;
}

// 最初版本代码
var removeDuplicates0 = function(nums) {
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return 1;
    }


    let loc = 1;
    let count = 1;
    let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (current !== nums[i]) {
            nums[loc++] = nums[i];
            current = nums[i];
            count += 1;
        }
    }

    return count;
};