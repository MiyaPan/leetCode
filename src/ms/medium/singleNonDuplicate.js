/**
 * 540. 有序数组中的单一元素
 * 给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

    示例 1:
    输入: [1,1,2,3,3,4,4,8,8]
    输出: 2
    
    示例 2:
    输入: [3,3,7,7,10,11,11]
    输出: 10
    注意: 您的方案应该在 O(log n)时间复杂度和 O(1)空间复杂度中运行。

    链接：https://leetcode-cn.com/problems/single-element-in-a-sorted-array
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// TODO: 可以三刷下玩玩,自己的思路很棒啊
/**
 * =============================
 * 二刷
*/
var singleNonDuplicate = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if ((m-1 < 0 || nums[m] !== nums[m-1]) && nums[m] !== nums[m+1]) return nums[m];
        if (m % 2 === 0) {
            if (nums[m] !== nums[m+1]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else {
            if (nums[m] !== nums[m-1]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
    }
}




















/**
 * =============================
 * 一刷
*/
var singleNonDuplicate = function(nums) {
    let len = nums.length;
    let l = 0;
    let r = nums.length - 1;
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m-1 < 0 || m+1 >=len || nums[m] !== nums[m+1] && nums[m] !== nums[m-1]) return nums[m];
        if (nums[m] === nums[m+1] && m%2 === 1 || nums[m] === nums[m-1] && m%2 === 0 ) r = m - 1;
        else l = m + 1;
    }
    // 上面的情况肯定会返回的，这里没用的，可以返回个false？-1吧，比较要求返回数组
    return -1;
};
// 傻了啊，o(logn) < o(n) 啊，所以下面的不行啊，看到 logn 还是得 二分啊
var singleNonDuplicate = function(nums) {
    let sum = 0;
    let diffSum = 0;
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        // 因为每次加的是后面的那个数，所以最后一个肯定要被加的，不用单独处理的
        // if (i === len-1) {
        //     if (nums[i] !== nums[i-1]) {
        //         diffSum += nums[i];
        //     }
        // } else 
        if (nums[i] !== nums[i+1]) {
            diffSum += nums[i];
        }
        sum += nums[i];
    }
    return diffSum * 2 - sum;
};
