/**
 * 66. 加一
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,3]
 * 输出: [1,2,4]
 * 解释: 输入数组表示数字 123。
 * 示例 2:
 * 
 * 输入: [4,3,2,1]
 * 输出: [4,3,2,2]
 * 解释: 输入数组表示数字 4321。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/plus-one
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 16.74%
export const plusOne = (digits) => {
    // 大数运算会失真，比如 [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
    // const newNum = Number(digits.join('')) + 1 + '';
    // return newNum.split('').map(num => Number(num));

    return helper(digits, digits.length - 1);
}

function helper(digits, lastIndex) {
    let sum = digits[lastIndex] + 1;
    if (sum > 9) {
        digits[lastIndex] = sum % 10;
        if (lastIndex === 0) {
            digits.unshift(1);
            return digits;
        }
        return helper(digits, lastIndex -1);
    } else {
        digits[lastIndex] = sum;
        return digits;
    }
}

// 耗时打败 53.34%
// 内存打败 100%
export const plusOne1 = (digits) => {
    let i = digits.length - 1;
    while(digits[i] === 9 && i >= 0) {
        digits[i] = 0;
        if (i === 0) {
            // 最后统一 +1，这里置 0
            digits.unshift(0);
            break;
        } else {
            i--;
        }
    }
    digits[i] = digits[i] + 1;
    return digits;
}
