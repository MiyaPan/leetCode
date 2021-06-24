/**
 * 剑指 Offer 51. 数组中的逆序对
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

    示例 1:
    输入: [7,5,6,4]
    输出: 5

    限制：
    0 <= 数组长度 <= 50000

    链接：https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof
*/
// 暴力肯定超时的呀，看大佬解法：https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/jian-zhi-offer-51-shu-zu-zhong-de-ni-xu-pvn2h/
// 在归并过程中计算
// 一般的，逆序对 和 归并 是息息相关的
var reversePairs = function(nums) {
    return mergeSort(nums, 0, nums.length-1);
};
function mergeSort(nums, left, right) {
    if (left >= right) return 0;
    let m = left + parseInt((right-left)/2);
    let lCount = mergeSort(nums, left, m);
    let rCount = mergeSort(nums, m+1, right);
    return merge(nums, left, right) + lCount + rCount;
}
function merge(nums, left, right) {
    // 啥啊 new 了这么大是数组再 push，要不就空数组 push，要不就 new 了用 index
    // let temp = Array(right-left+1);
    let temp = [];
    let m = left + parseInt((right-left)/2);
    let i = left;
    let j = m+1;
    let count = 0;
    while (i <= m && j <= right) {
        if (nums[i] <= nums[j]) {
            temp.push(nums[i++]);
        } else {
            temp.push(nums[j++]);
            count += m-i+1;
        }
    }
    while (i <= m) {
        temp.push(nums[i++]);
    }
    while (j <= right) {
        temp.push(nums[j++]);
    }
    // 最后记得用 temp 覆盖 nums
    // 索引错了！
    // for (let i = left; i <= right; i++) {
    for (let i = 0; i <= right-left; i++) {
        nums[left+i] = temp[i];
    }
    return count;
}
