/**
 * 494. 目标和
 * https://leetcode-cn.com/problems/target-sum/description/
 * 
 * 给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。
 * 对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。
    返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

    示例：

    输入：nums: [1, 1, 1, 1, 1], S: 3
    输出：5
    解释：

    -1+1+1+1+1 = 3
    +1-1+1+1+1 = 3
    +1+1-1+1+1 = 3
    +1+1+1-1+1 = 3
    +1+1+1+1-1 = 3

    一共有5种方法让最终目标和为3。

    提示：
    数组非空，且长度不会超过 20 。
    初始的数组的和不会超过 1000 。
    保证返回的最终结果能被 32 位整数存下。
*/
// TODO: 三刷！！！
/**
 * =============================
 * 二刷
*/
// 只要给一堆东西，让你这样排或者那样排，组成啥，就是背包问题！
// 背包问题一定是选或不选，不会强制都用上，才能用背包的模板，所以要转化下
// 讲挺好：https://leetcode-cn.com/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/
// 套模板。
// 下面的不对了，
export const findTargetSumWays = (nums, S) => {
    let sum = nums.reduce((sum, cur) => sum + cur, 0);
    // nums 看成正数和 x 和负数和 y，则：x - y = S,
    // 又，x + ｙ = sum
    // 两式相加得：x = (sum + S)/2
    // 领一种直观的考虑: 把 x = sum - y 带入得: (sum - y)-y = 0 即：sum -2*y = 0，y = sum/2，x 也一样
    if ((sum+S) % 2 !== 0 || sum < S) return 0;

    let tar = (sum+S) / 2;
    let dp = Array(tar+1).fill(0);
    // 组成和为 0 的正数的组合方式有 1 种，不是 0 种。一个正数都不选，就能行了
    // dp[0] = 0;
    dp[0] = 1;
    // 不写 let num of nums 更清晰写，更能看出原始思路，而不是简化后的。简化后是不可能一眼看出来的
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        // 逆序：01 背包不能重复，所以要逆序。因为依赖 j-num，不能先更新左边，必须从右边开始
        // j >= num: j < num 时，背包小于物品肯定不用更新，维持上一轮的 dp。这里的一维 dp 是二维简化来的，简化过程见：416. 分割等和子集
        for (let j = tar; j >= num; j--) {
            // 不选不行，所以没有 dp[j] 这个了❎，遇到这种说明需要转化，背包只能要么选要么不选
            // dp[j] = dp[j] || dp[j-num] || dp[j+num];
            // 这里通过转换了，不选其实就是放减号
            // 那么，上一轮 dp[j] 如果已经能组成了，我们要的是总数，所以要在上一轮基础上加上不选的情况，因为我们要的是最后一轮的结果，这里就是个更新而而已
            dp[j] = dp[j] + dp[j-num];
            // 人家模板都说了！这里不是最值，也不是存在，就是组合(这个组合就是原本的意思，不是组合背包的组合)
            // 1、最值问题: dp[i] = max/min(dp[i], dp[i-nums]+1)或dp[i] = max/min(dp[i], dp[i-num]+nums);
            // 2、存在问题(bool)：dp[i]=dp[i] || dp[i-num];
            // 3、组合问题：dp[i]+=dp[i-num];
        }
    }
    return dp[tar];
}

// 给一个 目标，给一个数组，问数组里的能不能组成 目标。就是背包问题，模板就是两个for循环。
// 如果数组里的元素可以复用，就是完全背包；如果不能，就是 0-1 背包。

// 接下来讲一下背包问题的判定
// 背包问题具备的特征：给定一个target，target可以是数字也可以是字符串，再给定一个数组nums，nums中装的可能是数字，也可能是字符串，问：能否使用nums中的元素做各种排列组合得到target。

// 背包问题技巧：
// 1.如果是0-1背包，即数组中的元素不可重复使用，nums放在外循环，target在内循环，且内循环倒序；
// nums在外循环：因为顺着nums遍历可以做到选和不选，过了num就与下一个num无关了
// 内循环倒序：是因为倒序更新第c个值时，前面的第c-num的状态是未选择当前num的状态，从前往后更新不知道前面的状态是否选了num。

// for num in nums:
//     for i in range(target, nums-1, -1):
// 2.如果是完全背包，即数组中的元素可重复使用，nums放在外循环，target在内循环。且内循环正序。
// 数组中的元素可以重复出现，此时nums放在外层循环是为了方便递归，其实完全背包nums在外循环或内循环均可，nums放在外层可以避免target重复调用
// 但target必须正序遍历。完全背包的目的一般是求最值。

// for num in nums:
//     for i in range(nums, target+1):
// 3.如果组合背包，需考虑元素之间的顺序，需将target放在外循环，将nums放在内循环。
// 数组中的元素可以重复出现但顺序可以不一致，此时nums放在内循环，target放在外循环，
// 正序遍历，因为这样dp的每个状态更新时都不用考虑前面的状态是否选择了第i个num。组合背包的问题一般是求组合个数。

// for i in range(1, target+1):
//     for num in nums:

export const findTargetSumWays = (nums, S) => {
    if (nums.length === 1) return nums[0] === S || nums[0] === -S;
    let n = nums.length;

    let dp = Array(n+1).fill(null).map(_ => []);
    dp[0] = [nums[0], -nums[0]];
    let count = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < dp[i-1].length; j++) {
            dp[i].push(dp[i-1][j] + nums[i]);
            dp[i].push(dp[i-1][j] - nums[i]);

            if (i === n-1) {
                if (dp[i-1][j] + nums[i] === S) count++;
                if (dp[i-1][j] - nums[i] === S) count++;
            }
        }
    }

    return count;
}
