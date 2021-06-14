/**
 * 416. 分割等和子集
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

    注意:
    每个数组中的元素不会超过 100
    数组的大小不会超过 200

    示例 1:

    输入: [1, 5, 11, 5]
    输出: true
    解释: 数组可以分割成 [1, 5, 5] 和 [11].
     
    示例 2:

    输入: [1, 2, 3, 5]
    输出: false
    解释: 数组不能分割成两个元素和相等的子集.
*/
// TODO: 三刷！！！！0-1 背包
// 参考：https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/yi-pian-wen-zhang-chi-tou-bei-bao-wen-ti-a7dd/
/**
 * =============================
 * 二刷
*/
// 套模板，模板见 note/dp
export const canPartition = (nums) => {
    let sum = nums.reduce((sum, item) => sum + item, 0);
    if (sum % 2 !== 0) return false;

    let tar = sum / 2;

    let dp = Array(tar+1).fill(false);

    // dp[j] 是构成 j 大小的背包 - 是否可以
    // dp[0] 构成 0 大小的背包的解
    dp[0] = true;

    for (let num of nums) {
        // 这里没必要去看到 1，到 num 为止就行，因为 num 大于 j 的时候，就是背包比 num 小，直接不可能构成，直接就是取前一轮的结果
        // for (let j = tar; j >= 1; j--) {
        for (let j = tar; j >= num; j--) {
            // 不选 num：就是看上一轮是不是已经能行了； 选 num：就看减去 num 之后能不能行
            dp[j] = dp[j] || dp[j-num];
        }
    }
    return dp[tar];
}
// 和 698. 划分为k个相等的子集 一样做法的暴力超时了，这个简单，要转成 0-1 背包
export const canPartition = (nums) => {
    let n = nums.length;
    let sum = nums.reduce((sum, item) => sum + item, 0);
    if (sum % 2 !== 0) return false;

    let tar = sum / 2;

    let dp = Array(n).fill(null).map(_ => Array(tar+1).fill(false));
    // dp[i][j]: 在 [0, i] 中数字是否能组成数字 j 
    // 一定要先根据动态转移方程初始化值，千万不可以放到循环中做初始化，又难读！又会出错
    // 初始化的过程复杂度肯定小于整体，没必要放到一个循环里！！！
    // 动态转移方程：dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]
    // 而不是！dp[i][j] = dp[i-1][j] || dp[i][j-nums[i]]❎ j-nums[i] 已经取了当前元素了，因为不能重复，所以要去看去掉这个元素，剩下的能不能和当前组成
    // 可见，依赖 j-num，所以初始化第一列作为默认值
    for (let i = 0; i < n; i++) {
        dp[i][0] = true;
    }
    // 又依赖 dp[i-1][j]，所以初始化第一行。这里没办法上面加一行，
    // 因为加一行默认值不能写 true，写 false 的话，会出现重复取 nums[0] 的情况，比如:[1,2,5]
    dp[0][nums[0]] = true; // 其他的就都不可能 true 了，因为 nums[0] 不可以重用！

    // 每一行的值计算只与上一行有关，所以可以优化空间
    // 这里就从第二行开始遍历
    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= tar; j++) {
            // 分两种讨论，选择当前，不选择当前项
            if (nums[i] > j) {
                // 不可以这样哦，这样会导致混乱，， 这样相当于给了一行默认值是 false 的 guard 行，但是 false 对吗，要论证！
                // dp[i][j] = dp[i-1] && dp[i-1][j];
                dp[i][j] = dp[i-1][j];
            }
            else if (nums[i] === j) {
                dp[i][j] = true;
            }
            else if (nums[i] < j) {
                // j-nums[i] 已经取了当前元素了，因为不能重复，所以要去看去掉这个元素，剩下的能不能和当前组成
                // dp[i][j] = dp[i][j-nums[i]];
                // 这里如果上一行已经能组成了，也要看的
                // dp[i][j] = dp[i-1][j-nums[i]];
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]];
            }
        }
    }

    return dp[n-1][tar];
}
export const canPartition = (nums) => {
    let n = nums.length;
    let sum = nums.reduce((sum, item) => sum + item, 0);
    if (sum % 2 !== 0) return false;

    let tar = sum / 2;

    let dp = Array(tar+1).fill(false);
    // 动态转移方程：dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]
    // for (let i = 0; i < n; i++) {
    //     dp[i][0] = true;
    // }
    // dp[0][nums[0]] = true; // 其他的就都不可能 true 了，因为 nums[0] 不可以重用！
    dp[0] = true; // 其他的就都不可能 true 了，因为 nums[0] 不可以重用！

    // 每一行的值计算只与上一行有关，所以可以优化空间
    // 优化后，tar 内层循环需要逆序：因为依赖的是 j-num，如果 j-num 被更新了就不对了，所以逆序
    for (let i = 1; i < n; i++) {
        // 这里没必要去看到 1，到 num 为止就行，因为 num 大于 j 的时候，直接就是取前一轮的结果
        // for (let j = tar; j >= 1; j--) {
        for (let j = tar; j >= nums[i]; j--) {
            // 分两种讨论，选择当前，不选择当前项
            // 选择：上一轮的 dp[j-num]
            // 不选择：上一轮的 dp[j]
            // if (nums[i] > j) {
            //     dp[j] = dp[j];
            // }
            // 这个 if 可以合并到选择当前项中，也就是下一个 if 中，因为有 guard 默认值
            // else if (nums[i] === j) {
            //     dp[j] = true;
            // }
            // else if (nums[i] < j) {
            //     dp[j] = dp[j] || dp[j-nums[i]];
            // }
            // 最终简化成
            dp[j] = dp[j] || dp[j-nums[i]];
        }
    }

    return dp[tar];
}

export const canPartition11 = (nums) => {
    let sum = nums.reduce((sum, item) => sum + item, 0);
    if (sum % 2 !== 0) return false;

    let tar = sum / 2;
    nums.sort((a,b) => b-a);
    if (nums[0] > tar) return false;
    if (nums[0] === tar) return true;

    let visited = Array(nums.length).fill(false);

    return dfs(nums, 0, visited, 0, tar);
}
function dfs(nums, start, visited, curSum, tar) {
    if (curSum === tar) return true;

    for (let i = start; i < nums.length; i++) {
        if (visited[i]) continue;
        if (curSum + nums[i] === tar) return true;
        if (curSum + nums[i] < tar) {
            visited[i] = true;
            if (dfs(nums, i+1, visited, curSum+nums[i], tar)) {
                return true;
            }
            visited[i] = false;
        }
    }
    return false;
}






















/**
 * =============================
 * 一刷
*/
// 相等！ 就等于求一半，也就是给定数组，找出能不能拼出 一半的 coins！
// 因为数组元素不复用，所以是 0-1 问题的变形，所以 nums 放在外，逆序？
export const canPartition1 = (nums) => {
    if(nums.length < 2) return false;

    let sum = 0;
    nums.forEach(num => {
        sum += num; 
    });
    if (sum % 2 !== 0) return false;

    nums.sort((a,b) => a-b);

    let tar = sum / 2;
    let dp = Array(nums.length+1).fill(null).map(_ => []);
    for (let i = 1; i <= nums.length; i++) {
        if(nums[i-1] === tar) return true;
        dp[i] = dp[i].concat(dp[i-1]);
        dp[i].push(nums[i-1]);
        for (let j = 0; j < dp[i-1].length; j++) {
            let newNum = nums[i-1] + dp[i-1][j];
            if (newNum === tar) return true;

            if (!dp[i].includes(newNum)) {
                dp[i].push(newNum);
            }
        }
    }

    return false;
}
