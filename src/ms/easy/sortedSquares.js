/**
 * 977. 有序数组的平方
 * 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

    示例 1：
    输入：[-4,-1,0,3,10]
    输出：[0,1,9,16,100]
    
    示例 2：
    输入：[-7,-3,2,3,11]
    输出：[4,9,9,49,121]
     
    提示：
    1 <= A.length <= 10000
    -10000 <= A[i] <= 10000
    A 已按非递减顺序排序。

    链接：https://leetcode-cn.com/problems/squares-of-a-sorted-array
*/
var sortedSquares = function(A) {
    let j = binarySearch(A);
    let i = j - 1;

    const ans = [];

    while(i >= 0 && j <= A.length -1) {
        if (A[i] * A[i] >= A[j] * A[j]) {
            ans.push(A[j] * A[j]);
            j++;
        } else {
            ans.push(A[i] * A[i]);
            i--;
        }
    }

    while(i >= 0) {
        ans.push(A[i] * A[i]);
        i--;
    }

    while(j <= A.length -1) {
        ans.push(A[j] * A[j]);
        j++;
    }

    return ans; 
};

function binarySearch(A) {
    let l = 0;
    let r = A.length - 1;

    while(l <= r) {
        let mid = l + parseInt((r-l)/2);
        if (A[mid] < 0) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return l;
}
