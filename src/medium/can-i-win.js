
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
// TODO: 三刷！！！！！
/**
 * =============================
 * 二刷
*/
// 好，超时了，这怎么加备忘呢，每次选择的顺序都不同
// 顺序的确不同，但是选 312 和 选 123 结果是一样的，所以可以用二进制数来做 key 备忘！！！！
// 也就是把 visited 序列化一下啊傻啊
export var canIWin = function(maxChoosableInteger, desiredTotal) {
    if (desiredTotal <= maxChoosableInteger) return true;
    let sum = (1+maxChoosableInteger)*maxChoosableInteger/2;
    if (sum < desiredTotal) return false;

    let visited = Array(maxChoosableInteger+1).fill(false);
    // for (let i = 1; i <= maxChoosableInteger; i++) {
    //     visited[i] = true;
    //     if (!dfs(visited, i, maxChoosableInteger, 1, desiredTotal)) return true;
    //     visited[i] = false;
    // }
    // return false;
    for (let i = 1; i <= maxChoosableInteger; i++) {
        visited[i] = true;
        if (dfs(visited, i, maxChoosableInteger, desiredTotal)) return true;
        visited[i] = false;
    }
    return false;
};
// 当前这个状态下, 能否稳赢
// 当前层递归返回的是上一轮的选择结果
// 下一层递归才告诉我当前我这样选的结果，是不是稳赢
function dfs(visited, sum, n,desiredTotal) {
    if (sum >= desiredTotal) return true;

    for (let i = 1; i <= n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        // 这个 if 把下一层的状态当成自己的了，错了！！！！！
        // if (sum+i >= desiredTotal) {
        //     // visited 是全局的，这里如果判断能赢，也得设置 false，否则别的循环不能用
        //     visited[i] = false;
        //     continue;
        // } else {
            // 当前层递归返回的是上一轮的选择结果
            // 下一层递归才告诉我当前我这样选的结果，是不是稳赢
            // dfs 返回的是我选了当前的 i，是不是能赢，是我能赢，那么就告诉上一层，上一层不能稳赢了
            if (dfs(visited, sum+i, n, desiredTotal)) {
                // 后手赢了，也要把 visited 置回来，不然后面的 for 用不了了
                visited[i] = false;
                return false;
            }
        // }
        visited[i] = false;
    }
    return true;
}
// 加备忘
export var canIWin = function(maxChoosableInteger, desiredTotal) {
    if (desiredTotal <= maxChoosableInteger) return true;
    let sum = (1+maxChoosableInteger)*maxChoosableInteger/2;
    if (sum < desiredTotal) return false;

    let visited = Array(maxChoosableInteger+1).fill(false);
    let map = new Map();

    for (let i = 1; i <= maxChoosableInteger; i++) {
        visited[i] = true;
        if (dfs(visited, i, maxChoosableInteger, desiredTotal, map)) return true;
        visited[i] = false;
    }
    return false;
};
// 当前这个状态下, 能否稳赢
// 当前层递归返回的是上一轮的选择结果
// 下一层递归才告诉我当前我这样选的结果，是不是稳赢
function dfs(visited, sum, n,desiredTotal, map) {
    if (sum >= desiredTotal) return true;

    let key = visited.toString(); // 得 1,0,1...
    if (map.has(key)) return map.get(key);

    for (let i = 1; i <= n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        // 这个 if 把下一层的状态当成自己的了，错了！！！！！
        // if (sum+i >= desiredTotal) {
        //     // visited 是全局的，这里如果判断能赢，也得设置 false，否则别的循环不能用
        //     visited[i] = false;
        //     continue;
        // } else {
            // 当前层递归返回的是上一轮的选择结果
            // 下一层递归才告诉我当前我这样选的结果，是不是稳赢
            // dfs 返回的是我选了当前的 i，是不是能赢，是我能赢，那么就告诉上一层，上一层不能稳赢了
            if (dfs(visited, sum+i, n, desiredTotal, map)) {
                map.set(key, false);
                // 后手赢了，也要把 visited 置回来，不然后面的 for 用不了了
                visited[i] = false;
                return false;
            }
        // }
        visited[i] = false;
    }
    map.set(key, true);
    return true;
}

















/**
 * =============================
 * 一刷
*/
// https://leetcode-cn.com/problems/can-i-win/solution/hui-su-zhuang-ya-dp-by-8bun/
export const canIWin1 = (maxChoosableInteger, desiredTotal) => {
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

  