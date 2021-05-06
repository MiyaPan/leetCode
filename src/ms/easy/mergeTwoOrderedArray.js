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
/**
 * =============================
 * 二刷
*/
export const merge = (nums1, m, nums2, n) => {
    let i = m - 1;
    let j = n - 1;
    let p = m + n - 1;
    // [4,5,6,0,0,0]
    // 3
    // [1,2,3]
    // 3
    while (j >= 0) {
        if (nums2[j] > nums1[i] || i < 0) {
            nums1[p--] = nums2[j--];
        } else {
            // 这里不需要判断 j 是否 == -1 了，因为 j=-1 的时候拿到的是 undefined
            // 任何值和 undefined 相比都是 false，所以上面的 if 在 j 越界时就不走了，正好到这个 else 处理 nums2
            nums1[p--] = nums1[i--];
        }
    }
}

/**
 * =============================
 * 一刷
*/
export const merge = (nums1, m, nums2, n) => {
    let p1 = m - 1;
    let p2 = n - 1;
    while(p2 >= 0) {
        // 这个写法，当 p1 越界的时候，正好 undefined 和 任何数值相比较都是 false，会进到下面的 else，去处理 j
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
