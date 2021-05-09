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
 * 二刷, done
*/
// 打败 92.03%，最优思路，但是写的不如官方简单，可参考解法3 https://leetcode-cn.com/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-leetcode/
// 也是 O(n+m)
export const merge = (nums1, m, nums2, n) => {
    if (n === 0) {
        return nums1;
    }

    if (m === 0) {
        for (let i = 0; i<n; i++) {
            nums1[i] = nums2[i];
        }
        return nums1;
    }

    let lastBlankIndex = m + n - 1;
    let lastIndexOf2 = n-1;

    let i = m - 1;
    while(i>=0) {
        if (nums2[lastIndexOf2] > nums1[i]) {
            nums1[lastBlankIndex--] = nums2[lastIndexOf2--];
        } else {
            nums1[lastBlankIndex--] = nums1[i--];
            // nums2 剩余元素小于 nums1[0]， nums1[0]被挪到后面位置，i-- = -1 了，这时候直接把 nums2 剩余元素放到 nums1
            // 这里可以简化到最后，判断 i<0 之后，直接跳出，在 while 循环外做这个 for 循环，这样还可以把 m=0 n=0 的情况直接纳入，不用特殊判断
            if (i<0) {
                for (let j = 0; j <= lastIndexOf2; j++) {
                    nums1[j] = nums2[j]
                }
            }
        }
        // nums2已经遍历完了
        if (lastIndexOf2 < 0) {
            break;
        }
    }

    return nums1;
}

// 解法2：先合并，再排序，时间复杂度比较差 O((n+m)log(n+m))
// 解法3：没说不能申请多个数组空间：把 nums1 复制下来 nums1_copy，nums1 只做空间用，nums1_copy 和 nums2 逐一比较进 nums1 即可。O(n+m)
