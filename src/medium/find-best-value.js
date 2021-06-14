/**
 * 1300. 转变数组后最接近目标值的数组和
 * 给你一个整数数组 arr 和一个目标值 target ，请你返回一个整数 value ，
 * 使得将数组中所有大于 value 的值变成 value 后，
 * 数组的和最接近  target （最接近表示两者之差的绝对值最小）。

    如果有多种使得和最接近 target 的方案，请你返回这些整数中的最小值。

    请注意，答案不一定是 arr 中的数字。

    示例 1：
    输入：arr = [4,9,3], target = 10
    输出：3
    解释：当选择 value 为 3 时，数组会变成 [3, 3, 3]，和为 9 ，这是最接近 target 的方案。
    
    示例 2：
    输入：arr = [2,3,5], target = 10
    输出：5
    
    示例 3：
    输入：arr = [60864,25176,27249,21296,20204], target = 56803
    输出：11361
     
    提示：
    1 <= arr.length <= 10^4
    1 <= arr[i], target <= 10^5
    链接：https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target
*/
/**
 * =============================  
 * 二刷
*/
export var findBestValue = function(arr, target) {
    arr.sort((a, b) => a-b);
    let n = arr.length;
    if (parseInt(target/n) < arr[0]) {
        return Math.abs(Math.floor(target/n) *n - target) <= Math.abs(Math.ceil(target/n) *n - target)
            ? Math.floor(target/n) : Math.ceil(target/n);
    }

    let sum = Array(n).fill(0);
    let ans = arr[0];
    for (let i = 0; i < n; i++) {
        sum[i] = arr[i] + (sum[i-1] || 0);
        let num = sum[i] + arr[i] * (n-1-i);
        if (Math.abs(num-target) === 0) return arr[i];
    }
    console.log(sum)

    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        let num = sum[m] + arr[m]*(n-m-1);
        if (num === target) return arr[m];
        if (num < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    console.log('r:', r, 'arr[r]',arr[r], 'l:', l)

    if (r >= n-1) return arr[r];

    let prefixSum = sum[r] || 0;
    
    let start = arr[r];
    let end = arr[l];
    console.log('prefixSum:', prefixSum, 'start:',start, 'end:', end)
    while (start <= end) {
        let m = start + parseInt((end-start)/2);
        let num = prefixSum + m*(n-r-1);
        if (num === target) return m;
        if (num < target) {
            start = m + 1;
        } else {
            end = m - 1;
        }
    }
    console.log('start:',start, 'end:', end)
    ans = Math.abs(prefixSum + end*(n-r-1) - target) <= Math.abs(prefixSum + (end+1)*(n-r-1) - target) ? end : end+1;
    return ans;
};
















/**
 * =============================  
 * 1刷
*/
export var findBestValue1 = function(arr, target) {
    let n = arr.length;
    arr.sort((a,b) => a-b);
    if (parseInt(target/n) < arr[0]) {
        return Math.abs(Math.floor(target/n) *n - target) < Math.abs(Math.ceil(target/n) *n - target)
            ? Math.floor(target/n) : Math.ceil(target/n);
    }

    let l = 0;
    let r = n -1;
    let leftPart = 0;
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        leftPart = sum(arr, m);
        let rightPart = arr[m] * (n-m);
        if (leftPart + rightPart === target) return arr[m];
        if (leftPart + rightPart > target) {
            r = m -1;
        } else {
            l = m +1;
        }
    }
    // r 是刚好小于的，l 是刚好大于的，看 arr 的这俩元素之间的数，哪个能让合的查最小
    let start = arr[r];
    if (r >= n - 1) return start;
    let end = arr[r + 1];
    leftPart = sum(arr, r+1);
    while(start <= end) {
        let m = start + parseInt((end-start)/2);
        if (leftPart + m*(n-r-1) === target) return m;
        if (leftPart + m*(n-r-1) > target) {
            end = m -1;
        } else {
            start = m +1;
        }
    }

    return Math.abs(leftPart + end * (n-r-1) - target) <= Math.abs(leftPart + (end + 1)*(n-r-1) - target)
        ? end : end +1;
};

function sum(arr, index) {
    let sum = 0;
    for (let i = 0; i < index; i++) {
        sum += arr[i];
    }
    return sum;
}
