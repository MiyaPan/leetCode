
/**
 * 698. 划分为k个相等的子集
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。

    示例 1：

    输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
    输出： True
    说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
     

    提示：
    1 <= k <= len(nums) <= 16
    0 < nums[i] < 10000

    链接：https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets
*/
// [10,10,10,7,7,7,7,7,7,6,6,6]
// 3 - true
// 不一定是两个数啊，是多个
export const canPartitionKSubsets = (nums, k) => {
    let sum = 0;
    let n = nums.length;
    nums.forEach(num => sum += num);

    if (sum % k !== 0) return false;
    let tar = sum / k;

    nums.sort((a,b) => b-a);

    if (nums[0] > tar) return false;

    let start = 0;
    while(start < n && nums[start] === tar) {
        start++;
        // 集合数量减一
        k--;
    }

    let group = Array(k).fill(0);
     
    const helper = (start) => {
        if (start >= n) return true;

        let num = nums[start];
        for (let i = 0; i < k; i++) {
            if (num + group[i] <= tar) {
                group[i] += num;
                // 得把所有数偶都放完且都是true，因为递归的退出条件就是 start > n
                if (helper(start+1)) return true;
                group[i] -= num;
            }

            // 当group[i]==0时说明此时该元素放入这个桶中失败了，而后面几个桶也为空放入同样失败，所以不用再遍历后面的几个桶，直接返回失败
            if (group[i] === 0) break;
        }

        return false;
    }

    return helper(start, nums, tar, group);
}
