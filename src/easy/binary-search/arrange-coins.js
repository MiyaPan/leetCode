/**
 * 441. 排列硬币
 * 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。
    给定一个数字 n，找出可形成完整阶梯行的总行数。
    n 是一个非负整数，并且在32位有符号整型的范围内。

    示例 1:
    n = 5
    硬币可排列成以下几行:
    ¤
    ¤ ¤
    ¤ ¤
    因为第三行不完整，所以返回2.

    示例 2:
    n = 8
    硬币可排列成以下几行:
    ¤
    ¤ ¤
    ¤ ¤ ¤
    ¤ ¤
    因为第四行不完整，所以返回3.

    链接：https://leetcode-cn.com/problems/arranging-coins
*/
/**
 * =============================
 * 二刷
*/
export const arrangeCoins = (n) => {
    let sum = 0;
    let i = 1;
    let count = 0;
    while (sum <= n) {
        if (sum === n) return count;
        sum += i;
        i++;
        count++;
    }
    return count - 1;
}

/**
 * =============================
 * 一刷
*/
export const arrangeCoins = (n) => {
    let l = parseInt(Math.pow(n, 1/2));
    let r = n;

    while (l <= r) {
        let m = parseInt((l+r)/2);
        let sum = (1+m) * m / 2;
        let rest = n - sum;
        if (rest < 0) {
            r = m - 1;
        } else if (rest === 0 || rest > 0 && rest < m + 1) {
            return m;
        } else {
            l = m + 1;
        }
    }

    return l;
}
