/**
 * 46. 全排列
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 示例:
    输入: [1,2,3]
    输出:
    [
    [1,2,3],
    [1,3,2],
    [2,1,3],
    [2,3,1],
    [3,1,2],
    [3,2,1]
    ]

    链接：https://leetcode-cn.com/problems/permutations
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 这个题就是返回值格式细节和递归出口的细节问题。
export var permute = function(nums) {
    let len = nums.length;
    if (len === 1) return [nums];
    let stack = [];
    for (let i = 0; i < len; i++) {
        let arr = nums.slice(0,i).concat(nums.slice(i+1));
        const subPermute = permute(arr);
        subPermute.forEach(item => {
            stack.push([nums[i]].concat(item));
        })
    }

    return stack;
};
