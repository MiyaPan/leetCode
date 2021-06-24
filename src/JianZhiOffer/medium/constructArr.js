/**
 * 剑指 Offer 66. 构建乘积数组
 * 给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B[i] 的值是数组 A 中除了下标 i 以外的元素的积, 
 * 即 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。

    示例:
    输入: [1,2,3,4,5]
    输出: [120,60,40,30,24]
     
    提示：
    所有元素乘积之和不会溢出 32 位整数
    a.length <= 100000

    链接：https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof
*/
var constructArr = function(a) {
    let n = a.length;
    let prefixSum = Array(n+2).fill(1);
    for (let i = 0; i < n; i++) {
        prefixSum[i+1] = prefixSum[i] * a[i];
    }
    let suffixSum = Array(n+2).fill(1);
    for (let i = n-1; i > 0; i--) {
        suffixSum[i+1] = suffixSum[i+2] * a[i];
    }
    let ans = [];
    for (let i = 1; i <= n; i++) {
        ans.push(prefixSum[i-1] * suffixSum[i+1]);
    }
    return ans;
};
