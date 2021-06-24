/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
 * https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
*/
var exchange = function(nums) {
    let n = nums.length;
    let i = 0;
    let j = n-1;
    while (i < j) {
        while (i < n && nums[i] % 2 === 1) {
            i++;
        }
        while (j >= 0 && nums[j] % 2 === 0) {
            j--;
        }
        if (i < n && j >= 0 && i < j) {
            swap(nums, i,j);
        }
    }
    return nums;
};
function swap(arr, i,j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
