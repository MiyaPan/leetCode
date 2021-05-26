/**
 * 470. 用 Rand7() 实现 Rand10()
 * https://leetcode-cn.com/problems/implement-rand10-using-rand7/
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
// 题目结果关心的是 1-10，也就是1-40内的这些数是不是等概率的，超出的部分舍弃，并不影响前 40 个数的概率相等！
// 参考：https://leetcode-cn.com/problems/implement-rand10-using-rand7/solution/cong-zui-ji-chu-de-jiang-qi-ru-he-zuo-dao-jun-yun-/
// https://leetcode-cn.com/problems/implement-rand10-using-rand7/solution/xiang-xi-si-lu-ji-you-hua-si-lu-fen-xi-zhu-xing-ji/
var rand10 = function() {
    // 不对，这个生成的不是等概率的：
    // rand7: 1,2,3,4,5,6,7
    // /7: 0.1428,0.2857,0.4286,0.5714,0.7143,0.8571,1
    // *10: 1,2,4,5,7,8,10
    // 显然 rand7() 只能均匀的产生 7 个数，这肯定是不够的，得让他多产生，我们抛弃没事
    // return parseInt(rand7()/7 * 10);

    // 最开始的想法应该是：用 7 去生成大于 7 的数，其中大于 10 的部分舍弃，就能达到 1-10 的等概率
    // while (true) {
    //     // let num = (rand7() - 1) * 2 // 不行，这样出来的是 [1...7] * 2 = [2,4,6..14],不能保证 1-10 的等概率
    //     // 怎么让 1-10 等概率出现呢：rand7() - 1 能出现 0-6，也就是十位数能有了，*7 + rand7() 就有了，哎~，就这么神奇
    //     let num = (rand7() - 1) * 7 + rand7();
    //     if (num <= 10) return num;
    // }

    // 进阶：上面的生成了 1-49，但是却只用了 1-10 ，有点浪费了，会造成调用很多次 rand7()，所以通过取模提高利用率
    // while (true) {
    //     let num = (rand7() - 1) * 7 + rand7();
    //     if (num <= 40) return num % 10 + 1;
    // }

    // 再进阶：上面的舍弃了 9 个数，要想在提高效率，就利用起来这 9 个
    while (true) {
        let num = (rand7() - 1) * 7 + rand7();
        if (num <= 40) return num % 10 + 1;

        // 这样就利用了 9，舍弃 3 个，61-63
        num = num - 40;
        num = (num - 1) * 7 + rand7();
        if (num <= 60) return num % 10 + 1;

        // 这样就利用了 3，舍弃 1 个，21
        num = num - 60;
        num = (num - 1) * 7 + rand7();
        if (num <= 20) return num % 10 + 1;
    }
}


















/**
 * =============================
 * 一刷
*/
var rand10 = function() {
    // 不对，这个生成的不是等概率的：
    // rand7: 1,2,3,4,5,6,7
    // /7: 0.1428,0.2857,0.4286,0.5714,0.7143,0.8571,1
    // *10: 1,2,4,5,7,8,10
    // 显然 rand7() 只能均匀的产生 7 个数，这肯定是不够的，得让他多产生，我们抛弃没事
    // return parseInt(rand7()/7 * 10);

    // 思路：就是如何通过 rand7 等概率 的产生 [1,n]，n 大于 10 的方法。其中大于 10 部分的数字可以舍弃，我们只需要保证 1~10 的概率是相等的就好！
    // 如果采用 rand7 + rand7，那得到的结果不是等概率的，中间的数字会重复
    // 答案就总结出 (rand7 - 1) * 7 + rand7，这个方式，可看下是能保证 1~10 是等概率的
    // 上面确实 1- 10 是等概率没问题，可以当出现 大于 10 的数字就接着调用，直到出现 范围内的数为止
    // 但是这样浪费的就很多，因为拒绝率太高
    // 观察发现，公式产生的其实是 1~49 的等概率，我们可以利用 1~40 的数字，这拒绝率就低了很多

    while(true) {
        let temp = (rand7() - 1) * 7 + rand7();
        if (temp <= 40) return temp % 10 + 1;

        // 41~49 被拒绝了，还可以利用，以降低总体拒绝率
        let a = temp - 40; // rand9
        let result = (a - 1) * 7 + rand7(); // rand63，上下两种一样
        // let result = (rand7() - 1) * 9 + a; // rand63
        if (result <= 60) return result % 10 + 1;
    }
};
