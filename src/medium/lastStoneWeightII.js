/**
 * 1049. 最后一块石头的重量 II
 * 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
    每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，
    且 x <= y。那么粉碎的可能结果如下：

    如果 x == y，那么两块石头都会被完全粉碎；
    如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
    最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。

    示例 1：
    输入：stones = [2,7,4,1,8,1]
    输出：1
    解释：
    组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
    组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
    组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
    组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
    
    示例 2：
    输入：stones = [31,26,33,21,40]
    输出：5
    
    示例 3：
    输入：stones = [1,2]
    输出：1

    提示：
    1 <= stones.length <= 30
    1 <= stones[i] <= 100
    链接：https://leetcode-cn.com/problems/last-stone-weight-ii
*/
// 这题需要转化啊，很强的思考转化能力。需要转成 494. 目标和 这个类型：一些添加 + 号，一些添加 - 号，形成表达式，使结果 = 0或者最接近 0
// 这题难就难在：倒是可选择，但是没闻出组合成指定目标的味。所以转化下看看能不能转出指定目标
// 这个生想，想死也想不到 dp 这个思路的，一定要善于转换，把不会的问题转化成会的东西去解
// 参考：https://leetcode-cn.com/problems/last-stone-weight-ii/solution/gong-shui-san-xie-xiang-jie-wei-he-neng-jgxik/
/**
 * 假设想要得到最优解，我们需要按照如下顺序操作石子：[(sa, sb), (sc, sd), ... ,(si, sj), (sp, sq)][(sa,sb),(sc,sd),...,(si,sj),(sp,sq)]。
    其中 abcdijpqabcdijpq 代表了石子编号，字母顺序不代表编号的大小关系。
    如果不考虑「有放回」的操作的话，我们可以划分为两个石子堆（正号堆/负号堆）：
        将每次操作中「重量较大」的石子放到「正号堆」，代表在这次操作中该石子重量在「最终运算结果」中应用 ++ 运算符
        将每次操作中「重量较少/相等」的石子放到「负号堆」，代表在这次操作中该石子重量在「最终运算结果」中应用 -− 运算符
        这意味我们最终得到的结果，可以为原来 stonesstones 数组中的数字添加 +/-+/− 符号，所形成的「计算表达式」所表示。

    那有放回的石子重量如何考虑？
        其实所谓的「有放回」操作，只是触发调整「某个原有石子」所在「哪个堆」中，并不会真正意义上的产生「新的石子重量」。

    什么意思呢？
        假设有起始石子 aa 和 bb，且两者重量关系为 a \geq ba≥b，那么首先会将 aa 放入「正号堆」，将 bb 放入「负号堆」。
        重放回操作可以看作产生一个新的重量为 a - ba−b 的“虚拟石子”，将来这个“虚拟石子”也会参与某次合并操作，也会被添加 +/-+/− 符号：

        当对“虚拟石子”添加 ++ 符号，即可 +(a - b)+(a−b)，展开后为 a - ba−b，即起始石子 aa 和 bb 所在「石子堆」不变
        当对“虚拟石子”添加 -− 符号，即可 -(a - b)−(a−b)，展开后为 b - ab−a，即起始石子 aa 和 bb 所在「石子堆」交换
        因此所谓不断「合并」&「重放」，本质只是在构造一个折叠的计算表达式，最终都能展开扁平化为非折叠的计算表达式。

    综上，即使是包含「有放回」操作，最终的结果仍然可以使用「为原来 stonesstones 数组中的数字添加 +/-+/− 符号，形成的“计算表达式”」所表示。


    这就将问题彻底切换为 01 背包问题：从 stonesstones 数组中选择，凑成总和不超过 sum/2 的最大价值。
    
    作者：AC_OIer
    链接：https://leetcode-cn.com/problems/last-stone-weight-ii/solution/gong-shui-san-xie-xiang-jie-wei-he-neng-jgxik/
*/
/**
 * 这位大佬的解释更简洁些，但是忽略了一些证明细节
 * 这道题看出是背包问题比较有难度
    最后一块石头的重量：从一堆石头中,每次拿两块重量分别为x,y的石头,若x=y,则两块石头均粉碎;若x<y,两块石头变为一块重量为y-x的石头求最后剩下石头的最小重量(若没有剩下返回0)
    问题转化为：把一堆石头分成两堆,求两堆石头重量差最小值
    进一步分析：要让差值小,两堆石头的重量都要接近sum/2;我们假设两堆分别为A,B,A<sum/2,B>sum/2,若A更接近sum/2,B也相应更接近sum/2
    进一步转化：将一堆stone放进最大容量为sum/2的背包,求放进去的石头的最大重量MaxWeight,最终答案即为sum-2*MaxWeight;

    作者：eh-xing-qing
    链接：https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/yi-pian-wen-zhang-chi-tou-bei-bao-wen-ti-a7dd/
*/
// 套模板真🐂 ！
var lastStoneWeightII = function(stones) {
    let sum = stones.reduce((sum, cur) => sum+cur, 0);
    let tar = parseInt(sum/2);
    
    let dp = Array(tar+1).fill(0);

    dp[0] = 0;

    for (let i = 0; i < stones.length; i++) {
        let num = stones[i];
        // 不能重用，所以逆序，防止 j-num 被修改过了
        for (let j = tar; j >= num; j--) {
            // 这里的 value 和 weight 都是数字本身而已
            dp[j] = Math.max(dp[j], dp[j-num]+num);
        }
    }
    return sum - 2* dp[tar];
};
