/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
    你的算法时间复杂度必须是 O(log n) 级别。

    如果数组中不存在目标值，返回 [-1, -1]。

    示例 1:
    输入: nums = [5,7,7,8,8,10], target = 8
    输出: [3,4]

    示例 2:
    输入: nums = [5,7,7,8,8,10], target = 6
    输出: [-1,-1]

    链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array
*/
// https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/er-fen-cha-zhao-suan-fa-xi-jie-xiang-jie-by-labula/
// 思路：根据单独找左右边界的模板，我们可以做两次搜索，反正 o(2 * logn) = o(logn)
export const searchRange = (nums, target) => {
    let n = nums.length;
    if (n === 0) return [-1,-1];
    let l = 0;
    let r = n - 1;
    let left = leftBound(l, r, nums, target);
    let right = rightBound(l, r, nums, target);
    return [left, right];
}

function leftBound(l, r, nums, target) {
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === target) {
            r = m - 1;
        } else if (nums[m] < target) {
            l = m + 1;
        } else if (nums[m] > target){
            r = m -1;
        }
    }
    if (l >= nums.length || nums[l] !== target) {
        return -1;
    }
    return l;
}

function rightBound(l, r, nums, target) {
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === target) {
            l = m + 1;
        } else if (nums[m] < target) {
            l = m + 1;
        } else if (nums[m] > target){
            r = m -1;
        }
    }
    if (r < 0 || nums[r] !== target) {
        return -1;
    }
    return r;
}


// 再根据官方答案写一个，答案也是 2*logn 一样
// https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-yuan-su-de-di-yi-/
export const searchRange = (nums, target) => {
    // 不想写了，也是 2*logn
}

