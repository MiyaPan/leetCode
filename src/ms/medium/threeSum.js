/**
 * 15. 三数之和
 * https://leetcode-cn.com/problems/3sum/
*/
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
// 注意的：1. 不要重复的；2. 是个 3 元组，不是任意个数
// https://leetcode-cn.com/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/
// 核心思路：后面两个数可以双指针夹逼出来
export var threeSum = function(nums) {
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
