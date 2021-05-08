/**
 * 面试题 08.03. 魔术索引
 * 魔术索引。 在数组A[0...n-1]中，有所谓的魔术索引，满足条件A[i] = i。给定一个有序整数数组，
 * 编写一种方法找出魔术索引，若有的话，在数组A中找出一个魔术索引，如果没有，则返回-1。若有多个魔术索引，返回索引值最小的一个。

    示例1:
    输入：nums = [0, 2, 3, 4, 5]
    输出：0
    说明: 0下标的元素为0

    示例2:
    输入：nums = [1, 1, 1]
    输出：1
    说明:

    nums长度在[1, 1000000]之间
    此题为原书中的 Follow-up，即数组中可能包含重复元素的版本

    链接：https://leetcode-cn.com/problems/magic-index-lcci
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export const findMagicIndex = (nums) => {
    return helper(0, nums.length-1, nums);
}
function helper(l, r, nums) {
    if (l > r) return -1;

    let m = l + parseInt((r-l)/2);

    // 看左边
    let left = -1;
    if (nums[m] < m) {
        left = helper(l, nums[m], nums);
    } else {
        left = helper(l, m-1, nums);
    }
    if (left !== -1) return left;

    // 看中间
    if (nums[m] === m) return m;

    // 看右边
    let right = -1;
    if (nums[m] > m) {
        right = helper(nums[m], r, nums);
    } else {
        right = helper(m+1, r, nums);
    }
    return right;
}

/**
 * =============================
 * 一刷
*/
// https://leetcode-cn.com/problems/magic-index-lcci/solution/zheng-que-de-ologn-er-fen-fa-by-user83429423/
// 因为不是严格递增，即有重复元素的，所以并不能一下舍弃一半，只能找办法提高效率，但是达不到一半
export const findMagicIndex = (nums) => {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    
    return helper(l, r, nums);
}

// 通过了，但是还可优化，就是当判断 left 和 right 的时候，再缩小一点范围
// function helper(l, r, nums) {
//     if (l > r) return -1;

//     let m = parseInt((l+r)/2);

//     // 不能 m 是就直接返回，因为左边可能有更小的，所以，要先遍历左边，再判 m，再遍历右边
//     let left = helper(l, m-1, nums);
//     if (~left) return left;

//     if (nums[m] === m) return m;

//     let right = helper(m+1, r, nums);
//     return right;
// }

// 不过看结果，没啥提高。。。。
function helper(l, r, nums) {
    if (l > r) return -1;

    let m = parseInt((l+r)/2);

    // 不能 m 是就直接返回，因为左边可能有更小的，所以，要先遍历左边，再判 m，再遍历右边
    let left = -1;
    // 比如[1,1,1,1,1,4,5,6,6]， m = 4, nums[m] = 1，此时可以直接将 r 定为 nums[m]，因为 nums[m] 和 m 中间不可能有答案，因为我找的就是下标和数相等的
    if (nums[m] < m) {
        left = helper(l, nums[m], nums)
    } else {
        left = helper(l, m-1, nums)
    }
    if (~left) return left;

    if (nums[m] === m) return m;

    let right = -1;
    // 比如[1,1,1,1,8,8,8,8,8]， m = 4, nums[m] = 8，此时可以直接将 r 定为 nums[m]，因为 nums[m] 和 m 中间不可能有答案，因为我找的就是下标和数相等的
    // 如果 i = 8 之前不可能小于 8，所以不可能有答案
    if (nums[m] > m) {
        right = helper(nums[m], r, nums);
    } else {
        right = helper(m+1, r, nums);
    }
    return right;
}


// huapeng代码
var findMagicIndex = function(nums) {
    return search(0, nums.length-1, nums);
};

/**
 * 注意二分法的本质是减少搜索域，每次递归只能减少1/4的搜索区间
 *
 */
function search(startIdx, endIdx, nums) {
    if (startIdx > endIdx) return -1;

    const mid = startIdx + ((endIdx-startIdx)>>1);

    let leftRes = -1;
    if (nums[mid] < mid) {
        leftRes = search(startIdx, nums[mid], nums);
    } else if (nums[mid] > mid) {
        leftRes = search(startIdx, mid-1, nums);
    }

    if (leftRes !== -1) return leftRes;
    if (nums[mid] === mid) return mid;

    let rightRes = -1;
    if (nums[mid] < mid) {
        return search(mid+1, endIdx, nums);
    } else {
        return search(nums[mid], endIdx, nums);
    }
}
