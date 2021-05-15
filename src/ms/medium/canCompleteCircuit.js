/**
 * 134. 加油站
 * https://leetcode-cn.com/problems/gas-station/
*/
// 示例 1:

// 输入: 
// gas  = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 输出: 3

// 解释:
// 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
// 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
// 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
// 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
// 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
// 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
// 因此，3 可为起始索引。

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
/**
 * =============================
 * 二刷
*/
export var canCompleteCircuit = function(gas, cost) {
    // gas  = [1,2,3,4,5]
    // cost = [3,4,5,1,2]
    // 输出: 3
    let n = gas.length;
    for (let i = 0; i < n; i++) {
        if (canCircle(gas, cost, i)) return i;
    }
    return -1;
}
function canCircle(gas, cost, i) {
    if (gas[i] < cost[[i]]) return false;
    let n = gas.length;
    let j = i;
    let count = 0;
    let cur = 0;
    while (count < n) {
        cur += gas[j];
        if (cur < cost[j]) return false;
        cur -= cost[j];
        count++;
        j++;
        if (j === n) j = 0;
    }
    return count === n;
}

/**
 * =============================
 * 一刷
*/
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
