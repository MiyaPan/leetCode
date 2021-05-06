/**
 * 27. 移除元素
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例 1：
    输入：nums = [3,2,2,3], val = 3
    输出：2, nums = [2,2]
    解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
    
    示例 2：
    输入：nums = [0,1,2,2,3,0,4,2], val = 2
    输出：5, nums = [0,1,4,0,3]
    解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。

    提示：
    0 <= nums.length <= 100
    0 <= nums[i] <= 50
    0 <= val <= 100

    链接：https://leetcode-cn.com/problems/remove-element
*/
/**
 * =============================
 * 二刷
*/
export const removeElement = (nums, val) => {
    let p = 0;
    let i = 0;
    while (i < nums.length) {
        while (nums[i] === val) {
            i++;
        }
        if (i < nums.length) {
            nums[p++] = nums[i++];
        }
    }
    return p;
}

/**
 * =============================
 * 一刷
*/
// 执行用时 : 60 ms，击败了 90.13%
export const removeElement = (nums, val) => {
    let p = 0;
    let q = nums.length - 1;
    while(p <= q) {
        if (nums[p] === val) {
            while(nums[q] === val) {
                q--;
            }
            if (q < p) return q + 1;
            nums[p++] = nums[q--];
        } else {
            p++;
        }
    }
    return q + 1;
}

// 官方题解2：当目标元素很少时，可以不少挨个左移元素，而是把最后一个挪过来，loc 后面的不动，就省了移除的消耗
// 见 https://leetcode-cn.com/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode/
