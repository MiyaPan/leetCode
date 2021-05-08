/**
 * 378. 有序矩阵中第K小的元素
 * 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
    请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

    示例：

    matrix = [
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
    ],
    k = 8,

    返回 13。
     
    提示：
    你可以假设 k 的值永远是有效的，1 ≤ k ≤ n^2 。
    链接：https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix
*/
export var kthSmallest = function(matrix, k) {
    let n = matrix.length;
    if (n === 0) return -1;
    let m = matrix[0].length;

    let l = matrix[0][0];
    let r = matrix[n-1][m-1];
    while(l <= r) {
        let mid = l + parseInt((r-l)/2);
        let count = helper(matrix, n, m, mid);
        // 这里不能直接返回，返回的可能是矩阵中不存在的数
        // if (count === k) return mid;
        if (count >= k) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    // 在[left, right]中符合条件(count(矩阵中小于它的数)==k)的数可能会有多个，这些数中，
    // 最小的那个(设为a)一定在矩阵中，对于任意整数i(i<a) ，count(i)<k，直到i等于a时，count将第一次等于k。
    // 因此二分查找找到第一个使count==k的位置，也就是c++里lower_bound所求的位置，就一定是所求。
    return l;
};

// 找出矩阵中 <= target 的元素个数
function helper(matrix, n, m, target) {
    let i = n - 1;
    let j = 0;
    let count = 0;
    // 不能在上移一行的时候加，会导致第一行的统计不到【因为j已经跑出界了，会少进入一次i--】，所以要在 j++ 的时候加
    // while(i >= 0 && j < m) {
    //     if (matrix[i][j] <= target) {
    //         j++;
    //     } else {
    //         i--;
    //         count += j;
    //     }
    // }
    while(i >= 0 && j < m) {
        if (matrix[i][j] <= target) {
            j++;
            count += i+1;
        } else {
            i--;
        }
    }

    return count;
}