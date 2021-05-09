/**
 * ceil 是顶
 * floor 是底啊啊啊
 * 
 * 取整的方法有：
 * 1. Math.floor 等函数，不算效率，用这个好
 * 2. ~~：取反再取反是本身，但是位运算会将小数部分舍去，只保留整数部分，所以可以得到整数
 * 3. << 0 或者 << 0：左移 0 位，也是利用位运算不管小数的原理，但是左移用到的寄存器可能不同，得有 01011 移动的操作，不如 ~~ 效率高，底层计算问题了，在底层，低压变高压是最快的
 * 4. |：或运算，原理同上，不适合超过 32 位的数，即2147483647
 */
/**
 * =============================
 * 二刷
*/
export const numRevert = (x) => {
    
}

/**
 * =============================
 * 一刷
*/
export const numRevert = (x) => {
    let abNum = x > 0 ? x : - x;
    const len = (abNum + '').length;
    let sum = 0;

    for (let i = len - 1; i>=0;i--) {
        let base = Math.pow(10,i);
        sum = sum + abNum % 10 * base;
        abNum = (abNum - (abNum % 10)) / 10;
    }

    return (sum > Math.pow(2,31) - 1) || (sum < - Math.pow(2,31))
        ? 0
        : x > 0 ? sum : - sum;
}

export const numRevert2 = (x) => {
    let sum = 0;

    while (x != 0) {
        sum = sum * 10 + x % 10;
        // floor 复杂度很高，会超时，~~ 是最快的方法
        // x = Math.floor(x/10);
        x = ~~(x/10);
    }
    
    return ((sum > Math.pow(2,31) - 1) || (sum < - Math.pow(2,31)))
        ? 0
        : sum;
}
 