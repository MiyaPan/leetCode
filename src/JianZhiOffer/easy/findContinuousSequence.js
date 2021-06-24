/**
 * 剑指 Offer 57 - II. 和为s的连续正数序列
 * https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
*/
var findContinuousSequence = function(target) {
    let map = new Map();
    let sum = 0;
    let ans = [];
    let limit = Math.ceil(target/2);
    for (let i = 0; i <= limit; i++) {
        sum += i;
        if (map.has(sum-target) && i-map.get(sum-target) >1) {
            let tmp = [];
            for (let j = map.get(sum-target)+1; j <= i; j++) {
                tmp.push(j);
            }
            ans.push(tmp);
        }
        map.set(sum, i);
    }
    return ans;
};
