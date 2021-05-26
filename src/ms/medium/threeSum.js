/**
 * 15. 三数之和
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
    注意：答案中不可以包含重复的三元组。

    示例 1：
    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]
    
    示例 2：
    输入：nums = []
    输出：[]
    
    示例 3：
    输入：nums = [0]
    输出：[]

    提示：
    0 <= nums.length <= 3000
    -105 <= nums[i] <= 105
 * https://leetcode-cn.com/problems/3sum/
*/
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
// 注意的：1. 不要重复的；2. 是个 3 元组，不是任意个数
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export var threeSum = function(nums) {
    let n = nums.length;
    nums.sort((a,b) => a-b);
    let map = new Map;
    let ans = [];
    for (let i = 0; i < n; i++) {
        map.set(nums[i], i);
    }

    for (let i = 0; i < n-2; i++) {
        if (nums[i] === nums[i-1]) continue;
        let a = nums[i];
        let pre;
        // 这个过程还是夹逼好一点，毕竟都有序了，下面这个就没有利用有序的特性了
        for (let j = i+1; j < n-1; j++) {
            // 这个不行，j 前面的 i 可能相同而错过答案
            // if (nums[j] === nums[j-1]) continue;
            if (pre === nums[j]) continue;
            let b = nums[j];
            let tar = -(a+b);
            if (map.has(tar) && map.get(tar) > j) {
                ans.push([a, b, tar]);
            }
            pre = nums[j];
        }
    }
    return ans;
}















/**
 * =============================
 * 一刷
*/
// https://leetcode-cn.com/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/
// 核心思路：后面两个数可以双指针夹逼出来
export var threeSum1 = function(nums) {
    nums.sort((a, b) => a-b);
    let ans = [];
    let len = nums.length;

    for (let i = 0; i < len - 2; i++) {
        if (nums[i] === nums[i-1]) {
            continue;
        }

        let l = i+1;
        let r = len - 1;
        while(r > l) {
            let sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                ans.push([nums[i], nums[l], nums[r]]);
                while(nums[l] === nums[l+1]) {
                    l++;
                }
                while(nums[r] === nums[r-1]) {
                    r--;
                }
                l++;
                r--;
            } else if (sum < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return ans;
};
