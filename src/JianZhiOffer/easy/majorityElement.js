/**
 * 剑指 Offer 39. 数组中出现次数超过一半的数字
 * https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
*/
var majorityElement = function(nums) {
    let n = nums.length;
    let map = {};
    for (let num of nums) {
        if (map[num]) {
            map[num]++;
        } else {
            map[num] = 1;
        }
        if (map[num] > n/2) return num;
    }
    return -1;
};
