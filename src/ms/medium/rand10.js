/**
 * 470. 用 Rand7() 实现 Rand10()
 * https://leetcode-cn.com/problems/implement-rand10-using-rand7/
*/
var rand10 = function() {
    // 这题的目标是减少 rand7 执行次数，下面这个写法每要求生成一个随机数都要调用一次
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
