/**
 * 189. 旋转数组
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

    示例 1:
    输入: [1,2,3,4,5,6,7] 和 k = 3
    输出: [5,6,7,1,2,3,4]
    解释:
    向右旋转 1 步: [7,1,2,3,4,5,6]
    向右旋转 2 步: [6,7,1,2,3,4,5]
    向右旋转 3 步: [5,6,7,1,2,3,4]
    
    示例 2:
    输入: [-1,-100,3,99] 和 k = 2
    输出: [3,99,-1,-100]
    解释: 
    向右旋转 1 步: [99,-1,-100,3]
    向右旋转 2 步: [3,99,-1,-100]
    
    说明:
    尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
    要求使用空间复杂度为 O(1) 的 原地 算法。

    链接：https://leetcode-cn.com/problems/rotate-array
*/
/**
 * =============================
 * 二刷
*/
// 思路大致是对的，就是 index 想和描述不对了
// 应该是 i 挪到 i + k
export var rotate = function(nums, k) {
    let n = nums.length;
    // 转圈的，不管是链表还是数组啥的，都记得先取模！
    k = k % n;
    if (k === 0) return;

    // [-1,-100,3,99], 2
    // 这个 case 就转圈循环起来了，index 0 和 2 转圈，走不到 1 、3
    // 只需要记下 start 是多少，在再次走到 start 的时候 +1，并且更新 start，
    // start只有在再次走到的时候需要更新
    let i = 0;
    let loc = 0;
    let startLoc = 0;
    let cur = nums[0];
    while (i < n) {
        let temp = nums[(loc+k)%n];
        nums[(loc+k)%n] = cur;
        // loc = (loc+k) % n;
        let newLoc = (loc+k) % n;
        if (newLoc === startLoc) {
            loc = startLoc + 1;
            startLoc = loc;
            cur = nums[startLoc];
        } else {
            loc = newLoc;
            cur = temp;
        }
        i++;
    }
};

/**
 * =============================
 * 一刷
*/
export var rotate = function(nums, k) {
    let len = nums.length;
    // 转超过长度，就取模，要不转一圈白转
    k = k % len;
    if (k === 0) return nums;

    let count = 0;
    let loc = len-k;
    let val = nums[loc];
    // 每轮死循环开始的索引
    let startLoc = loc;
    // 输入：
    // [-1,-100,3,99]
    // 2
    // 输出：
    // [3,-100,3,99]
    // 预期结果：
    // [3,99,-1,-100]
//     [1]
//      1
// [1,2,3,4,5,6], 3 这个每换一组都会循环，所以 if 哪里不能仅仅判断最初值，得判断每次的
    while(count < len) {
        loc = startLoc;
        val = nums[loc];
        // 还真必须用 do while ，就是达到了还得再做一次
        do {
            let newLoc = (loc + k) % len;
            let temp = nums[newLoc];
            // // 又转到初始值的情况
            // if ((loc + k) % len === startLoc) {
            //     break;
            // };
            nums[newLoc] = val;
            val = temp;
            loc = newLoc;
            count++;
        } while(loc !== startLoc);
        startLoc++;
    }

    return nums;
};
