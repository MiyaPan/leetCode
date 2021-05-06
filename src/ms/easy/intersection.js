/**
 * 349. 两个数组的交集
 * 给定两个数组，编写一个函数来计算它们的交集。

    示例 1：
    输入：nums1 = [1,2,2,1], nums2 = [2,2]
    输出：[2]

    示例 2：
    输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出：[9,4]
     
    说明：
    输出结果中的每个元素一定是唯一的。
    我们可以不考虑输出结果的顺序。
s
    链接：https://leetcode-cn.com/problems/intersection-of-two-arrays
*/
/**
 * =============================
 * 二刷
*/
// 去重最快就是用 set
export const intersection = (nums1, nums2) => {
    const map = {};
    for (let num of nums1) {
        if (!map[num]) {
            map[num] = 1;
        }
    }
    let map2 = {};
    for (let num of nums2) {
        if (map[num] && !map2[num]) {
            map2[num] = 1;
        }
    }
    return [...Object.keys(map2)];
}

/**
 * =============================
 * 一刷
*/
export const intersection = (nums1, nums2) => {
    // return [...new Set(nums1.filter(item => nums2.includes(item)))];
    let ans = []
    let a = [...new Set(nums1)];
    a.forEach(item => {
        if (nums2.includes(item)) {
            ans.push(item);
        }
    });
    return ans;
}
