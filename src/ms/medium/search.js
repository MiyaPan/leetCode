
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
/**
 * =============================
 * 二刷
*/
export var search = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (target === nums[m]) return m;

        // nums = [4,5,6,7,0,1,2], target = 0
        // [1,3]，3
        if (nums[m] > nums[r]) {
            // 这种旋转的就要用两个数去卡范围啊，一个 r 或 一个 m 是无法确定的
            if (target > nums[r] && target < nums[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else {
            if (target > nums[m] && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return -1;
}
















/**
 * =============================
 * 二刷
*/
export var search = function(nums, target) {
    let n = nums.length;
    if (n === 0) return -1;
    let first = nums[0];
    
    let l = 0;
    let r = nums.length - 1;
    
    // 总结：旋转数组的题目，不应该直接拿 target 去比，而应该利用 mid 和 l、 r 的大小比较，先区别哪部分是有序的！
    // 就都拿 mid 和 l、r 的值比较，确定有序区间就行
    // 总起来说，二分靠的就是有序，就是往有序的区间去，才能用二分!!!!!

    // while(l <= r) {
    //     let mid = l + parseInt((r-l)/2);
    //     if (nums[mid] === target) return mid;
    //     // 因为存在无序的区间，所以利用 mid 划分有序区间再确定移动方向。在有序的区间上，能唯一的确定移动方向
    //     // target 和 nums[m] 相等的情况上面会return，除这个外，都是带相等的判断
    //     if (nums[mid] >= first) {
    //         // [3, 1] 1
    //     // if (nums[mid] > first) {
    //         if (first <= target && target < nums[mid]) {
    //             r = mid - 1;
    //         } else {
    //             l = mid + 1;
    //         }
    //     } else {
    //         if (nums[mid] < target && target <= nums[nums.length - 1]) {
    //             l = mid + 1;
    //         } else {
    //             r = mid - 1;
    //         }
    //     }
    // }

    // 解法2：都跟 r 和 l 比，替换 first 和 last
    while(l <= r) {
        let mid = l + parseInt((r-l)/2);
        if (nums[mid] === target) return mid;
        // 因为存在无序的区间，所以利用 mid 划分有序区间再确定移动方向。在有序的区间上，能唯一的确定移动方向
        // target 和 nums[m] 相等的情况上面会return，除这个外，都是带相等的判断
        if (nums[mid] >= nums[l]) {
            // [3, 1] 1
        // if (nums[mid] > first) {
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[r]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }

    return -1;
};

// 类似题目：
/**
 * 153. 寻找旋转排序数组中的最小值
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    请找出其中最小的元素。
    你可以假设数组中不存在重复元素。

    示例 1:
    输入: [3,4,5,1,2]
    输出: 1

    示例 2:
    输入: [4,5,6,7,0,1,2]
    输出: 0

    链接：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array
*/
var findMin = function(nums) {
    if (nums.length === 0) return -1;

    let l = 0;
    let r = nums.length - 1;
    let first = nums[0];
    let last = nums[r];
    // 1. 没旋转的
    if (last >= first) return first;

    // 旋转的。没旋转的按照下面的走法回走到"空指针"
    // while(l <= r) {
    //     let m = l + parseInt((r-l)/2);
    //     // 2. 或者不单独处理没旋转的，那就增加退出的检测条件
    //     // if (nums[m] > nums[m+1]) return nums[m+1];
    //     // if (nums[m-1] > nums[m]) return nums[m];
    //     if (nums[m] >= first) {
    //         l = m + 1;
    //     } else {
    //         r = m - 1;
    //     }
    // }

    // 解法2：可以都跟 r 比较
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        // 这里得增加退出的检测条件，不然 [3,1,2] 这样的 case 不对
        if (nums[m] > nums[m+1]) return nums[m+1];
        if (nums[m-1] > nums[m]) return nums[m];
        if (nums[m] >= nums[r]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return nums[l];
};


// 154 https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，
 * 输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

    示例 1：
    输入：[3,4,5,1,2]
    输出：1

    示例 2：
    输入：[2,2,2,0,1]
    输出：0

    链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
    本题与主站 154 题相同：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/
*/
// 10，1，10，10，10，10，10 这个 case 决定了不能 m 和 l 比，他俩确定不了
// 2， 2， 2， 2， 2， 1， 2
// 得找个能确定区间的值比
export const minArray = (numbers) => {
    let n = numbers.length;
    let l = 0;
    let r = n -1;
    let first = numbers[l];
    let last = numbers[r];
    if (first < last) return first;

    // [3,3,3,3,3,3,3,3,1,3]
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m+1 < n && numbers[m] > numbers[m+1]) return numbers[m+1];
        if (m-1 >= 0 && numbers[m-1] > numbers[m]) return numbers[m];

        if (numbers[m] > first) {
            l = m + 1;
        } else if (numbers[m] < first) {
            r = m - 1;
        } else if (numbers[m] === first){
            if (numbers[m] === numbers[r]) {
                r = r - 1;
            } else {
                l = l + 1;
            }
        }
    }

    return first;
}

