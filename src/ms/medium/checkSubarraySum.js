/**
 * 523. 连续的子数组和
 * https://leetcode-cn.com/problems/continuous-subarray-sum/
 * 给定一个包含 非负数 的数组和一个目标 整数 k，编写一个函数来判断该数组是否含有连续的子数组，其大小至少为 2，
 * 且总和为 k 的倍数，即总和为 n*k，其中 n 也是一个整数。

    示例 1：
    输入：[23,2,4,6,7], k = 6
    输出：True
    解释：[2,4] 是一个大小为 2 的子数组，并且和为 6。

    示例 2：
    输入：[23,2,6,4,7], k = 6
    输出：True
    解释：[23,2,6,4,7]是大小为 5 的子数组，并且和为 42。
     
    说明：
    数组的长度不会超过 10,000 。
    你可以认为所有数字总和在 32 位有符号整数范围内。
*/
// TODO: 三刷！
/**
 * =============================
 * 二刷
*/
export const checkSubarraySum = (nums, k) => {
    // 我们假设 (presum[j+1] - presum[i] ) % k == 0；则
    // presum[j+1] % k - presum[i] % k == 0;
    // presum[j +1] % k = presum[i] % k ;
    // 其实说人话就是：如果有一个前缀和取模是 x，现在又有一个取模是 x，那，把这两个前缀和相减得到的区间就是正好整除的
    // 参考：https://leetcode-cn.com/problems/continuous-subarray-sum/solution/de-liao-wo-ba-qian-zhui-he-miao-de-gan-g-c8kp/
    if (k === 0) return true;

    let n = nums.length;
    // let sums = Array(n).fill(-1);
    let sum = 0;
    let map = {};
    // 坑：需要考虑前缀和本身就可以被k整除
    // 直接引入一个初始化0->-1,这样子是保证如序号1的时候1-(-1)=2 >=2 这个时候就可以返回结果了
    map['0'] = -1;
    // [23,2,4,6,6], 7
    for (let i = 0; i < n; i++) {
        // sums[i] = (sums[i-1] || 0) + nums[i];
        // let mod = sums[i]%k;
        sum += nums[i];
        let mod = sum % k;
        // map['0'] = -1 也可以替换为这个判断
        // if (mod === 0 && i !== 0) return true;
        // 这样判断 map[mod] 指向index 0 的时候进不去啊
        // if (map[mod]) {
        if (map[mod] !== undefined) {
            // return map[mod] - i >= 2;
            // return i - map[mod] >= 2;
            if (i - map[mod] >= 2) return true;
        } else {
            map[mod] = i;
        }
    }
    
    return false;
}
console.log('map:%s;i:%s;mod:%s',map,i,mod)
var checkSubarraySum = function(nums, k) {
    var map = new Map()
    map.set(0, -1);
    var sum = 0
    for(var i = 0 ; i < nums.length; i++){
        sum+= nums[i]
        if(k != 0){
            sum = sum % k
        }
        if(map.has(sum)){
            if(i - map.get(sum) > 1){
                return true
            }
        }else {
           map.set(sum, i) 
        }          
    }
    return false

};
// 下面这个最后一个case还是超时了，就非让用 map 呗
export const checkSubarraySum = (nums, k) => {
    let n = nums.length;
    // dp 可以用一维，去推算，二维数组超堆栈了
    let sums = Array(n).fill(-1);
    sums[0] = nums[0];
    for (let i = 1; i < n; i++) {
        sums[i] = sums[i-1] + nums[i];
    }
    // let dp = Array(n).fill(null).map(_ => Array(n).fill(-1));
    for (let i = 0; i < n-1; i++) {
        for (let j = i+1; j < n; j++) {
            // if (j === i) {
            //     dp[i][j] = nums[i];
            // } else {
            //     dp[i][j] = dp[i][j-1] + nums[j];
            //     // 子数组大小至少为 2 才算
            //     if (dp[i][j] % k === 0) return true;
            // }
            let sum = sums[j] - sums[i] + nums[i];
            if (sum % k === 0) return true;
        }
    }
    return false;
}

/**
 * =============================
 * 一刷
*/
export const checkSubarraySum = (nums, k) => {
    let n = nums.length;
    let sums = [nums[0]];
    for (let i = 1; i < n; i++) sums[i] = sums[i-1] + nums[i];

    for (let i = 0; i < n-1; i++) {
        for (let j = i + 1; j < n; j++) {
            // 下面这个 sum 包含 num[j] 不包含 num[i]
            // let sum = sums[j] - sums[i];
            let sum = sums[j] - sums[i] + nums[i];
            if (sum % k === 0) return true;
        }
    }
    return false;
}