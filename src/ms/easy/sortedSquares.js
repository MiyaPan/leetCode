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
/**
 * =============================
 * 二刷
*/
var sortedSquares = function(A) {
    let midIndex = -1;
    let n = A.length;
    // 自己的思路，注释的效率更高，因为不用全部遍历完~
    // for (let i = 0; i < n; i++) {
    //     // 已经升序了唉，干嘛还判断前一个
    //     if (A[i] >=0) {
    //         midIndex = i;
    //         break;
    //     }
    // }

    // midIndex = midIndex === -1
    //     ? A[0] >= 0 ? 0 : n
    //     : midIndex;

    for (let i = 0; i < n; i++) {
        // 已经升序了唉，干嘛还判断前一个
        if (A[i] < 0) {
            midIndex = i;
        } else {
            break;
        }
    }
    // 修改找 mid 的方法就可以
    // midIndex = midIndex === -1
    //     ? A[0] >= 0 ? 0 : n
    //     : midIndex;

    let i = midIndex;
    let j = midIndex + 1;
    // let i = midIndex - 1;
    // let j = midIndex;
    let ans = [];
    // [-5,-3,-2,-1]
    while (i >= 0 && j < n) {
        // 这里不能给 0 作为默认值，这样都会比它大，会一直 push 0
        // let numa = A[i] || 0;
        // let numb = A[j] || 0;
        // 这样也不对，这样都比它小，唉就单独判断吧
        // let numa = A[i] || 10001;
        // let numb = A[j] || 10001;
        if (A[i] * A[i] <= A[j] * A[j]) {
            ans.push(A[i] * A[i]);
            i--;
        } else {
            ans.push(A[j] * A[j]);
            j++;
        }
    }
    while (i >= 0) {
        ans.push(A[i] * A[i]);
        i--;
    }
    while (j < n) {
        ans.push(A[j] * A[j]);
        j++;
    }
    
    return ans;
}

/**
 * =============================
 * 一刷
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
