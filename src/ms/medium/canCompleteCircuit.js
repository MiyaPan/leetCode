/**
 * 134. 加油站
 * https://leetcode-cn.com/problems/gas-station/
*/
// 输入: 
// gas  = [2,3,4]
// cost = [3,4,3]

// 输出: -1

// 解释:
// 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
// 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
// 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
// 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
// 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
// 因此，无论怎样，你都不可能绕环路行驶一周。
export var canCompleteCircuit = function(gas, cost) {
    // [1,2,3,4,5]
    // [3,4,5,1,2]
    // 3
    let stationNum = gas.length;
    for(let i = 0; i < stationNum; i++) {
        let have = 0;
        let count = 0;
        let j = i;
        while(count < stationNum) {
            have = have + gas[j] - cost[j];
            j++;
            count++;
            if (j === stationNum) j = 0;
            if (have < 0) break;
        }
        if (count >= stationNum && have >= 0) return i;
    }
    return -1;
};
