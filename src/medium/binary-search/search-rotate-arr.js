/**
 * 面试题 10.03. 搜索旋转数组
 * 搜索旋转数组。给定一个排序后的数组，包含n个整数，但这个数组已被旋转过很多次了，次数不详。请编写代码找出数组中的某个元素，
 * 假设数组元素原先是按升序排列的。若有多个相同元素，返回索引值最小的一个。

    示例1:
    输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
    输出: 8（元素5在该数组中的索引）
    
    示例2:
    输入：arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 11
    输出：-1 （没有找到）

    [5,5,5,1,2,3,4,5] 5 
    
    提示:
    arr 长度范围在[1, 1000000]之间

    链接：https://leetcode-cn.com/problems/search-rotate-array-lcci
*/
var search = function(arr, target) {
    let n = arr.length;
    let l = 0;
    let r = n-1;
    // [5,5,5,1,2,3,4,5] 5 
    // [1,1,1,1,1,2,1,1,1], 2
    // [2, 1, 2, 2, 2], 1
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (arr[m] === target) {
            // 可能是找到了重复的
            // return m;
            if (arr[l] === target) {
                return l;
            } else {
                l++;
            }
        } else if (arr[m] === arr[l]) {
            // 因为重复要最小的，所以优先看 l 匹不匹配，如果匹配，就找到了，没有，也只能舍弃 l 这一个，其他还是不能确定，就只舍弃一个好了
            if (arr[l] === target) {
                return l;
            } else {
                l++;
            }
        } else if (arr[m] > arr[l]) {
            if (arr[l] <= target && target <= arr[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else {
            if (arr[m] <= target && target < arr[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return -1;
};
