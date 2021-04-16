/**
 * 528. 按权重随机选择
 * 给定一个正整数数组 w ，其中 w[i] 代表下标 i 的权重（下标从 0 开始），请写一个函数 pickIndex ，
 * 它可以随机地获取下标 i，选取下标 i 的概率与 w[i] 成正比。
    例如，对于 w = [1, 3]，挑选下标 0 的概率为 1 / (1 + 3) = 0.25 （即，25%），而选取下标 1 的概率为 3 / (1 + 3) = 0.75（即，75%）。

    也就是说，选取下标 i 的概率为 w[i] / sum(w) 。

    示例 1：
    输入：
    ["Solution","pickIndex"]
    [[[1]],[]]
    输出：
    [null,0]
    解释：
    Solution solution = new Solution([1]);
    solution.pickIndex(); // 返回 0，因为数组中只有一个元素，所以唯一的选择是返回下标 0。
    
    示例 2：
    输入：
    ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
    [[[1,3]],[],[],[],[],[]]
    输出：
    [null,1,1,1,1,0]
    解释：
    Solution solution = new Solution([1, 3]);
    solution.pickIndex(); // 返回 1，返回下标 1，返回该下标概率为 3/4 。
    solution.pickIndex(); // 返回 1
    solution.pickIndex(); // 返回 1
    solution.pickIndex(); // 返回 1
    solution.pickIndex(); // 返回 0，返回下标 0，返回该下标概率为 1/4 。

    由于这是一个随机问题，允许多个答案，因此下列输出都可以被认为是正确的:
    [null,1,1,1,1,0]
    [null,1,1,1,1,1]
    [null,1,1,1,0,0]
    [null,1,1,1,0,1]
    [null,1,0,1,0,0]
    ......
    诸若此类。

    提示：
    1 <= w.length <= 10000
    1 <= w[i] <= 10^5
    pickIndex 将被调用不超过 10000 次

    链接：https://leetcode-cn.com/problems/random-pick-with-weight
*/
/**
 * @param {number[]} w
 */
var Solution = function(w) {
    this.sum = 0;
    // 不用sort？是不能 sort 啊大姐，人家返回的是下标志，sort 了返回就不对啊
    // w.sort((a, b) => a-b);
    // 元素不单调，元素累加和就单调了啊
    this.w = w;
    this.sums = [0];
    w.forEach(item => {
        this.sum += item;
        this.sums.push(this.sum);
    });
};

/**
 * @return {number}
 */
// 不止是算出来，还要优化查询，用二分
Solution.prototype.pickIndex = function() {
    // 指定范围公式：Math.floor(Math.random()*(max-min+1)+min);
    // -1 是说生成 [1, sum] 闭区间的数字，+1 是为了包含上限
    let random = Math.floor(Math.random() * (this.sum - 1 + 1)) + 1;
    // 这个过程可以二分
    for (let i = 1; i < this.sums.length; i++) {
        if (random > this.sums[i-1] && random <= this.sums[i]) return i-1; // i 多了一个，所以要 -1
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
