/**
 * 22. 括号生成
 * https://leetcode-cn.com/problems/generate-parentheses/
*/
// https://leetcode-cn.com/problems/generate-parentheses/solution/ru-men-ji-bie-de-hui-su-fa-xue-hui-tao-lu-miao-don/

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
