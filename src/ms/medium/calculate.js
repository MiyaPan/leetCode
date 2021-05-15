 /**
 * 227. 基本计算器 II
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
    整数除法仅保留整数部分。

    示例 1：
    输入：s = "3+2*2"
    输出：7
    
    示例 2：
    输入：s = " 3/2 "
    输出：1
    
    示例 3：
    输入：s = " 3+5 / 2 "
    输出：5

    提示：
    1 <= s.length <= 3 * 105
    s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
    s 表示一个 有效表达式
    表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内
    题目数据保证答案是一个 32-bit 整数

    链接：https://leetcode-cn.com/problems/basic-calculator-ii
*/
/**
 * @param {string} s
 * @return {number}
 */
/**
 * =============================
 * 二刷
*/
export var calculate = function(s) {
    let map = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    s = s.replace(/\s/g, '');
    let n = s.length;
    let numStack = [];
    let oprStack = [];
    for (let i = 0; i < n; i++) {
        let char = s[i];
        if (!isNaN(+s[i])) {
            let str = '';
            while (!isNaN(+s[i]) && i < n) {
                str += s[i];
                i++;
            }
            // 上面的 i++ 和 for 的重了
            i--;
            numStack.push(+str);
        } else {
            // 优先级高于或者同级的先计算掉，因为同级的也会被计算掉，所以就相当于同级别的从左向右计算了
            while (oprStack.length > 0 && map[oprStack[oprStack.length-1]] >= map[char]) {
                let opr = oprStack.pop();
                let n2 = numStack.pop();
                let n1 = numStack.pop();
                numStack.push(calcul(n1, n2, opr));
            }
            oprStack.push(char);
        }
    }
    while (oprStack.length > 0) {
        let opr = oprStack.pop();
        let n2 = numStack.pop();
        let n1 = numStack.pop();
        numStack.push(calcul(n1, n2, opr));
    }
    return numStack[0];
}
function calcul(n1, n2, opr) {
    switch (opr) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            return parseInt(n1 / n2);
    }
}









/**
 * =============================
 * 一刷
*/
// 思路是对的，这个算法最后一个 case 超时了，参考【很不错，总结了一整个类型】：https://leetcode-cn.com/problems/basic-calculator-ii/solution/shi-yong-shuang-zhan-jie-jue-jiu-ji-biao-c65k/
// 为了减少判断运算，开始之前先把能 replace 的 replace 掉，比如空格，比如 ( 左括号后的 -或+ 号，替换成 0-或+
// 最后剩下的加减法，要从左到右，为了避免从左到右，将 - 号入栈负数是唯一解了！ 
export var calculate1 = function(s) {
    s.replace(/\s+/g, '');
    let n = s.length;
    let numStack = [];
    let oprStack = [];

    // 第二个操作数是后于 操作符 入栈的，所以入操作符的时候拿不到右操作数，所以：改成每次数字入栈的时候，判断顶端操作符
    // 如果是第一优先级的（乘除）就先操作了；第二优先级的再单独处理
    // **这里更好的思路是：不是在拿数的时候判断，而是在拿每个运算符的时候判断，判断当前运算符的优先级是不是 <= 栈顶，如果 <= 就可以把栈内的算了，这就是自然顺序的描述。
    // 注意：不是这个运算符级别高于栈顶，不是这样就能保持始终计算高优先级了哦！不是哦，这行是错的思路哦
    // 参考【很不错，总结了一整个类型】：https://leetcode-cn.com/problems/basic-calculator-ii/solution/shi-yong-shuang-zhan-jie-jue-jiu-ji-biao-c65k/
    let i = 0;
    while (i < n) {
        let str = s[i];
        // if (str === ' ') {
        //     i++;
        //     continue;
        // }
        while(!isNaN(str) && !isNaN(+s[i+1])) {
            str += s[i+1];
            i++;
        }

        if (!isNaN(+str)) {
            numStack.push(+str);
            let opr = oprStack[oprStack.length-1];
            if (opr === '*' || opr === '/') {
                let n2 = numStack.pop();
                let n1 = numStack.pop();
                numStack.push(calcu(n1, n2, opr));
                oprStack.pop();
            }
        } else {
            oprStack.push(str);
        }
        i++;
    }

    // 只剩加减了，不能从右向左计算，要从左向右，比如：1-1+1
    while(numStack.length > 1) {
        let n1 = numStack.shift();
        let n2 = numStack.shift();
        let opr = oprStack.shift();
        numStack.unshift(calcu(n1, n2, opr));
    }
    return numStack[0];
};

export var calculate2 = function(s) {
    s.replace(/\s+/g, '');
    let n = s.length;
    const map = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    let numStack = [];
    let oprStack = [];

    let i = 0;
    while (i < n) {
        let str = s[i];
        let preSign = s[i-1] || '+';
        while(!isNaN(str) && !isNaN(+s[i+1])) {
            str += s[i+1];
            i++;
        }

        if (!isNaN(+str)) {
            let num = preSign === '-' ? -str : +str;
            numStack.push(num);
        } else {
            let preOpr = oprStack[oprStack.length-1];
            // 因为是先计算栈内的操作符，所以可以保证从左到右
            while (oprStack.length && map[preOpr] >= map[str]) {
                let n2 = numStack.pop();
                let n1 = numStack.pop();
                let opr = oprStack.pop();
                numStack.push(calcu(n1, n2, opr));
                preOpr = oprStack[oprStack.length-1];
            }
            // - 号放了负数，所以符号要入栈 +
            let sign = str === '-' ? '+' : str;
            oprStack.push(sign);
        }
        i++;
    }
    // 最后剩下的加减法，要从左到右，为了避免从左到右，将 - 号入栈负数是唯一解了！
    while(numStack.length > 1) {
        let n2 = numStack.pop();
        let n1 = numStack.pop();
        let opr = oprStack.pop();
        numStack.push(calcu(n1, n2, opr));
    }
    return numStack[0];
};

function calcu(n1, n2, opr) {
    switch (opr) {
        case '+':
            return n1+n2;
        case '-':
            return n1-n2;
        case '*':
            return n1*n2;
        case '/':
            // parseInt 才是正确的取整，对于负数来说，floor 就取更小了啊
            // return Math.floor(n2/n1);
            return parseInt(n1/n2);
    }
}
