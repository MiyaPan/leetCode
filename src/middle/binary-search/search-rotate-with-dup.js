/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    ( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。
    编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

    示例 1:
    输入: nums = [2,5,6,0,0,1,2], target = 0
    输出: true

    示例 2:
    输入: nums = [2,5,6,0,0,1,2], target = 3
    输出: false

    进阶:
    这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
    这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

    链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
// https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/solution/zai-javazhong-ji-bai-liao-100de-yong-hu-by-reedfan/
 var search = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    // [1,3], 3
    // [1,3,1,1,1], 3
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] === target) return true;

        // 不能放到下面的 if else 后面，因为要 提前终止，这样来排除一个选项
        // 最重要的是：不能拿 first 去比，而应该比较 nums[l]，这样才能排除 左边 那个相等的，把数组缩短
        if (nums[m] === nums[l]) {
            l++;
            continue;
        }

        if (nums[m] > nums[l]) {
            // first === target 归哪边都行，都能找到
            if (nums[l] <= target && target < nums[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else if (nums[m] < nums[l]) {
            if (nums[m] < target && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return false;
};
