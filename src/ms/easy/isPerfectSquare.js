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
 * 二刷
*/
export const isPerfectSquare = (num) => {
    // let l = 0;
    let l = 1;
    // let r = parseInt(num / 2);
    // r 可以从向上取整开始，这样就能包含 1 这个 case 了
    let r = ceil(num / 2);
    while (l <= r) {
        let mid = l + parseInt((r-l)/2);
        let temp = mid*mid;
        if (temp === num) return true;
        else if (temp < num) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}

/**
 * =============================
 * 一刷
*/
export const isPerfectSquare = (num) => {
    // 不能从 一半以下开始，就 1 这种情况不行啊，没别的了
    // let r = parseInt(num / 2);
    // 下面可以
    let r = Math.ceil(num/2);
    let l = 1;

    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        let s = m * m;
        if (s === num) return true;
        if (s < num) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return false;
}
