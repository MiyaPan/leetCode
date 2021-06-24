/**
 * 剑指 Offer 20. 表示数值的字符串
 * 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
    数值（按顺序）可以分成以下几个部分：

    1. 若干空格
    2. 一个 小数 或者 整数
    3. （可选）一个 'e' 或 'E' ，后面跟着一个 整数
    4. 若干空格

    小数（按顺序）可以分成以下几个部分：
        1.（可选）一个符号字符（'+' 或 '-'）
        2. 下述格式之一：
            至少一位数字，后面跟着一个点 '.'
            至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
            一个点 '.' ，后面跟着至少一位数字
    
    整数（按顺序）可以分成以下几个部分：
        1.（可选）一个符号字符（'+' 或 '-'）
        2. 至少一位数字
    
    部分数值列举如下：
    ["+100", "5e2", "-123", "3.1416", "-1E-16", "0123"]
    
    部分非数值列举如下：
    ["12e", "1a3.14", "1.2.3", "+-5", "12e+5.4"]
     
    示例 1：
    输入：s = "0"
    输出：true
    
    示例 2：
    输入：s = "e"
    输出：false
    
    示例 3：
    输入：s = "."
    输出：false
    
    示例 4：
    输入：s = "    .1  "
    输出：true

    提示：
    1 <= s.length <= 20
    s 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，空格 ' ' 或者点 '.' 。

    链接：https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof
*/
// TODO: 三刷！
// 一个自动机，总能够回答某种形式的「对于给定的输入字符串 S，判断其是否满足条件 P」的问题。
// 在本题中，条件 P 即为「构成合法的表示数值的字符串」。
// 怎么挖掘出所有可能的状态呢？一个常用的技巧是，用「当前处理到字符串的哪个部分」当作状态的表述。
// 注意 +.12 这种 case，如果符号后面跟 . 的话，必须至少有一个数字才有效，也就是得多加一个状态，这个状态就接受一个数字，再来一个就可以到小数部分了
var isNumber = function(s) {
    const STATE = {
        START: 1,
        INT_SIGN: 2,
        INT: 3,
        DECIMAL: 4,
        EXPONENT: 5,
        EXP_SIGN: 6,
        EXP_INT: 7,
        END: 8,
        // 注意 +.12 这种 case，如果符号后面跟 . 的话，必须至少有一个数字才有效，也就是得多加一个状态，
        // 这个状态就接受一个数字，再来一个就可以到小数部分了
        NO_INT_BEFORE_DOT: 9
    };
    const CHARTYPE = {
        SPACE: 1,
        NUM: 2,
        DOT: 3,
        EXP: 4,
        SIGN: 5,
        ILLEGAL: 6
    }
    const transferMap = {
        [STATE.START]: {
            [CHARTYPE.SPACE]: STATE.START,
            [CHARTYPE.NUM]: STATE.INT,
            [CHARTYPE.DOT]: STATE.NO_INT_BEFORE_DOT,
            [CHARTYPE.SIGN]: STATE.INT_SIGN
        },
        [STATE.INT_SIGN]: {
            [CHARTYPE.NUM]: STATE.INT,
            [CHARTYPE.DOT]: STATE.NO_INT_BEFORE_DOT
        },
        [STATE.INT]: {
            [CHARTYPE.SPACE]: STATE.END,
            [CHARTYPE.NUM]: STATE.INT,
            [CHARTYPE.DOT]: STATE.DECIMAL,
            [CHARTYPE.EXP]: STATE.EXPONENT
        },
        [STATE.DECIMAL]: {
            [CHARTYPE.SPACE]: STATE.END,
            [CHARTYPE.NUM]: STATE.DECIMAL,
            [CHARTYPE.EXP]: STATE.EXPONENT
        },
        [STATE.EXPONENT]: {
            [CHARTYPE.NUM]: STATE.EXP_INT,
            [CHARTYPE.SIGN]: STATE.EXP_SIGN
        },
        [STATE.EXP_SIGN]: {
            [CHARTYPE.NUM]: STATE.EXP_INT
        },
        [STATE.EXP_INT]: {
            [CHARTYPE.SPACE]: STATE.END,
            [CHARTYPE.NUM]: STATE.EXP_INT
        },
        [STATE.END]: {
            [CHARTYPE.SPACE]: STATE.END
        },
        // 注意 +.12 这种 case，如果符号后面跟 . 的话，必须至少有一个数字才有效，也就是得多加一个状态，
        // 这个状态就接受一个数字，再来一个就可以到小数部分了
        [STATE.NO_INT_BEFORE_DOT]: {
            [CHARTYPE.NUM]: STATE.DECIMAL
        }
    }

    const getCharType = (char) => {
        switch (char) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return CHARTYPE.NUM;
            case ' ':
                return CHARTYPE.SPACE;
            case '+':
            case '-':
                return CHARTYPE.SIGN;
            case '.':
                return CHARTYPE.DOT;
            case 'e':
            case 'E':
                return CHARTYPE.EXP;
        }
    };
    
    let state = STATE.START;
    for (let i = 0; i < s.length; i++) {
        const type = getCharType(s[i]);
        let nextState = transferMap[state][type];
        if (nextState) {
            state = nextState;
        } else {
            return false;
        }
    }

    return state === STATE.INT
        || state === STATE.DECIMAL
        || state === STATE.EXP_INT
        || state === STATE.END;
}

// 正则你还是别写了没把握，还各种细节要查，这题考的是有限自动机
var isNumber = function(s) {
    s = s.trim();
    let arr = s.split(/[eE]/g);
    if (arr.length > 2) return false;
    return arr.length === 2 && (isInt(arr[0]) || isDigit(arr[0])) && isInt(arr[1])
        || arr.length === 1 && (isInt(arr[0]) || isDigit(arr[0]));
};
function isInt(s) {
    if (s.length === 0) return false;
    let reg = /^[\+\-]?[0-9]+$/g;
    return reg.test(s);
}
function isDigit(s) {
    if (s.length === 0) return false;
    // let reg = /^[+-]?[0-9]*[\.][0-9]*$/g;
    let reg = /^[+-]?(\d+\.|\.\d+|\d+\.\d+)$/g;
    return reg.test(s);
}
