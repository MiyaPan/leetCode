/**
 * 309. 最佳买卖股票时机含冷冻期
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
*/
// 输入: [1,2,3,0,2]
// 输出: 3 
// 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

// 利用「状态」进行穷举。我们具体到每一天，看看总共有几种可能的「状态」，再找出每个「状态」对应的「选择」。
// 我们要穷举所有「状态」，穷举的目的是根据对应的「选择」更新状态。听起来抽象，你只要记住「状态」和「选择」两个词就行，下面实操一下就很容易明白了。
// for 状态1 in 状态1的所有取值：
//     for 状态2 in 状态2的所有取值：
//         for ...
//             dp[状态1][状态2][...] = 择优(选择1，选择2...)
// 引用自：https://labuladong.gitbook.io/algo/dong-tai-gui-hua-xi-lie/tuan-mie-gu-piao-wen-ti

// 总之，买了就减，卖了就加，钱包看成 base，而不要看 买入和卖出的差值

// 当天的状态有 2 种：1 - 持有 或 0 - 不持有
export const maxProfit = (prices) => {
    if (prices.length === 0) return 0;
    let dp = Array(prices.length+1).fill(null).map(_ => Array(2).fill(0));
    // 因为转移方程中有 i-2，所以多声明个边界
    dp[0][0] = 0;
    dp[0][1] = 0;
    // 从第一天开始的初始值
    dp[1][0] = 0;
    dp[1][1] = -prices[0];

    for (let i =2; i <= prices.length; i++) {
        // 今天不持有，昨天可能是：也不持有 或 持有今天卖出
        // 因为多加了边界，所以原数组要取 i-1 的值
        // dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i-1]);
        // 今天持有，昨天可能是：也持有 或 不持有今天买入，因为休息期是 1 天，所以今天买入的收益等于 前天的收益 - 今天的价值
        dp[i][1] = Math.max(dp[i-1][1], dp[i-2][0] - prices[i-1]);
    }
    // 最后一天买入和最后一天不交易，肯定是不交易多，所以肯定是不持有状态下会取到最大值
    return dp[prices.length][0];
}

// 可以看出当前状态只依赖 前一天和大前天的，所以不用数组，用变量保存，节省空间
export const maxProfit2 = (prices) => {
    if (prices.length === 0) return 0;

    let prepre_0 = 0;
    let pre_0 = 0;
    let pre_1 = -prices[0];
    let cur_0 = 0;
    let cur_1 = 0;

    for (let i =1; i < prices.length; i++) {
        // 今天不持有，昨天可能是：也不持有 或 持有今天卖出
        cur_0 = Math.max(pre_0, pre_1 + prices[i]);
        // 今天持有，昨天可能是：也持有 或 不持有今天买入，因为休息期是 1 天，所以今天买入的收益等于 前天的收益 - 今天的价值
        // 前天卖出，前天就是不持有
        cur_1 = Math.max(pre_1, prepre_0 - prices[i]);

        prepre_0 =pre_0;
        pre_0 =cur_0;
        pre_1 =cur_1;
    }
    // 最后一天买入和最后一天不交易，肯定是不交易多，所以肯定是不持有状态下会取到最大值
    return cur_0;
}

// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/fei-zhuang-tai-ji-de-dpjiang-jie-chao-ji-tong-su-y/
// 每天有 3 种状态：1.不持有且当天没卖出，2.持有，3.不持有且当天卖出了【是状态哦！，不是动作，要记录的是状态！！，所以只能是：有或者没有，而没有需要区分是不是卖出的，所以多了一种】

// 因为当天卖出股票实际上也是属于“不持有”的状态，那么第i天如果不持有，那这个“不持有”就有了两种状态：
// 1.本来就不持有，指不是因为当天卖出了才不持有的；2.第i天因为卖出了股票才变得不持有

// 而持有股票依旧只有一种状态

// 所以对于每一天i，都有可能是三种状态：
// 0.不持股且当天没卖出,定义其最大收益dp[i][0];
// 1.持股,定义其最大收益dp[i][1]；
// 2.不持股且当天卖出了，定义其最大收益dp[i][2]；

// 初始化：
// dp[0][0]=0;//本来就不持有，啥也没干
// dp[0][1]=-1*prices[0];//第0天只买入
// dp[0][2]=0;//可以理解成第0天买入又卖出，那么第0天就是“不持股且当天卖出了”这个状态了，其收益为0，所以初始化为0是合理的

// 重头戏：

// 一、第i天不持股且没卖出的状态dp[i][0]，也就是我没有股票，而且还不是因为我卖了它才没有的，那换句话说是从i-1天到第i天转移时，它压根就没给我股票！
// 所以i-1天一定也是不持有，那就是不持有的两种可能：i-1天不持股且当天没有卖出dp[i-1][0]；i-1天不持股但是当天卖出去了dp[i-1][2]；
// 所以： dp[i][0]=max(dp[i-1][0],dp[i-1][2])

// 二、第i天持股dp[i][1]，今天我持股，来自两种可能：
// 1、要么是昨天我就持股，今天继承昨天的，也就是dp[i-1][1]，这种可能很好理解；
// 2、要么：是昨天我不持股，今天我买入的，但前提是昨天我一定没卖！因为如果昨天我卖了，那么今天我不能交易！也就是题目中所谓“冷冻期”的含义，只有昨天是“不持股且当天没卖出”这个状态，我今天才能买入！所以是dp[i-1][0]-p[i]
// 所以： dp[i][1]=max(dp[i-1][1],dp[i-1][0]-p[i])

// 三、i天不持股且当天卖出了，这种就简单了，那就是说昨天我一定是持股的，要不然我今天拿什么卖啊，而持股只有一种状态，昨天持股的收益加上今天卖出得到的新收益，就是dp[i-1][1]+p[i]啦
// 所以：dp[i][2]=dp[i-1][1]+p[i]

// 总结：最后一天的最大收益有两种可能，而且一定是“不持有”状态下的两种可能，把这两种“不持有”比较一下大小，返回即可

export const maxProfit1 = (prices) => {
    if (prices.length === 0) return 0;
    let dp = Array(prices.length).fill(null).map(_ => Array(3).fill(0));
    dp[0][0] = 0;
    dp[0][1] = -prices[0];
    dp[0][2] = 0;

    for (let i =1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2]);
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0]-prices[i]);
        dp[i][2] = dp[i-1][1] + prices[i];
    }
    // 最后一天买入和最后一天不交易，肯定是不交易多，所以肯定是不持有状态下会取到最大值
    return Math.max(dp[prices.length-1][0], dp[prices.length-1][2]);
}
