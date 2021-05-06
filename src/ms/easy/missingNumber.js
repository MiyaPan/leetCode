/**
 * 268. 丢失的数字
 * 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

    进阶：
    你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?

    示例 1：
    输入：nums = [3,0,1]
    输出：2
    解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
    
    示例 2：
    输入：nums = [0,1]
    输出：2
    解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
    
    示例 3：
    输入：nums = [9,6,4,2,3,5,7,0,1]
    输出：8
    解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
    
    示例 4：
    输入：nums = [0]
    输出：1
    解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。

    提示：
    n == nums.length
    1 <= n <= 104
    0 <= nums[i] <= n
    nums 中的所有数字都 独一无二

    链接：https://leetcode-cn.com/problems/missing-number
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// 线性不是跑一遍哦！！！是可以跑常数遍！！！
// 解法1：傻啊，求和啊
// 解法2：异或
/**
 * 1 ^ 0 = 1
 * 0 ^ 0 = 0
 * 1 ^ 1 = 0
 * 0 ^ 1 = 1
 * 异或遵循规律
 * 1. 任何数和 0 异或 得自己
 * 2. 任何数和 1 异或得 相反数
 * 3. a ^ b ^ c = a ^ c ^ b : 异或满足交换定律
 * 
 * 和同一个数异或两次，得自己
 * 参考：https://leetcode-cn.com/problems/missing-number/solution/ha-xi-ji-he-wei-yun-suan-by-nai-si-tu-mi-wv1p/
*/
var missingNumber = function(nums) {
    let n = nums.length;
    
    // 0 和任何数异或才不影响，所以默认值是 0，不是 1
    // let xor = 1
    let xor = 0;
    // 和 0...n 的每一个数字异或
    for (let i = 0; i <= n; i++) {
        xor ^= i;
    }
    // 再个每个数组元素异或
    // 由于异或满足交换律，所以两次异或了相同的数字就被消除了，恢复默认值 0
    // 最后剩下一个不能被异或消除的，就是丢失的
    for (let num of nums) {
        xor ^= num;
    }
    // log 是以自然对数 e 为底；log2() 是以 2 为底
    // 换底公式：log以 a 为底的 b 的对数 = log 以 c 为底的 b 除以 log 以 c 为底的 a
    // return Math.log(2, sum);
    return xor;
};
