// 35. 搜索插入位置
/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 你可以假设数组中无重复元素。
 * 例子见spec文件。
 */
// 执行用时 : 72 ms，击败了 35.6%
export const searchInsert = (nums, target) => {
    if (nums.length === 0 || target <= nums[0]) {
        return 0;
    }

    for(let i = 1; i< nums.length; i++) {
        if (target <= nums[i]) {
            return i;
        }
    }

    return nums.length;

}

// 这么简单，肯定考提高效率
// 二分法 86.6%
export const searchInsert1 = (nums, target) => {
    if (nums.length === 0 || target <= nums[0]) {
        return 0;
    }

    let left = 0;
    let right = nums.length - 1;
    
    while(left < right) {
        let mid = Math.floor((right + left) / 2);

        if (target == nums[mid]) {
            return mid
        }

        if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    if (target <= nums[left]) {
        return left;
    } else {
        return left +1;
    }
}
