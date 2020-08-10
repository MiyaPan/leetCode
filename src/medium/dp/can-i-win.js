
/**
 * 464. 我能赢吗
 * https://leetcode-cn.com/problems/can-i-win/
 * 在 "100 game" 这个游戏中，两名玩家轮流选择从 1 到 10 的任意整数，累计整数和，先使得累计整数和达到 100 的玩家，即为胜者。
    如果我们将游戏规则改为 “玩家不能重复使用整数” 呢？
    例如，两个玩家可以轮流从公共整数池中抽取从 1 到 15 的整数（不放回），直到累计整数和 >= 100。
    给定一个整数 maxChoosableInteger （整数池中可选择的最大数）和另一个整数 desiredTotal（累计和），判断先出手的玩家是否能稳赢（假设两位玩家游戏时都表现最佳）？
    你可以假设 maxChoosableInteger 不会大于 20， desiredTotal 不会大于 300。

    示例：

    输入：
    maxChoosableInteger = 10
    desiredTotal = 11
    输出：
    false

    解释：
    无论第一个玩家选择哪个整数，他都会失败。
    第一个玩家可以选择从 1 到 10 的整数。
    如果第一个玩家选择 1，那么第二个玩家只能选择从 2 到 10 的整数。
    第二个玩家可以通过选择整数 10（那么累积和为 11 >= desiredTotal），从而取得胜利.
    同样地，第一个玩家选择任意其他整数，第二个玩家都会赢。
*/
// https://leetcode-cn.com/problems/can-i-win/solution/hui-su-zhuang-ya-dp-by-8bun/
export const canIWin = (maxChoosableInteger, desiredTotal) => {
    if (maxChoosableInteger >= desiredTotal) return true;
    if ((1+maxChoosableInteger)*maxChoosableInteger / 2 < desiredTotal) return false;

    // dp 保存的是每个数字用或者不用的 输赢值，这用二进制数表示每个数字的用或者不用，比如 0000010，表示用了第二个数
    // 所以，数组的长度是 1 << mamaxChoosableInteger - 1
    /**
     *  dp表示"每个"取数(A和B共同作用的结果)状态下的输赢
     *  例如只有1,2两个数选择，那么 (1 << 2) - 1 = 4 - 1 = 3种状态表示：
     *  01,10,11分别表示：A和B已经选了1，已经选了2，已经选了1、2状态下，A的输赢情况
     *  并且可见这个表示所有状态的dp数组的每个状态元素的长度为maxChoosableInteger位的二进制数
     */
    let dp = Array((1<<maxChoosableInteger)-1).fill(null);
    return helper(maxChoosableInteger, desiredTotal, dp, 0);
}

function helper(maxChoosableInteger, desiredTotal, dp, status) {
    if (dp[status] !== null) return dp[status];

    for (let i = 1; i <= maxChoosableInteger; i++) {
        let temp = (1 << (i-1));
        // 相与为 0，表示没有使用，需要进行递归判断
        if ((temp & status) === 0) {
            // status|temp 是把当前数字设置成已使用，即，将 status 中的第 i 位变为 1
            if (desiredTotal <= i || !helper(maxChoosableInteger, desiredTotal-i, dp, status|temp)) {
                dp[status] = true;
                return true;
            }
        }
    }

    dp[status] = false;
    return false;
}

  