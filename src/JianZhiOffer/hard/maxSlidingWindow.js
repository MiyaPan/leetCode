/**
 * 剑指 Offer 59 - I. 滑动窗口的最大值
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
    示例:
    输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
    输出: [3,3,5,5,6,7] 
    解释: 

    滑动窗口的位置                最大值
    ---------------               -----
    [1  3  -1] -3  5  3  6  7       3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7

    提示：
    你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。
    注意：本题与主站 239 题相同：https://leetcode-cn.com/problems/sliding-window-maximum/
    链接：https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof
*/
// 单调队列 可解~
var maxSlidingWindow = function(nums, k) {
    if (k === 0) return [];
    let queue = [];
    let n = nums.length;
    let ans = [];
    // for (let i = 1-k, j = 0; i <= n-k-1 && j < n; i++, j++) {
    for (let i = 1-k, j = 0; i <= n-k && j < n; i++, j++) { // 也可以只用 j 判断的，为啥写两个，还容易出错
        // 什么时候开始要从队列里删数呢，从 i=1 开始，能达到 k 个窗口的并要删除的时候才开始就行
        // if (i-1 >= 0 && nums[i-1] === queue[0]) queue.shift();
        if (i > 0 && nums[i-1] === queue[0]) queue.shift();
        while (queue.length > 0 && queue[queue.length-1] < nums[j]) queue.pop();
        queue.push(nums[j]);
        if (i >= 0) {
            ans.push(queue[0]);
        }
    }
    return ans;
};
