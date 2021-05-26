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
// 进阶：

// 你可以设计时间复杂度为 O(n2) 的解决方案吗？
// 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export const lengthOfLIS1 = (nums) => {
    let n = nums.length;
    let dp = Array(n).fill(1);
    let max = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i-1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return max;
}
// o(nlogn): log(n) 根本不用怀疑二分，没别的算法，就用笔写写，看看规律，就能找到，别只用脑子不动笔啊
export const lengthOfLIS = (nums) => {
    let n = nums.length;
    // 那么 dp 的定义就完全不同了，dp 用来保存 长度为 len 的序列的末尾的数。也就是 dp 的索引才是序列长度，而值为尾数
    // 存尾数的时候要贪心，每次发现同长度的 更小的尾数，就记录这个更小的
    // 这样的 dp 肯定也是递增的
    // 这样就可以去这个 dp 里找 len 最大的，小于 nums[i] 的数
    let dp = [nums[0]];
    // let max = 0;
    for (let i = 1; i < n; i++) {
        let l = 0;
        let r = dp.length -1;
        while (l <= r) {
            let m = l + parseInt((r-l)/2);
            if (dp[m] < nums[i]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        // 这里不用 Math.min：如果 dp[l] > nums[i] 就该放，如果 dp[l] < nums[i]，会在二分中出不来，接着走
        dp[l] = nums[i];
    }
    // return max;
    return dp.length;
}







/**
 * =============================
 * 一刷
*/
export const lengthOfLIS11 = (nums) => {
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
export const lengthOfLIS12 = (nums) => {
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

