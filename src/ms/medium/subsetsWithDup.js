/**
 * 90. 子集 II
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
    解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

    示例 1：
    输入：nums = [1,2,2]
    输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
    
    示例 2：
    输入：nums = [0]
    输出：[[],[0]]

    提示：
    1 <= nums.length <= 10
    -10 <= nums[i] <= 10

    链接：https://leetcode-cn.com/problems/subsets-ii
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 这个思路主要参考了自己 78. 子集 的思路，
// 最开始想到的是递归，其实递归也行的唉！在仔细想一下就行了唉，看二刷用了啥思路吧，二刷要是先想到了画树递归，那一定要做会
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a-b);
    let ans = [[]];
    let pre = [[]];

    for (let i = 0; i < nums.length; i++) {
        let cur = [];
        if (nums[i] === nums[i-1]) {
            for (let j = 0; j < pre.length; j++) {
                cur.push(pre[j].concat(nums[i]));
            }
        } else {
            for (let j = 0; j < ans.length; j++) {
                cur.push(ans[j].concat(nums[i]));
            }
        }
        pre = cur;
        ans = ans.concat(cur);
    }
    return ans;
};
