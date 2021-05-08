
/**
 * 367. 有效的完全平方数
 * 给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False。
    说明：不要使用任何内置的库函数，如  sqrt。

    示例 1：
    输入：16
    输出：True

    示例 2：
    输入：14
    输出：False

    链接：https://leetcode-cn.com/problems/valid-perfect-square
*/
/**
 * =============================
 * 二刷已刷，见 ms 文件夹
*/

/**
 * =============================
 * 一刷
*/
export const isPerfectSquare = (num) => {
    let r = num;
    // l 从 2开始?不用，答案是 2 开始的
    let l = 1;
    let mid = 0;

    while(l <=r) {
        mid = l+r >> 1;
        let t = mid*mid;
        if (t === num) {
            return true;
        } else if (t < num) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return false;
}
