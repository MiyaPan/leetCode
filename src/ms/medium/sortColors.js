/**
 * 75. 颜色分类
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
    此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

    注意:不能使用代码库中的排序函数来解决这道题。

    示例:
    输入: [2,0,2,1,1,0]
    输出: [0,0,1,1,2,2]
    
    进阶：
    一个直观的解决方案是使用计数排序的两趟扫描算法。
    首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
    你能想出一个仅使用常数空间的一趟扫描算法吗？
    链接：https://leetcode-cn.com/problems/sort-colors
*/
// TODO: 绝对三刷!!!!
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * =============================
 * 二刷
*/
var sortColors = function(nums) {
    let n = nums.length;
    let i = 0;
    let p0 = 0;
    let p2 = n-1;
    while (i <= p2) {
        // if (nums[i] === 2) {
        // while (nums[i] === 2) {
        while (i <= p2 && nums[i] === 2) {
            swap(nums, i, p2);
            p2--;
        }
        if (nums[i] === 0) {
            swap(nums, i, p0);
            p0++;
        }
        i++;
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
























/**
 * =============================
 * 一刷
*/
// i j 可以独立于数组遍历的指针之外啊啊啊！！！本身和本身也换，就能避免处理很多case
// 思路 p0 指向 0 的位置，从左边开始，找到一个 0 就和 p0 交换并增加 p0，p2 从右边开始，碰到 2 就换到 p2 的位置
var sortColors = function(nums) {
    let p0 = 0;
    let p2 = nums.length - 1;
    for(let i = 0; i < nums.length, i <= p2; i++) {
        // 2 1 2
        // if (nums[i] === 2) {
        //     let temp = nums[p2];
        //     nums[p2] = nums[i];
        //     nums[i] = temp;
        //     p2--;
        // }
        while(i <= p2 && nums[i] === 2) {
            let temp = nums[p2];
            nums[p2] = nums[i];
            nums[i] = temp;
            p2--;
        }
        if (nums[i] === 0) {
            let temp = nums[p0];
            nums[p0] = nums[i];
            nums[i] = temp;
            p0++;
        }
    }
};
