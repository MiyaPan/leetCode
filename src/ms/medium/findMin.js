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
export var findMin = function(nums) {
    let len = nums.length;
    
    let l = 0;
    let r = len - 1;

    // 单独处理没旋转的，既快，又能避免异常 case 【如长度为 1 的等】
    let first = nums[0];
    let last = nums[r];
    if (last >= first) return first;

    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] > nums[m+1]) return nums[m+1];
        if (nums[m-1] > nums[m]) return nums[m];

        if (nums[m] > nums[r]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
};
