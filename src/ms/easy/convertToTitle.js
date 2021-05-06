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
/**
 * =============================
 * 二刷
*/
export var convertToTitle = function(n) {
    // A：65；a：97！！！！！
    let s = '';
    while (n > 0) {
        // if ( n === 26) {
        //     s = String.fromCharCode(n + 65 - 1) + s;
        //     break;
        // }
        let cur = n % 26;
        // 问题是这里面没有 0，得处理余 0 的情况，当前位要留下 26，总数减去 26
        if (cur === 0) {
            cur = 26;
            n -= 26;
        }
        // s += fromCharCode(cur + 65);
        // 65 已经是 A 了，多了一
        s = String.fromCharCode(cur + 65 - 1) + s;
        n = parseInt(n/26);
    }

    return s;
};

/**
 * =============================
 * 二刷
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
