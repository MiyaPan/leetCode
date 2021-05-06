/**
 * 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
    示例:
    输入: [0,1,0,3,12]
    输出: [1,3,12,0,0]

    说明:
    必须在原数组上操作，不能拷贝额外的数组。
    尽量减少操作次数。

    链接：https://leetcode-cn.com/problems/move-zeroes
*/
/**
 * =============================
 * 二刷
*/
export var moveZeroes = function(nums) {
    let n = nums.length;
    let p = 0;
    // [1]
    for (let i = 0; i < n; i++) {
        if (nums[i] !== 0) {
            nums[p++] = nums[i];
            // 不要在这里置 0，这样的话，如果数组中没有 0 ，就全置 0 了，可以最后从 p 开始统一刷一下
            // nums[i] = 0;
        }
    }
    for (let i = p; i < n; i++) {
        nums[i] = 0;
    }
};

/**
 * =============================
 * 一刷
*/
export var moveZeroes = function(nums) {
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        if (nums[i] === 0) {
            let j = i + 1;
            while(j < len) {
                if (nums[j] !== 0) {
                    nums[i] = nums[j];
                    nums[j] = 0;
                    break;
                } else {
                    j++;
                }
            }
        }
    }
    return nums;
};
