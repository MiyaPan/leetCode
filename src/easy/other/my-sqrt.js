/**
 * 69. x 的平方根
 * 实现 int sqrt(int x) 函数。计算并返回 x 的平方根，其中 x 是非负整数。
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 * 
 * 示例 1:
 * 
 * 输入: 4
 * 输出: 2
 * 示例 2:
 * 
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842..., 
 *      由于返回类型是整数，小数部分将被舍去。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/sqrtx
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * =============================
 * 二刷
*/
export const mySqrt = (x) => {
    if (x <= 1) return x;
    let l = 1;
    let r = parseInt(x/2);
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (m * m === x) {
            return m;
        } else if (m * m < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return r;
}

/**
 * =============================
 * 一刷
*/
// 二分查找，递归 - 打败 50.15%
export const mySqrt = (x) => {
    if (x<2) {
        return x;
    }
    return help(2, x, x);
}

function help(left, right, x) {
    if (left === right) {
        return left * left <= x ? left : left -1;
    }

    let mid = Math.trunc((left + right)/2);
    const square = mid * mid;
    if (square === x) {
        return mid;
    } else if (square > x) {
        return help(left, mid, x);
    } else {
        // 因为退出条件那里判断了如果当前的数平方大会返回 -1，所以这里可以抛弃 使 square < x 的 x
        return help(mid + 1, right, x);
    }
}

export const mySqrt1 = (x) => {
    if (x<2) {
        return x;
    }

    let left = 2;
    let right = x;
    let mid = 0;
    let square = 0;
    while(left <= right) {
        mid = Math.trunc((left+right)/2);
        square = mid * mid;
        if (square === x) {
            return mid;
        } else if (square > x) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    // 出了 while 的情况要单独讨论验证：是 square > x 的时候让 right 减一了，这个时候 right 就是
    return right;
}
