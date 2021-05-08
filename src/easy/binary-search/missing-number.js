/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
 * 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

    示例 1:
    输入: [0,1,3]
    输出: 2

    示例 2:
    输入: [0,1,2,3,4,5,6,7,9]
    输出: 8

    链接：https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof
*/
/**
 * =============================
 * 二刷
*/
export const missingNumber = (nums) => {
    let n = nums.length;
    let l = 0;
    let r = n - 1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m === nums[m]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return l;

    // 无序的可以这样数学求和，有序的可以二分
    // let n = nums.length;
    // let sum = (1 + n) / 2 * n;
    // let sum2 = 0;
    // for (let num of nums) {
    //     sum2 += num;
    // }
    // return sum -sum2;
}

/**
 * =============================
 * 一刷
*/
export const missingNumber = (nums) => {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === m) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    // 注意 [0]  [0,1] 这种不缺的 case
    // return nums[l] ? nums[l] - 1 : nums[n-1] + 1;
    // 其实就是 l
    return l;
}
