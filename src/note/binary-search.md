# 题目识别

1、真正在做题过程很少会有直接写标准的二分查找的题目，一般都是需要变型，转化成二分查找的问题。所以掌握二分查找思想比掌握实现方式更重要。
2、一般是二分查找去解题有个很明显的特征那就是 升序数组或有序数组，以及在一些查找数中对时间复杂度要求比较高，比如时间复杂度必须低于O(n), 很明显你不能直接用循环去做，二分查找的平均时间复杂度是O(log n) 明显低于 O(n), 可能就需要你考虑是否能用二分查找。
3、还有一个典型使用二分查找的题目，就是求平方根或者求完全平方数，有个通用结论是: 一个非负数n的平方根小于n/2 + 1。所以就转化了从[0,n/2 + 1]查找符合的平方根或完全平方数。

## 寻找边界题目

两个区别：
- 返回值：
    寻找左边界的时候是 right 一直往左移动，直到退出时，也是 right 移动多了，left 仍然指向的是最后一个 target，所以返回 left；
    寻找右边界的时候是 left 一直往右移动，直到退出时，是 left 移动多了，right 仍然指向的是最后一个 target，所以返回 right；
- 边界检查：
    根据上面的移动趋势，边界检查就很简单了，要谁检查谁啊！
    寻找左边界的时候是 right 一直往左移动，直到退出时，是 right 移动多了是正常跳出。但是有可能 target 比所有数都大，这个才会溢出，所以检查 left 是否超过 length；因为要的是 left 啊，要谁检查谁啊
    寻找右边界的时候是 left 一直往右移动，直到退出时，是 left 移动多了是正常跳出。但是有可能 target 比所有数都小，这个才会溢出，所以检查 right 是否超过 0；

1. 寻找左边界

```js
function left_bound(nums, target) {
    let left = 0, right = nums.length - 1;
    // 搜索区间为 [left, right]
    while (left <= right) {
        let mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右侧边界
            right = mid - 1;
        }
    }
    // 检查出界情况
    if (left >= nums.length || nums[left] != target)
        return -1;
    return left;
```

2. 寻找右边界

```js
function left_bound(nums, target) {
    let left = 0, right = nums.length - 1;
    // 搜索区间为 [left, right]
    while (left <= right) {
        let mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右侧边界
            left = mid + 1;
        }
    }
    // 检查出界情况
    if (right < 0 || nums[right] != target)
        return -1;
    return right;
```

总结：
1、分析二分查找代码时，不要出现 else，全部展开成 else if 方便理解。

2、注意「搜索区间」和 while 的终止条件，如果存在漏掉的元素，记得在最后检查。

3、如需定义左闭右开的「搜索区间」搜索左右边界，只要在 nums[mid] == target 时做修改即可，搜索右侧时需要减一。

4、如果将「搜索区间」全都统一成两端都闭，好记，只要稍改 nums[mid] == target 条件处的代码和返回的逻辑即可，推荐拿小本本记下，作为二分搜索模板。

参考链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/er-fen-cha-zhao-suan-fa-xi-jie-xiang-jie-by-labula/