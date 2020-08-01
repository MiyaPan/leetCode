/**
 * 454. 四数相加 II
 * 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
    为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。
    所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。

    例如:

    输入:
    A = [ 1, 2]
    B = [-2,-1]
    C = [-1, 2]
    D = [ 0, 2]
    输出:
    2

    解释:
    两个元组如下:
    1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
    2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

    链接：https://leetcode-cn.com/problems/4sum-ii
*/
// https://leetcode-cn.com/problems/4sum-ii/solution/chao-ji-rong-yi-li-jie-de-fang-fa-si-shu-xiang-jia/
// 思路：两两为一组，求出每组的排列组合的和，记录下该和出现的次数，进行查找
var fourSumCount = function(A, B, C, D) {
    let map = new Map();
    let n = A.length;
    if (n === 0) return 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = A[i] + B[j];
            let sumInmap = map.get(sum);
            if (sumInmap) {
                map.set(sum, sumInmap + 1);
            } else {
                map.set(sum, 1);
            }
        }
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = C[i] + D[j];
            let sumInmap = map.get(-sum);
            if (sumInmap) {
                ans += sumInmap;
            }
        }
    }

    return ans;
};
