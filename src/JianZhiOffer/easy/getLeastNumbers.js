/**
 * 剑指 Offer 40. 最小的k个数
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
*/
// easy 的题目，不想写堆
var getLeastNumbers = function(arr, k) {
    arr.sort((a,b)=>a-b);
    return arr.slice(0,k);
};
