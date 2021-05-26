/**
 * 974. 和可被 K 整除的子数组
 * 给定一个整数数组 A，返回其中元素之和可被 K 整除的（连续、非空）子数组的数目。

    示例：
    输入：A = [4,5,0,-2,-3,1], K = 5
    输出：7
    解释：
    有 7 个子数组满足其元素之和可被 K = 5 整除：
    [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
     
    提示：
    1 <= A.length <= 30000
    -10000 <= A[i] <= 10000
    2 <= K <= 10000

    链接：https://leetcode-cn.com/problems/subarray-sums-divisible-by-k
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 桶排序思想的另一个：220. 存在重复元素 III。是差 <= k && index 差 <= t，所以需要记录的不是 mod，而是商，看商落到一个桶的就对
// 这个是看 mod， 
var subarraysDivByK = function(nums, k) {
    // A = [4,5,0,-2,-3,1], K = 5
    let map = {};
    let sum = 0;
    let ans = 0;
    // 初始化 0，解决 num 自身能整除的情况
    map['0'] = 1;
    // [-5], 5
    for (let num of nums) {
        sum += num;
        let id = getBucketId(sum, k);
        if (map[id]) {
            ans += map[id];
            map[id]++;
        } else {
            map[id] = 1;
        }
    }
    return ans;
};
function getBucketId(value, k) {
    let mod = value % k;
    // 如果是负数，转成正数，+k 其实不影响 mod，而实质上，mod -4 和 1 之间的元素是可以整除的，因为相减得 5，说明中间的元素正可以
    // 如果不修正负数，会导致， -mod 始终不能和正的一起计算，会漏掉
    // return value > 0 ? mod : k + mod;
    // -5 % 5 = -0，这个时候 +5 就返回 5 了，就不对了，所以要：
    // 这个还不够，比如 -1，-9，-4，k=9：-10加上k也还是负数
    // return (value + k) % k;
    return (value % k + k) % k;
}
