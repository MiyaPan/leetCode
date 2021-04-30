/**
 * 31. 下一个排列
 * 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
    如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
    必须 原地 修改，只允许使用额外常数空间。

    示例 1：
    输入：nums = [1,2,3]
    输出：[1,3,2]
    
    示例 2：
    输入：nums = [3,2,1]
    输出：[1,2,3]
    
    示例 3：
    输入：nums = [1,1,5]
    输出：[1,5,1]
    
    示例 4：
    输入：nums = [1]
    输出：[1]

    提示：
    1 <= nums.length <= 100
    0 <= nums[i] <= 100

    题干的意思是：找出这个数组排序出的所有数中，刚好 比当前数大的那个数
    比如当前 nums = [1,2,3]。这个数是123，找出1，2，3这3个数字排序可能的所有数，排序后，比123大的那个数 也就是132
    如果当前 nums = [3,2,1]。这就是1，2，3所有排序中最大的那个数，那么就返回1，2，3排序后所有数中最小的那个，也就是1，2，3 -> [1,2,3]

    链接：https://leetcode-cn.com/problems/next-permutation
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 思路：和答案一样的，大哥你能不能好好仔细做
// 1. 从后向前找到最靠前的一个使数列下降的元素，把这个元素和 它后面的第一个比它大的元素交换，然后把它 后面这些组成最小的数字，字典顺序sort就行？
// 2. 如果没找到下降的元素，即整个数列从前到后是单减的，逆序返回
// 我靠，被评论带跑了，，，，，，题目就按照字典序排，不用看数字的组合之后值的大小，，，最下面 nextPermutation1 那个是按照值大小排的，
// 区别就是 compare 函数，如果按照真实值大小就得按照 compare 做，字典就简单啦，比较就行了，一口老血，不看清出题目，，，

// 字典顺序：
// 在英文字典中，排列单词的顺序是先按照第一个字母以升序排列（即a、b、c……z 的顺序）；
// 如果第一个字母一样，那么比较第二个、第三个乃至后面的字母。 
// 如果比到最后两个单词不一样长（比如，sigh 和sight），那么把短者排在前。
// 那么字典和数字比较其实是一样的
export var nextPermutation = function(nums) {
    let len = nums.length;
    let loc = -1;
    for (let i = len-2; i >= 0; i--) {
        if (nums[i] < nums[i+1]) {
            loc = i;
            break;
        }
    }

    if (loc === -1) {
        // 没找到，数列是单减的，逆序输出，这个能单纯的逆序吗，存在两位数？能，按照规则前面的  isSmall 都确定好了
        // 但不应该是 sort，而是真的逆序
        // nums.sort((a,b) => a-b);
        nums.reverse();
    } else {
        let loc2 = -1;
        for (let i = len-1; i > loc; i--) {
            if (nums[i] > nums[loc]) {
                loc2 = i;
                break;
            }
        }
        swap(nums, loc, loc2);

        reverse(nums, loc+1, len-1);
    }

    return nums;
};

// 仔细看下是怎么找到 loc 的，数列本身是有规律的，并不需求完全的重新排列！！这些"隐藏点"要敏感！
// 具体来说，loc2 后面的肯定都比 交换的数小，loc2 前面的都比它大，其实就是个逆序嘛！再逆回来就好了啊
// 对两位数和一位数混合的成立吗？[1,13] 应该选 113，[4,43] 应该选 434，而不是 443，所以重点就落在了比较大小这个函数上，包括第一个 for 也要用这个比较
// 用了 isSmall(nums, i, j) 之后其实就惟一的确定了顺序，这里就不用判断了，单纯逆序就行
function reverse(nums, start, end) {
    let mid = start + parseInt((end-start)/2);
    let isOdd = (end-start+1) % 2 === 0;
    for (let i = start; i <= mid; i++) {
        let swapIdx = isOdd ? mid + (mid-i+1) : mid + (mid-i);
        swap(nums, i, swapIdx);
    }
}
// [1,13] 应该选 113，[4,43] 应该选 434，而不是 443
// 怎么比较呢，按真实脑子想的算，如果把 4 放前面就是把 4 放大了 100倍，就是 10 的 (43).length
function isSmall(nums, i, j) {
    let n1 = nums[i];
    let n2 = nums[j];
    let len1 = (n1 + '').length;
    let len2 = (n2 + '').length;
    return (n1 * Math.pow(10, len2) + n2) < (n2 * Math.pow(10, len1) + n1);
}

function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

export var nextPermutation1 = function(nums) {
    let len = nums.length;
    let loc = -1;
    for (let i = len-2; i >= 0; i--) {
        if (isSmall(nums, i, i+1)) {
            loc = i;
            break;
        }
    }

    if (loc === -1) {
        // 没找到，数列是单减的，逆序输出，这个能单纯的逆序吗，存在两位数？能，按照规则前面的  isSmall 都确定好了
        // 但不应该是 sort，而是真的逆序
        // nums.sort((a,b) => a-b);
        nums.reverse();
    } else {
        let loc2 = -1;
        for (let i = len-1; i > loc; i--) {
            if (isSmall(nums, loc, i)) {
                loc2 = i;
                break;
            }
        }
        swap(nums, loc, loc2);

        reverse(nums, loc+1, len-1);
    }

    return nums;
};
