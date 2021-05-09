/**
 * 27. 移除元素
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
*/
/**
 * =============================
 * 二刷, done
*/
// 执行用时 : 60 ms，击败了 90.13%
export const removeElement = (nums, val) => {
    let loc = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[loc++] = nums[i];
        }
    }

    return loc;
}

// 官方题解2：当目标元素很少时，可以不少挨个左移元素，而是把最后一个挪过来，loc 后面的不动，就省了移除的消耗
// 见 https://leetcode-cn.com/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode/
