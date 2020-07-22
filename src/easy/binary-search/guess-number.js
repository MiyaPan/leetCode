/**
 * 374. 猜数字大小
 * 我们正在玩一个猜数字游戏。 游戏规则如下：
    我从 1 到 n 选择一个数字。 你需要猜我选择了哪个数字。
    每次你猜错了，我会告诉你这个数字是大了还是小了。
    你调用一个预先定义好的接口 guess(int num)，它会返回 3 个可能的结果（-1，1 或 0）：

    -1 : 我的数字比较小
    1 : 我的数字比较大
    0 : 恭喜！你猜对了！
     

    示例 :
    输入: n = 10, pick = 6
    输出: 6

    链接：https://leetcode-cn.com/problems/guess-number-higher-or-lower
*/
/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
export const guessNumber = (n) => {
    let l = 1;
    let r = n;
    while (l <= r) {
        // let m = l+r >> 1;
        // 无符号右移才可以，右移会超时，在 n=2126753390 ,pick=1702766719 时
//         1、出现问题的原因
// 我们可以确定 low 和 high 都是非负数，那么也就是二进制表示的最高位符号位是0，并且low 和 high 都是31位二进制的整数

// 假设下面这种场景:

// high = 0100 0000 0000 0000 0000 0000 0000 0000 = 1073741824 (Integer.MAX_VALUE的一半)
// low  = 0100 0000 0000 0000 0000 0000 0000 0000 = 1073741824 (Integer.MAX_VALUE的一半)
// 当执行 low + high 操作时，进行二进制运算，如下

// high + low = 1000 0000 0000 0000 0000 0000 0000 0000
// 针对上述high + low 运算的结果，如果是无符号的32位(4个字节)Integer来说就表示 2147483648 (Integer.MAX_VALUE的大小)；
// 如果是有符号的32位(4个字节)Integer来说就表示 -2147483648。 
// 需要特别注意的是Java或Kotlin中是不支持无符号的Integer类型，只存在有符号的Integer类型。

// 所以问题就来了，如果是在Java或Kotlin中 (low + high) / 2的值就变成了负数 -1073741824，low = mid + 1, low就变成负数了。
// 然后target的值会一直比mid要大 low就不断累加，直到low又累加到1073741824，mid 又变成 -1073741824，不断往复进入了死循环导致超时。

// 解决方法：1. 无符号右移；2. let mid = left + (right - left) / 2【java中】：3. let m =parseInt((l+r)/2);【js 中】

// 但这又和我JS有啥关系呢？你个C++跟我扯啥呢？我JS个个数都是64位双精度浮点数，表示的值大了去了呢！
// :因为JS做位运算时，会先转为32位整数，再做位运算。所以应了那句话：JS做位运算，不快。

// 所以当到 0 + 2147483647 + 1 时，计算就已经错误了，这时是一个负数了。

// https://juejin.im/post/5da9d33df265da5b560e0725
        // https://zhuanlan.zhihu.com/p/61429970
        // let m = l+r >>> 1;
        // parseInt 下面的和也可以，会先运算，js 是64位的，完了再转 int，不会溢出变负数
        let m =parseInt((l+r)/2);
        let res = guess(m);
        if (res === 0) {
            return m;
        } else if (res === 1) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}
