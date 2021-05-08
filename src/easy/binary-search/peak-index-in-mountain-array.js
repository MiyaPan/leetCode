/**
 * 852. 山脉数组的峰顶索引
 * 我们把符合下列属性的数组 A 称作山脉：
    A.length >= 3
    存在 0 < i < A.length - 1 使得A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
    给定一个确定为山脉的数组，返回任何满足 A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1] 的 i 的值。

    示例 1：
    输入：[0,1,0]
    输出：1

    示例 2：
    输入：[0,2,1,0]
    输出：1

    提示：
    3 <= A.length <= 10000
    0 <= A[i] <= 10^6
    A 是如上定义的山脉
    
    进阶：很容易想到时间复杂度 O(n) 的解决方案，你可以设计一个 O(log(n)) 的解决方案吗？

    链接：https://leetcode-cn.com/problems/peak-index-in-a-mountain-array
*/
/**
 * =============================
 * 二刷
*/
export const peakIndexInMountainArray = (A) => {
    let n = A.length;
    if (n === 1) return 0;
    let l = 0;
    let r = n - 1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m-1 < 0) {
            return A[m] > A[m+1] ? m : m + 1;
        }
        if (m+1 >= n) {
            return m;
        }
        if (A[m-1] < A[m] && A[m] > A[m+1]) {
            return m;
        } else if (A[m-1] < A[m] && A[m] < A[m+1]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
}

/**
 * =============================
 * 一刷
*/
export const peakIndexInMountainArray = (A) => {
    let n = A.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (A[m] > A[m-1] && A[m] > A[m+1]) {
            return m;
        } else if (A[m] < A[m+1]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    // 因为是和两边元素比的，确实没啥以外情况到这了
    // 这里return什么都可以，因为对于此题来说，在循环体内一定会返回：https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/solution/er-fen-cha-zhao-liang-chong-mo-ban-leftrighthe-lef/
    // return 
}
