/**
 * 376. 摆动序列
 * https://leetcode-cn.com/problems/wiggle-subsequence/
 */

//  像这种计算数组元素之间关系的，思路统一，就是：加上当前元素看能构成什么状态，按这个最小子问题遍历就可以了
// dp[i][0]: 降，dp[i][1]: 升的个数
// last[i][0]: 以 i 结尾是降的，的前一个节点下表(用来输出)，last[i][1]: 升的个数   。。。  不用输出序列，只要数个数
export const wiggleMaxLength = (nums) => {
    if (nums.length < 2) return nums.length;

    let n = nums.length;
    let max = 1;
    let dp = Array(n).fill(null).map(_ => Array(2).fill(0));
    dp[0][0] = 1;
    dp[0][1] = 1;

    for (let i = 1; i < nums.length; i++) {
        let findDowm = false;
        let findUp = false;
        for (let j = i-1; j >= 0; j--) {
            // 找到的数小于当前值，加上当前就是升的
            if (nums[j] < nums[i]) {
                dp[i][1] = Math.max(dp[i][1], dp[j][0] + 1);
                findUp = true;
            }
            // 找到的数大于当前值，加上当前就是降的
            if (nums[j] > nums[i]) {
                dp[i][0] = Math.max(dp[i][0], dp[j][1] + 1);
                findDowm = true;
            }
            max = Math.max(max, dp[i][0], dp[i][1]);
            if (findDowm && findUp) break;
        }
    }

    return max;
}

// 优化：只需要前一个字符就能推算当前，不用遍历
// 比如：[1,17,5,10,...] 到 10 的时候，看前一个是 5，比 10 小，那 10 的 up 就是 5 的 down+1；关键是 10 的 down，不用去找 17，
// ===== 因为 5 比 10 小，到 10 是 down，到 5 肯定也是 down ，直接取 5 的down 就可以了 =====
// dp[i][0]: 降，dp[i][1]: 升的个数

// 更新的过程如下：
// 如果 nums[i] > nums[i-1]，意味着这里在摆动上升，前一个数字肯定处于下降的位置。
// 所以 up[i] = down[i-1] + 1， down[i] 与 down[i-1]保持相同。

// 如果 nums[i] < nums[i-1]，意味着这里在摆动下降，前一个数字肯定处于下降的位置。
// 所以 down[i] = up[i-1] + 1， up[i]与 up[i-1] 保持不变。

// 如果 nums[i] == nums[i-1]，意味着这个元素不会改变任何东西因为它没有摆动。
// 所以 down[i] 与 up[i] 与 down[i-1] 和 up[i-1] 都分别保持不变。

// 最后，我们可以将 up[length-1]和 down[length-1]中的较大值作为问题的答案，其中 length是给定数组中的元素数目。
// https://leetcode-cn.com/problems/wiggle-subsequence/solution/bai-dong-xu-lie-by-leetcode/
export const wiggleMaxLength = (nums) => {
    if (nums.length < 2) return nums.length;

    let n = nums.length;
    let max = 1;
    let dp = Array(n).fill(null).map(_ => Array(2).fill(0));
    dp[0][0] = 1;
    dp[0][1] = 1;

    for (let i = 1; i < nums.length; i++) {
        // 找到的数小于当前值，加上当前就是升的
        if (nums[i-1] < nums[i]) {
            dp[i][1] = Math.max(dp[i][1], dp[i-1][0] + 1);
            // 因为 5 比 10 小，到 10 是 down，到 5 肯定也是 down ，直接取 5 的down 就可以了
            // 不是说到 5 down 肯定到 10 down，而是翻过来，到 10 down 必然 5 那的也是 down！
            dp[i][0] = dp[i-1][0];
        }
        // 找到的数大于当前值，加上当前就是降的
        if (nums[i-1] > nums[i]) {
            dp[i][0] = Math.max(dp[i][0], dp[i-1][1] + 1);
            // 比如：[1,17,5,10,...] 到 5 的时候，到 5 的 up: 因为前面一个17比它大，到 5 是 up，到比它大的 17 肯定 up，所以直接取
            dp[i][1] = dp[i-1][1];
        }

        if (nums[i-1] === nums[i]) {
            dp[i][0] = dp[i-1][0];
            dp[i][1] = dp[i-1][1];
        }
        max = Math.max(max, dp[i][0], dp[i][1]);
    }

    return max;
}