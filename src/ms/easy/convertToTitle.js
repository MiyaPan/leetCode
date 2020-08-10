/**
 * 168. Excel表列名称
 * 给定一个正整数，返回它在 Excel 表中相对应的列名称。

    例如，

        1 -> A
        2 -> B
        3 -> C
        ...
        26 -> Z
        27 -> AA
        28 -> AB 
        ...

    示例 1:
    输入: 1
    输出: "A"

    示例 2:
    输入: 28
    输出: "AB"

    示例 3:
    输入: 701
    输出: "ZY"

    链接：https://leetcode-cn.com/problems/excel-sheet-column-title
*/
// 不就是转 26 进制数吗
export var convertToTitle = function(n) {
    let result = '';
    let mod = 0;

    while(n > 0) {
        mod = n % 26;
        n = parseInt(n / 26);
        // 52 这种正好整除的，应该为 az
        if (mod === 0) {
            n -= 1;
            mod = 26;
        }
        result = getChar(mod) + result;
    }

    return result;
};

function getChar(num) {
    return String.fromCharCode(65 - 1 + num);
}
