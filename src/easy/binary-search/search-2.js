/**
 * 剑指 Offer 53 - I. 在排序数组中查找数字 I
 * 统计一个数字在排序数组中出现的次数。

    示例 1:
    输入: nums = [5,7,7,8,8,10], target = 8
    输出: 2

    示例 2:
    输入: nums = [5,7,7,8,8,10], target = 6
    输出: 0

    链接：https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
*/
/**
 * =============================
 * 二刷
*/
export const search = (nums, target) => {
    let n = nums.length;
    let l = 0;
    let r = n - 1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] >= target) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    let count = 0;
    while (nums[l] <= target) {
        if (nums[l] === target) count++;
        l++;
    }
    return count;
}

/**
 * =============================
 * 一刷
*/
export const search = (nums, target) => {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    let loc = -1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === target) {
            loc = m;
            break;
        } else if (nums[m] < target) {
            l = m + 1;
        } else {
            r = m -1;
        }
    }
    if (loc >= 0) {
        let tmp = loc;
        let count = 1;
        while(nums[loc+1] === target) {
            count += 1;
            loc++;
        }
        loc = tmp;
        while(nums[loc-1] === target) {
            count += 1;
            loc--;
        }
        return count;
    } else {
        return 0;
    }
} 

// 二分找左右边界，而不是找目标元素
export const search = (nums, target) => {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] <= target) {
            l = m + 1;
        } else {
            r = m -1;
        }
    }
    let right = l;

    l = 0;
    r = n-1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] >= target) {
            r = m -1;
        } else {
            l = m + 1;
        }
    }
    let left = l;

    return right - left;
} 
