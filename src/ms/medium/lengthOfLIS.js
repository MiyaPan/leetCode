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
    let n = nums.length;
    if (n <= 1) return n;
    let dp = Array(n).fill(1);
    // dp[n-1] 也不一定是最大哦，因为最后一个数可能很小，还不如前面的
    let max = 1;
    // 这里是不是从 0 开始，就得记得在前面处理 小于 1 的情况
    for (let i = 1; i < n; i++) {
        // 有可能存在多个比 i 小的，但是前面的更大
        for (let j = i-1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }

    return max;
}

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

var lengthOfLIS2 = function(nums) {
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

