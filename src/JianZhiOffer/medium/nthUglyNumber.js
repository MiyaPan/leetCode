/**
 * 剑指 Offer 49. 丑数
 * https://leetcode-cn.com/problems/chou-shu-lcof/
*/
// TODO: 三刷
export var nthUglyNumber = function(n) {
    let p2 = 0;
    let p3 = 0;
    let p5 = 0;
    let nums = [1];
    let count = 1;
    while (count < n) {
        let min = Math.min(2*nums[p2], 3*nums[p3], 5*nums[p5]);
        nums.push(min);
        count++;
        if (min === 2*nums[p2]) {
            p2++;
        }
        if (min === 3*nums[p3]) {
            p3++;
        }
        if (min === 5*nums[p5]) {
            p5++;
        }
    }
    return nums[n-1];
};
