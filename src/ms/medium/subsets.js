/**
 * 78. 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
    解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

    示例 1：
    输入：nums = [1,2,3]
    输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
    
    示例 2：
    输入：nums = [0]
    输出：[[],[0]]

    提示：
    1 <= nums.length <= 10
    -10 <= nums[i] <= 10
    nums 中的所有元素 互不相同

    链接：https://leetcode-cn.com/problems/subsets
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// TODO: 可以三刷下
/**
 * =============================
 * 二刷
*/
var subsets = function(nums) {
    let ans = [[]];
    let path = [];
    dfs(nums, 0, path, ans);
    return ans;
}
function dfs(nums, start, path, ans) {
    let n = nums.length;
    for (let i = start; i < n; i++) {
        path.push(nums[i]);
        ans.push([...path]);
        dfs(nums, i+1, path, ans);
        path.pop();
    }
}
















/**
 * =============================
 * 一刷
*/
var subsets = function(nums) {
    let len = nums.length;
    let result = [[]];
    for (let i = 0; i < len; i++) {
        let cur = nums[i];
        let k = result.length;
        for (let j = 0; j < k; j++) {
            result.push(result[j].concat(cur));
        }
    }
    return result;
};
