/**
 * 剑指 Offer 56 - I. 数组中数字出现的次数
 * https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/
*/
// TODO: 三刷！
// 位运算，参考：https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/solution/jie-di-qi-jiang-jie-fen-zu-wei-yun-suan-by-eddievi/
var singleNumbers = function(nums) {
    let refer = 0;
    for (let num of nums) {
        refer ^= num;
    }

    let mask = 1;
    // 要判断 === 0 的，因为 refer 里的每一位 1 是两个目标数“不同的位”，我们就要按照这个不同的位去分两组
    // 所以，& 的时候要找到为 1 的那一位为止
    while ((refer & mask) === 0) {
        mask = mask << 1;
    }

    let a = 0;
    let b = 0;
    for (let num of nums) {
        // 110 & 010 是 10 是 2 啊，不是 1 啊，我们能看的只是相与是不是 0，只要不是 0 的都是一组，比如：100 & 010 是 0
        // if ((num & mask) === 1) {
        if ((num & mask) === 0) {
            a ^= num;
        } else {
            b ^= num;
        }
    }
    return [a,b];
};
