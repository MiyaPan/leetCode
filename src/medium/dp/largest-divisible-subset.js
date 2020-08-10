/**
 * 368. 最大整除子集
 * https://leetcode-cn.com/problems/largest-divisible-subset/
 * 给出一个由无重复的正整数组成的集合，找出其中最大的整除子集，子集中任意一对 (Si，Sj) 都要满足：Si % Sj = 0 或 Sj % Si = 0。
    如果有多个目标子集，返回其中任何一个均可。

    示例 1:

    输入: [1,2,3]
    输出: [1,2] (当然, [1,3] 也正确)

    示例 2:

    输入: [1,2,4,8]
    输出: [1,2,4,8]
*/
// 思路：先排序，一次遍历，如果当前数字能拼在之前的队列上，就拼上，长度+1，记下最后一个的值
export const largestDivisibleSubset = (nums) => {
    if (nums.length === 0) return [];
    if (nums.length === 0) return nums[0];

    let dp = Array(nums.length).fill(1); // 单个数字就是 1
    // let last = Array(nums.length).fill(0); // 不能用 0 啊，用 0，最后一个for 循环输出的时候都会指向 0，结束不了了
    let last = Array(nums.length).fill(-1); // 给的是正整数
    let maxlen = 0;
    let end = 0;

    nums.sort((a,b) => a-b);

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            // dp[i] < dp[j] 控制进 for 循环的次数，只有发现更长才进，数组无重复已知
            if (nums[i] % nums[j] === 0 && dp[i] <= dp[j]) {
                dp[i] = dp[j] + 1;
                // 为了最后输出数组的时候寻址
                last[i] = j;
            }
        }

        if (dp[i] > maxlen) {
            maxlen = dp[i];
            end = i;
        }
    }

    let result = [];
    for (let i = end; i >= 0;) {
        result.unshift(nums[i]);
        i = last[i];
    }

    return result;
}