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

    进阶：你可以实现时间复杂度为 O(logN) 的解决方案吗？

    链接：https://leetcode-cn.com/problems/find-peak-element
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// TODO: 三刷一下也行
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
        if (m+1 >= n || l === r) return m;
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
// 啧啧啧，看了答案思路还写了个屎，答案的线性搜索都比你强，，，
var findPeakElement = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        // 【1】
        // [1,2]
        let m = l + parseInt((r-l)/2);
        if (m-1 < 0 && m+1 >= n) {
            return m;
        } else if (m-1 < 0) {
            // 来到这的肯定 l= 0，r = 1
            return nums[m] > nums[m+1] ? m : m+1;
        } else if (m+1 >= n) {
            // 来到这的肯定是末尾两个
            return nums[m] > nums[m-1] ? m : m-1;
        } else if (nums[m] > nums[m-1] && nums[m] > nums[m+1]) {
            return m;
        } else if (nums[m] > nums[m-1] && nums[m+1] > nums[m]) {
            l = m + 1;
        } else if (nums[m] < nums[m-1] && nums[m+1] < nums[m]) {
            r = m - 1;
        } else if (nums[m] < nums[m-1] && nums[m] < nums[m+1]) {
            // 这种情况向左向右都能有峰值
            l = m + 1;
        }
    }
};

// 看看人家答案，都不用比 3 个啊，比 2 数就足够了啊
var findPeakElement = function(nums) {
    let n = nums.length;
    nums.push(Number.MIN_SAFE_INTEGER);
    let l = 0;
    let r = n-1;
    while (l <= r) {
        // 【1】
        // [1,2]
        if (l === r) return l;
        let m = l + parseInt((r-l)/2);
        // push 了一个守卫，就能放心和 m+1 比了
        if (nums[m] < nums[m+1]) {
            l = m + 1;
        } else {
            r = m;
        }
    }
};

// 再看看答案写的。。。
var findPeakElement = function(nums) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        if (l === r) return l;
        let m = l + parseInt((r-l)/2);
        // 这里人家为啥不 push 守卫？因为 nums[m+1] 为空的情况，肯定是 l == r == m 过来的，这种情况在上面的 if 就走了
        if (nums[m] > nums[m+1]) {
            r = m;
        } else {
            l = m + 1;
        }
    }
};
