/**
 * 209. 长度最小的子数组
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。
 * 如果不存在符合条件的子数组，返回 0。

    示例：
    输入：s = 7, nums = [2,3,1,2,4,3]
    输出：2
    解释：子数组 [4,3] 是该条件下的长度最小的子数组。

    进阶：
    如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。【别问，问就是锻炼思路】

    链接：https://leetcode-cn.com/problems/minimum-size-subarray-sum
*/
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
// 双指针
var minSubArrayLen = function(s, nums) {
    let n = nums.length;
    if (n === 0) return 0;

    let start = 0;
    let end = 0;
    let sum = 0;
    let ans = Number.MAX_SAFE_INTEGER;
    while(end < n) {
        sum += nums[end];
        while(sum >= s) {
            sum -= nums[start];
            ans = Math.min(ans, end- start+1);
            start++;
        }
        end++;
    }

    return ans === Number.MAX_SAFE_INTEGER ? 0 : ans;
};

// o(nlogn) 的部分使用二分的方法
var minSubArrayLen = function(s, nums) {
    let n = nums.length;
    if (n === 0) return 0;

    // 加个边界 0，为了二分查找，区间为全部的时候不出错
    let sums = [0];
    for (let i = 1; i <= n; i++) {
        sums[i] = nums[i-1] + sums[i-1];
    }
    
    let ans = Number.MAX_SAFE_INTEGER;
    // 遍历合，找到中间那轱辘合 >= s 的
    for (let i = 1; i <= n; i++) {
        let bound = binarySearch(sums, 0, i, s);
        if (bound !== -1) {
            ans = Math.min(ans, i - bound);
        }
    }

    return ans === Number.MAX_SAFE_INTEGER ? 0 : ans;
};

// [1,2,3,4,5]，15 要输出 5，所以 sums 前面要加个 0
// 在 [l, r] 区间上找：sums[j] - sums[i] 大于等于 s 的最大值
function binarySearch(sums,l, r, target) {
    if (l > r) return -1;
    let cur = sums[r];
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (cur - sums[m] === target) return m;
        if (cur - sums[m] > target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return cur - sums[r] > target ? r : -1;
}

// 动态规划，超长的最后一个 case 溢出，因为复杂度 o(n^2)
var minSubArrayLen = function(s, nums) {
    let n = nums.length;
    if (n === 0) return 0;

    let dp = Array(n).fill(null).map(_ => Array(n).fill(0));
    let ans = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (nums[j] >= s) return 1;
            if (i === j) {
                dp[i][j] = nums[i];
                continue;
            }
            dp[i][j] = dp[i][j-1] + nums[j];
            if (dp[i][j] >= s) {
                ans = Math.min(ans, j-i+1);
            }
        }
    }

    return ans === Number.MAX_SAFE_INTEGER ? 0 : ans;
};
