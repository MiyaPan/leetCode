/**
 * 剑指 Offer 38. 字符串的排列
 * https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/
*/
var permutation = function(s) {
    if (s === '') return [];

    let arr = s.split('');
    let n = arr.length;
    let visited = Array(n).fill(false);
    let ans = [];
    let path = [];

    // 要在过程中剪枝，别忘了排序啊，不然两个相同不相邻的就判断不出了
    arr.sort((a, b) => a === b ? 0 : a < b ? -1 : 1);

    dfs(arr, visited, path, ans);

    return ans;
};
function dfs(arr, visited, path, ans) {
    let isAllUsed = visited.every(item => !!item);
    if (isAllUsed) {
        ans.push(path.join(''));
    }

    let pre = null;
    for (let i = 0; i < arr.length; i++) {
        if (visited[i] || arr[i] === pre) continue;

        visited[i] = true;
        path.push(arr[i]);

        dfs(arr, visited, path, ans);
        pre = arr[i];

        path.pop();
        visited[i] = false;
    }
}
