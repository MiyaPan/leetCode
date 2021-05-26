/**
 * 81. 搜索旋转排序数组 II
 * 已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。
    在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转 ，
    使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
    例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。
    给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。
    如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。

    示例 1：
    输入：nums = [2,5,6,0,0,1,2], target = 0
    输出：true
    
    示例 2：
    输入：nums = [2,5,6,0,0,1,2], target = 3
    输出：false

    提示：
    1 <= nums.length <= 5000
    -104 <= nums[i] <= 104
    题目数据保证 nums 在预先未知的某个下标上进行了旋转
    -104 <= target <= 104

    进阶：
    这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
    这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

    链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
// TODO: 三刷回忆一下套路
/**
 * =============================
 * 二刷
*/
// [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1]，2
// [1,3], 3
// [1,3,1,1,1], 3
// [2,5,6,0,0,1,2], target = 3
var search = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] === target) return true;

        if (nums[m] === nums[r]) {
            r--;
        } else if (nums[m] < nums[r]) {
            if (nums[m] < target && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        } else if (nums[m] > nums[r]) {
            if (nums[l] <= target && target <= nums[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
    }
    return false;
}


















/**
 * =============================
 * 一刷
*/
// 思路：就分类讨论呗，先确定哪个区间单调【怎么区分，就拿 mid 和 r 或者 l 比较都行，两种都一样的，看当时想到了啥】
// ，只去单调上看元素是不是在这，在就操作，不在肯定就在另一边不单调的区间上，即 else 就反向操作。
// 确定不了的就 r-1 或者 l+1 缩小范围。
var search = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;

    while (l <= r) {
        let mid = l + parseInt((r-l)/2);
        if (nums[mid] === target) return true;

        // 害，这就体现了 if if if 和 if else if 的区别，加了 else 的会少判断那个条件，所已没加 else 之前最后一个 case 超时了
        // 要想更快还可以和一刷的思路一样，把 === 的情况往前提
        // 由于速度本来就没差多少，想要更快的话，还可以 === 的情况直接退出循环，，没多少差啦，真面试不考虑这点细节
        if (nums[mid] === nums[r]) {
            r -= 1;
            continue;
        }
        if (nums[mid] < nums[r]) {
            // 右边单调
            // [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1]
            // 2
            // if (nums[mid] < target && target < nums[r]) {
            // 等号加在哪里？啥啊，肯定不是 target 和 mid 比较那里啊，如果 target 和 mid 相等早就返回了
            if (nums[mid] < target && target <= nums[r]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        } else if (nums[mid] > nums[r]) {
            // 左边单调
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
    }
    
    return false;
};

// 一刷做法
var search = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    // [1,3], 3
    // [1,3,1,1,1], 3
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (nums[m] === target) return true;

        // 不能放到下面的 if else 后面，因为要 提前终止，这样来排除一个选项
        // 最重要的是：不能拿 first 去比，而应该比较 nums[l]，这样才能排除 左边 那个相等的，把数组缩短
        if (nums[m] === nums[l]) {
            l++;
            continue;
        }

        if (nums[m] > nums[l]) {
            // first === target 归哪边都行，都能找到
            if (nums[l] <= target && target < nums[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else if (nums[m] < nums[l]) {
            if (nums[m] < target && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return false;
};
