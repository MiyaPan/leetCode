/**
 * 153. 寻找旋转排序数组中的最小值
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    请找出其中最小的元素。
    你可以假设数组中不存在重复元素。

    示例 1:
    输入: [3,4,5,1,2]
    输出: 1

    示例 2:
    输入: [4,5,6,7,0,1,2]
    输出: 0

    链接：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array
*/
// 技巧：这类旋转数组的题目，只要没重复元素，就都跟 first 比，有重复元素就跟 nums[l] 或 nums[r] 比
export var findMin = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    let first = nums[0];
    let last = nums[n-1];
    if (last >= first) return first;

    while(l<=r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] > nums[m+1]) return nums[m+1];
        // 这样也可以，也可以多个 if 判断
        if (nums[m] > first) {
            l = m;
        } else {
            r = m;
        }
    }
    return -1;
};

export var findMin1 = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    let first = nums[0];
    let last = nums[n-1];
    if (last >= first) return first;

    while(l<=r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] > nums[m+1]) return nums[m+1];
        if (nums[m] < nums[m-1]) return nums[m];
        // 为了 m 是最小时，不被跳过，又不想改 l 和 r 的逻辑，也可以上面多个 if 判断
        if (nums[m] > first) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
};