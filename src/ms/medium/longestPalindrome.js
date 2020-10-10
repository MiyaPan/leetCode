/**
 * 5. 最长回文子串
 * https://leetcode-cn.com/problems/longest-palindromic-substring/
*/

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 输入: "cbbd"
// 输出: "bb"

// 中心扩散法：遍历所有元素去扩散
export const longestPalindrome = (s) => {
    if (s.length < 2) return s;
    let ans = '';
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        let sOdd = getMaxPalindrome(s, i-1, i+1);
        let sEven = getMaxPalindrome(s, i, i+1);
        let str = sOdd.length > sEven.length ? sOdd : sEven;
        if (str.length > maxLen) {
            maxLen = str.length;
            ans = str;
        }
    }
    return ans;
}

function getMaxPalindrome(s, start, end) {
    while(s[start] === s[end] && start >=0 && end < s.length) {
        start--;
        end++;
    }
    return s.substring(start+1, end);
}

// dp：因为小解能推到出大解，所以想到用动态规划
// 从动态转移方程看出，要想知道 s[i, j] 是不是回文，要先知道 s[i+1, j-1]，得先把 i+1 填上，i 要倒着遍历
// 所以，遍历顺序：画下二维表格就清楚了，依赖左下的元素，所以 i 要倒着遍历
export const longestPalindrome = (s) => {
    if (s.length < 2) return s;
    let ans = '';
    let maxLen = 0;
    let len = s.length;
    let dp = Array(len).fill(null).map(_ => Array(len).fill(false));
    for (let i = s.length - 1; i >= 0; i--) {
        dp[i][i] = true;
        // 一个的也要更新进来，不然 ‘ac’ 这有的会漏掉
        if (maxLen === 0) {
            maxLen = 1;
            ans = s.substring(i, i+1);
        }
        for (let j = i + 1; j < s.length; j++) {
            if (j === i + 1) {
                dp[i][j] = s[i] === s[j];
            } else {
                dp[i][j] = dp[i+1][j-1] && s[i] === s[j];
            }

            if (dp[i][j] && (j - i + 1) > maxLen) {
                maxLen = j - i + 1;
                ans = s.substring(i, j+1);
            }
        }
    }
    return ans;
}


