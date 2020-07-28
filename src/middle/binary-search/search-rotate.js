
/**
 * 33. 搜索旋转排序数组
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
    你可以假设数组中不存在重复的元素。

    你的算法时间复杂度必须是 O(log n) 级别。

    示例 1:
    输入: nums = [4,5,6,7,0,1,2], target = 0
    输出: 4

    示例 2:
    输入: nums = [4,5,6,7,0,1,2], target = 3
    输出: -1

    链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
*/
export var search = function(nums, target) {
    let n = nums.length;
    if (n === 0) return -1;
    if (n === 1) return nums[0] === target ? 0 : -1;

    let l = 0;
    let r = n - 1;
    let first = nums[0];
    let last = nums[n-1];
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === target) {
            return m;
        }
        // 为啥这样分 if else ，因为在完全有序的部分里，我们可以用比较大小，不完全有序的，没法比
        // 所以，先判断出哪部分是有序的，然后对于有序的利用大小比较，判断该左移还是右移，剩下的相反移动
        if (nums[m] >= first) {
            if (first <= target && target < nums[m]) {
                r = m -1;
            } else {
                l = m + 1
            }
        } else {
            if (nums[m] < target && target <= last) {
                l = m +1;
            } else {
                r = m -1;
            }
        }
    }

    return -1;
};

export var search1 = function(nums, target) {
    let n = nums.length;
    if (n === 0) return -1;
    if (n === 1) return nums[0] === target ? 0 : -1;

    let l = 0;
    let r = n - 1;
    // 如果没有重复元素，就可以跟 first 比，因为能唯一确定大小关系，更简单
    // 如果有重复元素，可以 m 可以跟 nums[r] 比，参见 easy/binary-search/min-array.js
    let first = nums[0];
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (nums[m] === target) {
            return m;
        }
        // 4,5,6,7,0,1,2， target = 5 || 2
        // if (nums[m] > first) { // 注意 1，3   3  这种 case，fisrt 等于 m 了，说明 l = m 走到最左边了
        // m 在左半边有序数组中
        if (nums[m] >= first) {
            // if (first < target && target < nums[m]) { // [1,3,5] , 1 这种，target 和first相等的，得走正常
            // target 和 nums[m] 相等的情况上面会return，除这个外，都是带相等的判断
            if (first <= target && target < nums[m]) {
                // 比如 target = 5，如果大于就在左边
                r = m - 1;    
            } else {
                // 比如 target = 5
                l = m + 1;
            }
        } else {
            // nums[m] < first， target = 3
            // 5,6,7,0,1,2,3,4
            // 这个条件其实是 nums[m] < target < last，因为 last 比 first 小，就这么写了
            // target < first 不带等号，是因为本来该比 last，last 肯定比 first小，所以没了等号
            if (nums[m] < target && target < first) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }

    return -1;
};
