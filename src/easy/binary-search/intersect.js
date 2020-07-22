/**
 * 350. 两个数组的交集 II
 * 给定两个数组，编写一个函数来计算它们的交集。

    示例 1：
    输入：nums1 = [1,2,2,1], nums2 = [2,2]
    输出：[2,2]

    示例 2:
    输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出：[4,9]
     
    说明：
    输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。【就比如数字2，在nums1和nums2中都同时出现了2次，
    才算是2次共同元素，而若是在nums1中出现了1次，在nums2中出现了2次，则交集应算作只有1个2】
    我们可以不考虑输出结果的顺序。
    进阶：
    如果给定的数组已经排好序呢？你将如何优化你的算法？
    如果 nums1 的大小比 nums2 小很多，哪种方法更优？
    如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

    链接：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii
*/
export const intersect = (nums1, nums2) => {
    nums1.sort((a,b) => a-b);
    nums2.sort((a,b) => a-b);
    let n= nums1.length;
    let m= nums2.length;
    let result = [];

    let p1 = 0;
    let p2 = 0;
    while(p1<n && p2<m) {
        if (nums1[p1] === nums2[p2]) {
            result.push(nums1[p1]);
            p1++;
            p2++;
        } else if (nums1[p1] < nums2[p2]) {
            p1++;
        } else {
            p2++;
        }
    }

    return result;
}
