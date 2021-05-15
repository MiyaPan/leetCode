/**
 * 162. 寻找峰值
 * 峰值元素是指其值大于左右相邻值的元素。
    给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。
    数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。

    你可以假设 nums[-1] = nums[n] = -∞。

    示例 1:
    输入: nums = [1,2,3,1]
    输出: 2
    解释: 3 是峰值元素，你的函数应该返回其索引 2。

    示例 2:
    输入: nums = [1,2,1,3,5,6,4]
    输出: 1 或 5 
    解释: 你的函数可以返回索引 1，其峰值元素为 2；
         或者返回索引 5， 其峰值元素为 6。

    链接：https://leetcode-cn.com/problems/find-peak-element
*/
/**
 * =============================
 * 二刷
*/
var findPeakElement = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n - 1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m+1 >= n || l === r) {
            return m;
        }
        if (nums[m] < nums[m+1]) {
            l = m + 1;
        } else {
            r = m;
        }
    }
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    nums.push(Number.MIN_SAFE_INTEGER);
    return helper(0, nums.length-1, nums)
};

function helper(l, r, nums) {
    if (l > r) return -1;
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m === 0 && nums[m] > nums[m+1]) return m;
        if (m === nums.length && nums[m] > nums[m-1]) return m;
        if (nums[m] > nums[m+1] && nums[m] > nums[m-1]) {
            return m;
        }
        let left = helper(l, m-1, nums);
        if (left !== -1) {
            return left;
        } else {
            return helper(m+1, r, nums);
        }
    }
}

// https://leetcode-cn.com/problems/find-peak-element/solution/xun-zhao-feng-zhi-by-leetcode/
// 答案思路：其实我们是可以判断在哪一部分的，如果 i+1 比 i 小，那峰值一定在 [l, i] 中，如果 i+1 比 i 大，那峰值一定在 [i+1, r] 中，
// 关键就因为我们只需要找到任意个一个峰值就可以！而不需要找最大的峰值。
var findPeakElement = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        if (l === r) return l;
        let m = l + parseInt((r-l)/2);
        if (nums[m] > nums[m+1]) {
            r = m;
        } else {
            l = m + 1;
        }
    }
};