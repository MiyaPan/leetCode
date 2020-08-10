/**
 * 88. 合并两个有序数组
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明:
 * 
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * 
 * 示例:
 * 
 * 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 
 * 输出: [1,2,2,3,5,6]
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/merge-sorted-array
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
export const merge = (nums1, m, nums2, n) => {
    let p1 = m - 1;
    let p2 = n - 1;
    while(p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p1+p2+1] = nums1[p1--];
        } else {
            nums1[p1+p2+1] = nums2[p2--];
        }
    }

    return nums1;
}

// 解法2：先合并，再排序，时间复杂度比较差 O((n+m)log(n+m))
// 解法3：没说不能申请多个数组空间：把 nums1 复制下来 nums1_copy，nums1 只做空间用，nums1_copy 和 nums2 逐一比较进 nums1 即可。O(n+m)
