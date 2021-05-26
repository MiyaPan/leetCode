/**
 * 22. 括号生成
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

    示例 1：
    输入：n = 3
    输出：["((()))","(()())","(())()","()(())","()()()"]
    
    示例 2：
    输入：n = 1
    输出：["()"]

    提示：
    1 <= n <= 8
    链接：https://leetcode-cn.com/problems/generate-parentheses
*/
// TODO: 三刷
/**
 * 动态规划思路：
 * 动态规划：
    dp[i]表示i组括号的所有有效组合
    dp[i] = "(dp[p]的所有有效组合)+【dp[q]的组合】"，其中 1 + p + q = i , p从0遍历到i-1, q则相应从i-1到0
*/
// https://leetcode-cn.com/problems/generate-parentheses/solution/ru-men-ji-bie-de-hui-su-fa-xue-hui-tao-lu-miao-don/
/**
 * =============================
 * 二刷
*/
var generateParenthesis = function(n) {
    let ans = [];
    dfs('', 0, 0, n, ans);
    return ans;
}
function dfs(cur, lc, rc, n, ans) {
    if (lc > n || rc > n) return;
    if (lc < rc) return;
    if (lc === n && rc === n) {
        ans.push(cur);
        return;
    }
    dfs(cur+'(', lc+1, rc, n, ans);
    dfs(cur+')', lc, rc+1, n, ans);
}








/**
 * =============================
 * 一刷
*/
// 动态规划解法：https://leetcode-cn.com/problems/generate-parentheses/solution/di-gui-he-dong-tai-gui-hua-liang-chong-fang-shi-tu/
var generateParenthesis = function(n) {
    if (n === 0) return [];

    let ans = [];
    generator(n, 0, 0, '', ans);
    return ans;
};

function generator(n, lc, rc, s, ans) {
    if (lc > n || rc > lc || rc > n) return;

    if (lc === n && rc === n) ans.push(s);

    if (lc < n) {
        generator(n, lc + 1, rc, s + '(', ans);
    }
    if (rc < lc) {
        generator(n, lc, rc + 1, s + ')', ans);
    }
}

// 不对！
// var generateParenthesis = function(n) {
//     if (n === 0) return [];

//     let base = ['()'];
//     let i = 1;
//     while(i < n) {
//         base = generator(base);
//         i++;
//     }
//     return base.sort();
// };

// function generator(base) {
//     let result = [];
//     result.push('()' + base[0]);
//     result.push('(' + base[0] + ')');

//     for (let i = 1; i < base.length; i++) {
//         result.push('()' + base[i]);
//         result.push(base[i] + '()');
//         result.push('(' + base[i] + ')');
//     }
//     return result;
// }
