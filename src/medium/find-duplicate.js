/**
 * 287. 寻找重复数
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
// TODO: 三刷，
/**
 * =============================  
 * 二刷
*/
// 脑筋急转弯，不能用 map 存储数量，就去数好了，，，每次去数小于当前值的有多少个，就能二分了
export var findDuplicate = function(nums) {
    let n = nums.length;
    let l = 1;
    let r = n-1;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (nums[i] <= m) {
                count++;
            }
        }
        if (count > m) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return l;
}












/**
 * =============================  
 * 一刷
*/
// 只要只要一侧的区间里肯定有，不用管另一侧是否能确定！肯定就根据可以确认的区间分两半了啊！！
// https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-fa-si-lu-ji-dai-ma-python-by-liweiwei1419/
// 二分：思路不常见，时间换空间，但是细节思路有用，比如上面那句话
export var findDuplicate = function(nums) {
    let n = nums.length;
    let l = 1;
    let r = n-1;
    // [3,1,3,4,2]
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (nums[i] <= m) count++;
            if (count > m) break;
        }

        if (count > m) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return l;
};

// 快慢指针：处理成判断环的问题
// https://leetcode-cn.com/problems/find-the-duplicate-number/solution/287xun-zhao-zhong-fu-shu-by-kirsche/
// 求链表环的入口 https://blog.csdn.net/plokmju88/article/details/103675872
// 证明：https://www.cnblogs.com/huanyou/p/5944296.html
export var findDuplicate = function(nums) {
    let n = nums.length;
    // 初始化
    let slow = 0;
    let fast = 0;
    // 走一步
    slow = nums[slow];
    fast = nums[nums[fast]];
    while(slow !== fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }
    // 相遇了，然后让一个指针在相遇点，一个会远点，都每次走一步，再相遇就是环入口
    slow = 0;
    fast = fast;
    while(slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
};

// 一个求是否有环的很多变形的总结 https://leetcode-cn.com/problems/find-the-duplicate-number/solution/qian-duan-ling-hun-hua-shi-tu-jie-kuai-man-zhi-z-3/
