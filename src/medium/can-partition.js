/**
 * 416. 分割等和子集
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

    注意:
    每个数组中的元素不会超过 100
    数组的大小不会超过 200

    示例 1:

    输入: [1, 5, 11, 5]
    输出: true
    解释: 数组可以分割成 [1, 5, 5] 和 [11].
     
    示例 2:

    输入: [1, 2, 3, 5]
    输出: false
    解释: 数组不能分割成两个元素和相等的子集.
*/
// 相等！ 就等于求一半，也就是给定数组，找出能不能拼出 一半的 coins！
// 因为数组元素不复用，所以是 0-1 问题的变形，所以 nums 放在外，逆序？
export const canPartition = (nums) => {
    if(nums.length < 2) return false;

    let sum = 0;
    nums.forEach(num => {
        sum += num; 
    });
    if (sum % 2 !== 0) return false;

    nums.sort((a,b) => a-b);

    let tar = sum / 2;
    let dp = Array(nums.length+1).fill(null).map(_ => []);
    for (let i = 1; i <= nums.length; i++) {
        if(nums[i-1] === tar) return true;
        dp[i] = dp[i].concat(dp[i-1]);
        dp[i].push(nums[i-1]);
        for (let j = 0; j < dp[i-1].length; j++) {
            let newNum = nums[i-1] + dp[i-1][j];
            if (newNum === tar) return true;

            if (!dp[i].includes(newNum)) {
                dp[i].push(newNum);
            }
        }
    }

    return false;
}
