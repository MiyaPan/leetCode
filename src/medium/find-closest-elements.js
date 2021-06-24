/**
 * 658. 找到 K 个最接近的元素
 * 给定一个排序好的数组，两个整数 k 和 x，从数组中找到最靠近 x（两数之差最小）的 k 个数。
 * 返回的结果必须要是按升序排好的。如果有两个数与 x 的差值一样，优先选择数值较小的那个数。

    示例 1:
    输入: [1,2,3,4,5], k=4, x=3
    输出: [1,2,3,4]
     

    示例 2:
    输入: [1,2,3,4,5], k=4, x=-1
    输出: [1,2,3,4]

    说明:
    k 的值为正数，且总是小于给定排序数组的长度。
    数组不为空，且长度不超过 104
    数组里的每个元素与 x 的绝对值不超过 104
    链接：https://leetcode-cn.com/problems/find-k-closest-elements
*/
/**
 * =============================  
 * 二刷
*/
export var findClosestElements = function(arr, k, x) {
    let n = arr.length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (arr[m] >= x) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    // r 是小于 x 的数，可能为 -1
    if (r === -1) return arr.slice(0, k);

    let i = r;
    let j = r+1;
    let ans = [];
    // [1,2,3,4,5],4,-1
    // [1,1,1,10,10,10]，1，9
    // [-2,-1,1,2,3,4,5]，7，3
    // while (k > 0 && i >= 0 && j < n) {
    while (k > 0 && (i >= 0 && j < n)) {
        if (i >= 0 && Math.abs(x-arr[i]) <= Math.abs(x-arr[j])) {
            ans.unshift(arr[i--]);
        } else {
            ans.push(arr[j++]);
        }
        k--;
    }
    while (k > 0 && i >= 0) {
        ans.unshift(arr[i--]);
        k--;
    }
    while (k > 0 && j < n) {
        ans.push(arr[j++]);
        k--;
    }
    return ans;
}


















/**
 * =============================  
 * 一刷
*/
export var findClosestElements = function(arr, k, x) {
    let index = findXorClosed(arr, x);
    if (index === -1) return arr.slice(0, k);

    let n = arr.length;
    let pl = index;
    let pr = index + 1;
    let ans = [];
    while(k > 0) {
        if (pr >= n) {
            ans.unshift(arr[pl]);
                pl--;
        } else if (pl < 0) {
            ans.push(arr[pr]);
                pr++;
        } else if (Math.abs(arr[pl] - x) <= Math.abs(arr[pr] - x)) {
            ans.unshift(arr[pl]);
            pl--;
        } else {
            ans.push(arr[pr]);
            pr++;
        }
        
        k--;
    }

    return ans;
};

// 找到 x 的下标，或者 < x 的最近的一个下标，若 x 小于所有数，返回 -1
function findXorClosed(arr, x) {
    let n = arr.length;
    let l = 0;
    let r = n-1;
    while( l <= r) {
        let m = l + parseInt((r-l)/2);
        if (arr[m] === x) return m;
        if (arr[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return r;
}
