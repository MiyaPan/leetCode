// 执行用时 : 60 ms，击败了 99.93%
// 内存消耗 : 36.7 MB, 击败了 85.74%
export const removeDuplicates = (nums) => {
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return 1;
    }


    let loc = 1;
    // count 就是 loc 呀
    // let count = 1;
    // current 其实就是 nums[loc-1] 呀，重复了
    // let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // if (current !== nums[i]) {
        if (nums[loc - 1] !== nums[i]) {
            nums[loc++] = nums[i];
            // current = nums[i];
            // count += 1;
        }
    }

    // return count;
    return loc;
}

// 最初版本代码
var removeDuplicates = function(nums) {
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return 1;
    }


    let loc = 1;
    let count = 1;
    let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (current !== nums[i]) {
            nums[loc++] = nums[i];
            current = nums[i];
            count += 1;
        }
    }

    return count;
};