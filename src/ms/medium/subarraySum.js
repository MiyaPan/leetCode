/**
 * 560. 和为K的子数组
 * https://leetcode-cn.com/problems/subarray-sum-equals-k/
*/
export var subarraySum = function(nums, k) {
    let len = nums.length;
    // 超内存了，其实 dp 可以优化，因为只依赖前面一个
    // let dp = Array(len).fill(null).map(_ => Array(len).fill(0));

    // let ans = 0;
    // for (let i = 0; i < len; i++) {
    //     for (let j = i; j < len; j++) {
    //         if (j === i) {
    //             dp[i][j] = nums[i];
    //         } else {
    //             dp[i][j] = dp[i][j-1] + nums[j];
    //         }
    //         if (dp[i][j] === k) {
    //             ans++;
    //         }
    //     }
    // }
    // return ans;

    let ans = 0;
    let pre = 0;
    let cur = 0;
    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (j === i) {
                cur = nums[i];
            } else {
                cur = pre + nums[j];
            }
            pre = cur;
            if (cur === k) {
                ans++;
            }
        }
    }
    return ans;
};

// 前缀和思路：由于不关系解的结构，只关心数目，所以可以用 map 保存相同前缀的数目

var subarraySum = function(nums, k) {
    let len = nums.length;
    let count = 0;
    let pre = 0;
    let map = new Map();
    // [1,1,1], 2: 不 set 0 的初始值的话会少统计一次最开始找到的那个，pre-k 是会 为 0 的
    map.set(0, 1);

    for(let i = 0; i <len; i++) {
        pre += nums[i];
        if (map.get(pre-k)) {
            count += map.get(pre-k);
        }

        if (map.get(pre)) {
            map.set(pre, map.get(pre)+1);
        } else {
            map.set(pre, 1);
        }

        // 得先做这步，不然有些 case 会算多了
        // if (map.get(pre-k)) {
        //     count += map.get(pre-k);
        // }
    }
    return count;
}