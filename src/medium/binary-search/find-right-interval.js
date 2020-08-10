/**
 * 436. 寻找右区间
 * https://leetcode-cn.com/problems/find-right-interval/
*/
// 输入: [ [3,4], [2,3], [1,2] ]
// 输出: [-1, 0, 1]
// 解释:对于[3,4]，没有满足条件的“右侧”区间。
// 对于[2,3]，区间[3,4]具有最小的“右”起点;
// 对于[1,2]，区间[2,3]具有最小的“右”起点。
// 思路：先对所有区间排序，排序前需要保留原本的 index 信息，所以用 map 保存
var findRightInterval = function(intervals) {
    let n = intervals.length;
    if (n === 0) return [-1];
    if (n === 1) return [-1];

    let map = new Map();
    intervals.forEach((item, index) => {
        map.set(item, index);
    });

    // 从排序可以看出我们只关心 item[0]，所以我们可以不用 map，直接用数组，保留每个 item 的 0 就行
    intervals.sort((a,b) => a[0] - b[0]);

    let ans = [];
    for (let i = 0; i < n; i++) {
        let curLen = intervals[i].length;
        let a = binarySearch(intervals[i][curLen-1], intervals, n);
        let index = a === -1 ? -1 : map.get(intervals[a]);
        ans[map.get(intervals[i])] = index;
    }

    return ans;
};

function binarySearch(target, intervals, n) {
    let l = 0;
    let r = n-1;
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (intervals[m][0] >= target) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return l >= n ? -1 : l;
}
