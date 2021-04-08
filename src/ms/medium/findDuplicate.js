/**
 * 287. 寻找重复数 - 笔记见 medium 文件夹下的同一题目
 * 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。
 * 假设只有一个重复的整数，找出这个重复的数。

    示例 1:
    输入: [1,3,4,2,2]
    输出: 2

    示例 2:
    输入: [3,1,3,4,2]
    输出: 3

    说明：
    不能更改原数组（假设数组是只读的）。
    只能使用额外的 O(1) 的空间。
    时间复杂度小于 O(n^2) 。
    数组中只有一个重复的数字，但它可能不止重复出现一次。

    链接：https://leetcode-cn.com/problems/find-the-duplicate-number
*/
// 想要低于 o(n^2), 你直接报 o(nlogn) 名字吧，能达到 o(logn) 的有 堆、二叉树、归并、快排、二分！
export var findDuplicate = function(nums) {
    let l = 1;
    let r = nums.length - 1;
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        let ct = count(nums, m);
        if (ct > m) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return l;
};

function count(nums, m) {
    let count = 0;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] <= m) {
            count++;
        }
    }
    return count;
}

// https://leetcode-cn.com/problems/find-the-duplicate-number/solution/287xun-zhao-zhong-fu-shu-by-kirsche/
// 求链表环的入口 https://blog.csdn.net/plokmju88/article/details/103675872
// 证明：https://www.cnblogs.com/huanyou/p/5944296.html
// 一个求是否有环的很多变形的总结 https://leetcode-cn.com/problems/find-the-duplicate-number/solution/qian-duan-ling-hun-hua-shi-tu-jie-kuai-man-zhi-z-3/
export var findDuplicate = function(nums) {
    let fast = 0;
    let slow = 0;
    // 找到相遇点了 是 slow
    // while(fast !== slow) {
    // 上面这 3 行 while 根本进不去啊
    while(1) {
        slow = nums[slow];
        fast = nums[nums[fast]];
        if (fast === slow) {
            break;
        }
    }

    // 一个从相遇点开始，一个从头开始走，再次相遇就是入环点
    fast = 0;
    while(fast !== slow) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
};