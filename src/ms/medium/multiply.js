/**
 * 43. 字符串相乘
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

    示例 1:
    输入: num1 = "2", num2 = "3"
    输出: "6"
    
    示例 2:
    输入: num1 = "123", num2 = "456"
    输出: "56088"
    
    说明：
    num1 和 num2 的长度小于110。
    num1 和 num2 只包含数字 0-9。
    num1 和 num2 均不以零开头，除非是数字 0 本身。
    不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

    链接：https://leetcode-cn.com/problems/multiply-strings
*/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
export var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    let sum = '';
    let len1 = num1.length;
    let len2 = num2.length;
    for (let i = len2 - 1; i >= 0; i--) {
        let carry = 0;
        let tempSum = '';
        let n2 = +num2[i];
        for (let j = len1 - 1; j >= 0; j--) {
            let n1 = +num1[j];
            // 注意 % 是加数，/ 才是 进位啊
            let cur = (n1 * n2 + carry) % 10;
            // carry = parseInt(n1 * n2 + carry) / 10; // 傻 啊
            carry = parseInt((n1 * n2 + carry) / 10);
            tempSum = cur + tempSum;
        }
        // 最后的进位，不能因为位数遍历完了而忘记啊
        if (carry) tempSum = carry + tempSum;
        // 是大数，这里不能直接相加，还得写个大数相加的算法..
        // 取的第二个乘数的倒数  i位，所以这里 tempSum 补后面的 0
        for (let t = 0; t < len2-1-i; t++) {
            tempSum += '0';
        }

        sum = addNum(tempSum, sum);
    }
    return sum;
};

// 大数相加
function addNum(str1, str2) {
    let arr1 = str1.split('').reverse();
    let arr2 = str2.split('').reverse();
    let maxLen = Math.max(arr1.length, arr2.length);
    let carry = 0;
    let sum = [];
    for (let i = 0; i < maxLen; i++) {
        let a = +arr1[i] || 0;
        let b = +arr2[i] || 0;
        sum.push((a+b+carry) % 10);
        carry = parseInt((a+b+carry) / 10);
    }
    if (carry) sum.push(carry);
    return sum.reverse().join('');
}
