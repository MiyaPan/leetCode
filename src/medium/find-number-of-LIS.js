/**
 * 673. 最长递增子序列的个数
 * 给定一个未排序的整数数组，找到最长递增子序列的个数。

    示例 1:
    输入: [1,3,5,4,7]
    输出: 2
    解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。

    示例 2:
    输入: [2,2,2,2,2]
    输出: 5
    解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
    注意: 给定的数组长度不超过 2000 并且结果一定是32位有符号整数。

    链接：https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence
*/
// TODO: 三刷！！！

// [1,2,4,3,5,4,7,2] : 3
/**
 * =============================
 * 二刷
*/
export const findNumberOfLIS = (nums) => {
    let n = nums.length;
    let dp = Array(n).fill(1);
    let counts = Array(n).fill(1);
    let max = 1;
    for (let i = 1; i < n; i++) {
        // let tempMax = 0;
        // // 找到前面符合条件的的最大值
        // for (let j = 0; j < i; j++) {
        //     if (nums[j] < nums[i]) {
        //         tempMax = Math.max(tempMax, dp[j]);
        //     }
        // }
        // // 记录种类数
        // let maxCount = 0;
        // for (let j = 0; j < i; j++) {
        //     // dp 得记录可能的种类数，可以用多个数组啊
        //     if (dp[j] === tempMax) {
        //         maxCount += counts[j];
        //     }
        // }
        // dp[i] = tempMax+1;

        // if (maxCount === 0) {
        //     counts[i] = 1;
        // } else {
        //     counts[i] = maxCount;
        // }

        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    counts[i] = counts[j];
                } else if (dp[j] + 1 === dp[i]) {
                    counts[i] += counts[j];
                }
            }
        }

        max = Math.max(max, dp[i]);
    }
    console.log(counts)
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === max) {
            count += counts[i];
        }
    }
    return count;
}


















/**
 * =============================
 * 1 刷
*/
export const findNumberOfLIS = (nums) => {
    let n = nums.length;
    let dp = Array(n).fill(1);
    let count = Array(n).fill(1);
    // let max = 1;

    for (let i = 1; i < n; i++) {
        // max = 1;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // 改了 dp 再判断，傻子吗！！！
                // 用 更新的 dp 判断，只要更新为最大值一次，后面都是最大值，每次都进 if 不对，不能用 更新后的 dp 判断
                // 得用当前的 dp[j] + 1 判断
                // dp[i] = Math.max(dp[i], dp[j] + 1);
                // if (dp[i] === max) {
                //     count[i] += count[j];
                // }
                // if (dp[i] > max) {
                //     max = dp[i];
                //     count[i] = count[j];
                // }
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j];
                } else if (dp[j] + 1 === dp[i]) {
                    count[i] += count[j];
                }
            }
        }
    }

    // max = 1;
    let max = 1;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === max) {
            ans += count[i];
        }
        if (dp[i] > max) {
            max = dp[i];
            ans = count[i];
        }
    }

    return ans;
}
