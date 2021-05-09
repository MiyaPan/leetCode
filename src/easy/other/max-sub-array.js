/**
 * 53. 最大子序和
 * 
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例:
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 进阶:
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 * 链接: https://leetcode-cn.com/problems/maximum-subarray/
*/
/**
 * =============================
 * 二刷, done
*/
export const maxSubArray = (nums) => {
    let max = Number.MIN_SAFE_INTEGER;
    let preSum = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
        preSum = Math.max(nums[i], preSum + nums[i]);
        max = Math.max(max, preSum);
    }
    return max;
}

/**
 * =============================
 * 一刷
*/
// 1. 暴力求解：9.40%
export const maxSubArray = (nums) => {
    if (nums.length === 1) {
        return nums[0];
    }
    
    let max = nums[0];
    // let tempSum = nums[0];
    for(let i = 0; i<nums.length; i++) {
        // max = nums[i] > max ? nums[i] : max;                            
        let tempSum = 0;
        for(let j=i; j<nums.length; j++) {
            tempSum = tempSum + nums[j]; 
            max = tempSum > max ? tempSum : max;
        }
        // if (i === nums.length -1 && nums[nums.length -1] > max) {
        //     max = nums[i];
        // }
    }
    return max;
}

// 2. 分治
/**
 * 核心：对于数组 [1,2,3,-4,5,-6],最大子序列
 * a. 要么出现在左半边 [1,2,3]
 * b. 要么出现在左半边 [-4,5,-6]
 * c. 要么跨越 3 和 -4,这个时候从 3 向左累加，找到最大值，从 4 向右累加，找到最大值，这两部分相加就是跨越这种情况的最大值了
 * 取这 3 中情况的最大值就行了
*/
export const divideAndConquer = (nums) => {
    return _maxSubArray(0, nums.length-1, nums);
}

function _maxSubArray(left, right, nums) {
    if (left === right) {
        return nums[left];
    }

    // Math.round 导致爆栈了，当[0,1]的时候，mid 一直 = 1，会死循环
    // 像二分查找类似的，边界要仔细检查一下
    // const mid = Math.round((left + right) / 2);
    const mid = Math.trunc((left + right) / 2);

    /**
     * MIN_VALUE 是最接近0的正整数，即最小的正数，而不是最小的数！！！
    */
    // let lsum = Number.MIN_VALUE;
    // let rsum = Number.MIN_VALUE;
    let lsum = Number.MIN_SAFE_INTEGER;
    let rsum = Number.MIN_SAFE_INTEGER;
    let temp = 0;
    for(let i=mid; i >= left; i--) {
        temp += nums[i];
        lsum = temp > lsum ? temp : lsum;
    }

    temp = 0;
    for(let i= mid + 1; i <= right; i++) {
        temp += nums[i];
        rsum = temp > rsum ? temp : rsum;
    }

    const cross = lsum + rsum;

    const lpart = _maxSubArray(left, mid, nums);
    const rpart = _maxSubArray(mid + 1, right, nums);

    return Math.max(cross, lpart, rpart);
}

// 动态规划
// 解答：https://leetcode-cn.com/problems/maximum-subarray/solution/zheng-li-yi-xia-kan-de-dong-de-da-an-by-lizhiqiang/
// [-2,1,-3,4,-1,2,1,-5,4]
/**
 * 对于第 i 个元素，最大值就是以它结尾的数组的最大值，比如：
 * i = 1 时，最大值为： [-2,1],[1]中的最大值
 * i = 2 时，最大值为： [-2,1,-3],[1,-3]和[3]中的最大值
 * i = 2 时：是 i = 1 时的排列情况加上 [3] 这个元素，
 * 所以可以考虑：如果 i = i -1 的最大值 > 0,那当前的的最大值就是 i - 1 状态的最大值加上当前值，如果 < 0,就是 当前元素值，因为前面的最大值给到的是负增益
 * 
 * 状态转移方程：f(x) = {
 *      f(x-1) + nums[i], f(x-1) > 0
 *      nums[i], f(x-1) <= 0
 * }
 * 
 * 初始化条件：f(0) = nums[i]
 * 
*/
export const dynamicProgramming = (nums) => {

    let dp = [nums[0]];
    for(let i = 1; i < nums.length; i++) {
        dp[i] = dp[i-1] > 0 ? dp[i-1] + nums[i] : nums[i];
    }

    // 再遍历一遍 dp 数组找出最大值
    let max = 0;
    for (let i = 0; i < dp.length; i++) {
        max = dp[i] > max ? dp[i] : max;
    }

    return max;
}

// 两遍for循环可以一起做，这也就是官方说的贪心算法了
export const dynamicProgramming2 = (nums) => {

    let dp = [nums[0]];
    let max = nums[0];
    for(let i = 1; i < nums.length; i++) {
        dp[i] = dp[i-1] > 0 ? dp[i-1] + nums[i] : nums[i];
        max = dp[i] > max ? dp[i] : max
    }

    // 再遍历一遍 dp 数组找出最大值
    // let max = 0;
    // for (let i = 0; i < dp.length; i++) {
    //     max = dp[i] > max ? dp[i] : max;
    // }

    return max;
}

export const maxSubArray_2 = (nums) => {
    if (!nums.length) return 0;
    let dp = [nums[0]]
    let max = nums[0];
    for (let i = 1; i < nums.length; i++){
        dp[i] = Math.max(dp[i-1]+nums[i], nums[i]);
        // 因为数组有负数，所以不能直接取 dp[nums.length-1]，像 rob 和 massage 的问题，讨论的都是正收益，中间不会降低，所以可以直接取 dp 最后一个
        if (dp[i] > max) max = dp[i];
    }

    return max;
};


// export const maxSubArray_3 = (nums) => {
//     if (!nums.length) return 0;
//     let max = nums[0];
//     let maxPos = 0;
//     for (let i = 1; i < nums.length; i++){
//         let max2Cur = 0;
//         for (let j = maxPos; j<= i; j++) {
//             max2Cur += nums[j];
//         }
//         if (max2Cur > max) {
//             max = max2Cur;
//         }
//         if (max < nums[i]) {
//             max = nums[i];
//             maxPos = i;
//         }
//     }

//     return max;
// };
