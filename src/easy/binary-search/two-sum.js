/**
 * 167. 两数之和 II - 输入有序数组
 * 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

    函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

    说明:

    返回的下标值（index1 和 index2）不是从零开始的。
    你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
    示例:

    输入: numbers = [2, 7, 11, 15], target = 9
    输出: [1,2]
    解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

    链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
*/
// 双指针法。
// 头尾相加，如果小于 target，左边向后移，大于则右边指针向前移
export const twoSum = (numbers, target) => {
    let i = 0;
    let j = numbers.length-1;

    while(i < j) {
        if (numbers[i] + numbers[j] === target) {
            return [i+1, j+1];
        } else if (numbers[i] + numbers[j] < target) {
            i++;
        } else {
            j--;
        }
    }
    return [];
}

// 二分。为啥用二分，因为数组是有序的！
// 要找两个，二分是找一个。那就固定一个，用二分找另一个
export const twoSum = (numbers, target) => {
    let n = numbers.length;
    for (let i = 0; i < n; i++) {
        let other = target - numbers[i];
        let l = i+1;
        let r = n-1;
        while(l <= r) {
            let mid = Math.trunc((l+r) / 2);
            if (numbers[mid] === other) {
                return [i+1, mid+1];
            } else if (numbers[mid] < other) {
                l = mid + 1;
            } else {
                r = mid -1;
            }
        }
    }
    return [];
}
