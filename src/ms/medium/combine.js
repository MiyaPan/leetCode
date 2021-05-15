/**
 * 77. 组合
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

    示例:
    输入: n = 4, k = 2
    输出:
    [
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4],
    ]

    链接：https://leetcode-cn.com/problems/combinations
*/
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
/**
 * =============================
 * 二刷
*/
export var combine = function(n, k) {
    let path = [];
    let ans = [];
    dfs(n, k, 1, path, ans);
    return ans;
}
function dfs(n, k, startIdx, path, ans) {
    for (let i = startIdx; i <= n; i++) {
        if (k === 1) {
            ans.push([...path, i]);
        } else if (k > 1) {
            path.push(i);
            dfs(n, k-1, i+1, path, ans);
            path.pop();
        }
    }
}




/**
 * =============================
 * 一刷
*/
// 思路很对的，dfs 的 for 那里刚开始的时候还记着 直接剪枝来着，咋就忘了
// 思路：画树，每个节点的子节点，只能是 大于自己的数，就完了
export var combine = function(n, k) {
    // 1, 1 这个 case 决定去掉下面这行
    // if (k >= n) return Array(n).fill(null).map(i => i+1);
    let ans = [];
    let paths = [];
    dfs(1, n, paths, 1, k, ans);
    return ans;
};

function dfs(start, end, paths, dept, k, ans) {
    for (let i = start; i <= end; i++) {
        paths.push(i);
        if (dept === k) {
            // 字符串转数组
            ans.push([...paths]);
        } else {
            dfs(i+1, end, paths, dept+1, k, ans);
        }
        paths.pop();
    }
}
