/**
 * 300. 最长上升子序列
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
*/

// 给定一个无序的整数数组，找到其中最长上升子序列的长度。

// 示例:

// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4 
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。

// 说明:
// 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
// 你算法的时间复杂度应该为 O(n^2) 。

export const lengthOfLIS = (nums) => {
    if (nums.length < 2) return nums.length;
    let dp = [1];
    let max = 0;

    for (let i = 1; i < nums.length; i++) {
        // 一个数组是 1，不是 0，不然出现第二个的时候 0+1 = 1 就不对了，应该是 1+1 = 2；跑一下就知道，正好少 1
        // dp[i] = 0;
        dp[i] = 1;
        // 倒着找第一个比它小的，取 dp 值
        for (let j = i-1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[j]+1, dp[i]);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return max;
}

var lengthOfLIS = function(nums) {
    if (nums.length < 2) return nums.length;
    let dp = Array(nums.length).fill(1);
    let max = 0;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[j] + 1, dp[i]);
            }
        }
        max = Math.max(max, dp[i]);
    }

    return max;
};

// 带贪心的动态规划+二分
// https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-dong-tai-gui-hua-2/
export const lengthOfLIS1 = (nums) => {
    if (nums.length < 2) return nums.length;
    let dp = new Array(nums.length);;
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        let left = 0;
        let right = max;
        while(left < right) {
            let mid = (left+right) >> 1;
            if (dp[mid] < nums[i]) left = mid + 1;
            else right = mid;
        }
        dp[left] =nums[i];
        if (max === right) max++;
    }

    return max;
}

var lengthOfLIS = function(nums) {
    let n = nums.length;
    if(n <= 1){
        return n;
    }
    let tail = new Array(n);
    let end = 0;
    for(let i = 0;i < n;i++){
        let left = 0;
        let right = end;
        while(left < right){
            let mid = (left + right) >> 1;
            if(tail[mid] < nums[i]){
                left = mid + 1;
            }else{
                right = mid;
            }
        }
        tail[left] = nums[i];
        end == right && end++
    }
    return end;
};

