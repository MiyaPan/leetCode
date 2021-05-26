/**
 * 17. 电话号码的字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
    给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
    1(!@#)  2(abc) 3(def)
    4(ghi)  5(jkl) 6(mno)
    7(pqrs) 8(tuv) 9(wxyz)
    * 0 #

    示例:
    输入："23"
    输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
    说明: 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

    链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
*/
/**
 * =============================
 * 二刷
*/
var letterCombinations = function(digits) {
    if (digits.length === 0) return [];
    const map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };
    let ans = [''];
    for (let i = 0; i < digits.length; i++) {
        let temp = [];
        let chars = map[digits[i]];
        ans.forEach(item => {
            chars.forEach(char => {
                temp.push(item+char);
            })
        });
        ans = temp;
    }
    return ans;
}













/**
 * =============================
 * 一刷
*/
var letterCombinations = function(digits) {
    if(digits.length === 0) return [];
    const map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };

    let result = [''];
    for(const digit of digits) {
        let temp = [];
        map[digit].forEach(char => {
            result.forEach(combined => {
                temp.push(combined + char);
            });
        });

        result = temp;
    }

    return result;
};
