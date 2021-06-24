/**
 * 剑指 Offer 16. 数值的整数次方
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

    示例 1：
    输入：x = 2.00000, n = 10
    输出：1024.00000
    
    示例 2：
    输入：x = 2.10000, n = 3
    输出：9.26100
    
    示例 3：
    输入：x = 2.00000, n = -2
    输出：0.25000
    解释：2-2 = 1/22 = 1/4 = 0.25

    提示：
    -100.0 < x < 100.0
    -231 <= n <= 231-1
    -104 <= xn <= 104
     
    注意：本题与主站 50 题相同：https://leetcode-cn.com/problems/powx-n/

    链接：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof
*/
// TODO: 三刷
// 思路没错确实二分，但是细节没想对哦
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (x === 0) return 0;
    let sign = n > 0;
    n = Math.abs(n);

    let ans = 1;
    while (n) {
        if (n % 2 === 1) {
            ans *= x;
        }
        x *= x;
        n = parseInt(n/2);
    }

    return sign ? ans : 1/ans;
};
// 从二进制的角度理解，构造 x 的 1、2、4、8、...次方，看哪个要成=乘以进去
// ，n 写成二进制，只有为 1 的位需要乘上，n 每次 *2 做位移
// 1011二进制数，从右至左分别为1 1 0 1 ，只有在1的位置上，才有相应的权重，这也就是为什么需要通过与运算：(b & 1) == 1判断最后一位是否为1。
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (x === 0) return 0;
    if (x === 1) return 1;
    let sign = n > 0;
    n = Math.abs(n);

    let ans = 1;
    while (n) {
        if (n&1) {
            ans *= x;
        }
        x *= x;
        // Javascript提供了无符号数的右移操作>>>；但没有无符号的左移操作，如需要可以先左移，然后无符号右移0位即可
        /**
         * 于是也就有了有符号数和无符号数的转换方法:
            var signed = -1;
            var unsigned = signed >>> 0; // >>> 0 转换为无符号数
            alert(unsigned);
            signed = unsigned << 0; // << 0 转换为有符号数
            alert(signed);
        */
    //    参考：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/solution/javascriptjie-jue-wen-ti-yi-wei-yun-suan-h4u9/
    /**
     * 1.将-2147483648转成正数2147483648，超出了默认的带符号整数表示范围(默认最大2147483647)
            原因：虽然超出了默认的范围，js内部会自动转换成双精度 64 位存储，这个肯定没有超出范围
            （js中的最大最小安全值）
            console.log(Number.MAX_SAFE_INTEGER); //9007199254740991 2^53 -1
            console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991 2^53 -1
        2.接下来就是移位运算的问题
            重点来啦！ >> ,<<表示算数移位，移动时要考虑符号位，**位移时按最高位补**（下面举例都是默认带符号位，最左边位符号位）
            1101（-3）算术右移1位 1110（-2）； 1101（-3）算术左移1位 11010（-6）
            010（2）算术右移1位001（1）； 010（2）算术左移1位0100（4）；
            >>>表示逻辑移位,整体左右移，缺位补0（下面举例都是默认带符号位，最左边位符号位）
            1101逻辑右移1位 0110； 1101逻辑左移1位 1010
            010逻辑右移1位001； 010逻辑左移1位100；
            在当前测试用例下，如果用算术移位，转成正数的2147483648（超出带符号表示默认转成无符号表示）正好是2^31,（10000……，31个0）最高位占用了符号位，在第一次循环的时候还是按照无符号整数进行运算进入到循环，当进行移位运算的时候如果选算术移位，就会把这个无符号数看成带符号数进行运算，移位之后n变成负数，退出循环，所以这种情况下循环只进行了一次。采用逻辑移位的话就不会出现这个问题，当然用Math.floor(n/2)的形式也相当于逻辑移位，就解决了这个bug.
    */
        //我的天，js中的移位还出错
        //原来是>>是有符号数的移位，>>>这个是无符号数的移位
        //下面第一种是错误的，剩下两个都是正确的
        // n = n>>1
        // n = Math.floor(n/2)
        // -2147483648转成正数2147483648,最高位是 1 ，如果 >> 有符号右移，最高位补 1 变成负数，进不来下个循环，直接退出，所以要用无符号右移
        n = n>>>1;
    }

    return sign ? ans : 1/ans;
};
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (x === 0) return 0;
    let sign = n > 0;
    n = Math.abs(n);

    let ans = x;
    let count = 1;
    while (n >= count * 2) {
        ans *= ans;
        count *= 2;
    }
    for (let i = count+1; i <= n; i++) {
        ans *= x;
    }

    return sign ? ans : 1/ans;
};
