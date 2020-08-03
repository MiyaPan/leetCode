/**
 * 911. 在线选举
 * https://leetcode-cn.com/problems/online-election/
 * 输入：["TopVotedCandidate","q","q","q","q","q","q"], [[[0,1,1,0,0,1,0],[0,5,10,15,20,25,30]],[3],[12],[25],[15],[24],[8]]
    输出：[null,0,1,1,0,0,1]
    解释：
    时间为 3，票数分布情况是 [0]，编号为 0 的候选人领先。
    时间为 12，票数分布情况是 [0,1,1]，编号为 1 的候选人领先。
    时间为 25，票数分布情况是 [0,1,1,0,0,1]，编号为 1 的候选人领先（因为最近的投票结果是平局）。
    在时间 15、24 和 8 处继续执行 3 个查询。
    链接：https://leetcode-cn.com/problems/online-election
*/
/**
 * @param {number[]} persons
 * @param {number[]} times
 */
// TODO: 没通过全部用例，不做了，debug 太烦了
// 选举人不止 0 和 1
// [[[0,0,1,1,2],[0,67,69,74,87]],[4],[62],[100],[88],[70],[73],[22],[75],[29],[10]]
var TopVotedCandidate = function(persons, times) {
    let result = [];
    let map = new Map();
    for (let i = 0; i < persons.length; i++) {
        if (!map.get(persons[i])) {
            map.set(persons[i], 1)
        } else {
            map.set(persons[i], map.get(persons[i]) + 1)
        }

        // 用 map.size
        // let candidateCount = map.keys().length;
        let candidateCount = map.size;
        if (map.get(persons[i]) >= (i+1)/candidateCount) {
            result[i] = persons[i];
        } else {
            result[i] = result[i-1] === undefined ? persons[i] : result[i-1];
        }
    }

    this.result = result;
    this.times = times;
};

/** 
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function(t) {
    // 找到小于等于 t 的最大值
    let n = this.times.length;
    let l = 0;
    let r = this.times[n-1];
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (this.times[m] === t) return this.result[m];
        if (this.times[m] < t) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return this.result[r];
};

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */