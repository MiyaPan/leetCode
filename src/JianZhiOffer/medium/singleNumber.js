/**
 * 剑指 Offer 56 - II. 数组中数字出现的次数 II
 * https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/
*/
// TODO: 三刷
// map 就太简单了。。。。得整个时间复杂度 o(n),空间 o(1) 的！
/**
 * 对于任意二进制位 xx ，有：【这些都是对于单个的二进制位来说的！多位的不成立的，多位的 ^ 自己是 0，也就是 剑指 Offer 56 - I. 数组中数字出现的次数 里用到的】
        异或运算：x ^ 0 = x​ ， x ^ 1 = ~x
        与运算：x & 0 = 0 ， x & 1 = x
    
    参考：https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/solution/mian-shi-ti-56-ii-shu-zu-zhong-shu-zi-chu-xian-d-4/
    用有限状态机，map占空间，又用了位运算把 map 省掉了
    。。。
    状态机太南了，不学了，学了也想不到

    学个 o(32) 空间的 吧
*/
var singleNumber = function(nums) {
    let bits = Array(32).fill(0);
    for (let num of nums) {
        for (let j = 31; j >= 0; j--) {
            bits[j] += num & 1;
            num >>>= 1;
        }
    }

    let ans = 0;
    let power = 1;
    for (let j = 31; j >= 0; j--) {
        ans += (bits[j] % 3) * power;
        power <<= 1;
    }
    return ans;
};
