/**
 * 238. 除自身以外数组的乘积
 * 给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，
 * 其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

    示例:
    输入: [1,2,3,4]
    输出: [24,12,8,6]

    提示：题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。

    说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

    进阶：
    你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

    链接：https://leetcode-cn.com/problems/product-of-array-except-self
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 卧槽，全凭题目里的前缀、后缀两个词给思路了
// 下面这个满足时间复杂度 o(n)了，空间还不是 o(1)，可以把 prefixProduct 和 suffixProduct 直接用 ans 数组存，边计算
var productExceptSelf = function(nums) {
    let len = nums.length;
    // 已知 n > 1
    let prefixProduct = [1, nums[0]];
    // 是这么声明的吗？？
    // let suffixProduct = [nums[len-1], 1];
    let suffixProduct = Array(len).fill(1);
    suffixProduct[len-2] = nums[len-1];
    for (let i = 2; i < len; i++) {
        prefixProduct[i] = prefixProduct[i-1] * nums[i-1];
    }
    for (let i = len-3; i >= 0; i--) {
        suffixProduct[i] = suffixProduct[i+1] * nums[i+1];
    }

    let ans = [];
    for (let i = 0; i < len; i++) {
        ans[i] = suffixProduct[i] * prefixProduct[i];
    }
    return ans;
};

// 空间 o(1)
var productExceptSelf = function(nums) {
    let len = nums.length;
    // 已知 n > 1
    // let prefixProduct = [1, nums[0]];
    let ans = [1, nums[0]];
    // for (let i = 2; i < len; i++) {
    //     prefixProduct[i] = prefixProduct[i-1] * nums[i-1];
    // }
    for (let i = 2; i < len; i++) {
        ans[i] = ans[i-1] * nums[i-1];
    }

    // let suffixProduct = Array(len).fill(1);
    // for (let i = len-3; i >= 0; i--) {
    //     suffixProduct[i] = suffixProduct[i+1] * nums[i+1];
    // }
    let suffix = 1;
    for (let i = len-2; i >= 0; i--) {
        suffix = suffix * nums[i+1];
        ans[i] = ans[i] * suffix;
    }

    return ans;
};
