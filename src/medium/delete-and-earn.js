/**
 * 740. 删除与获得点数
 * 给定一个整数数组 nums ，你可以对它进行一些操作。
    每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。
    开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

    示例 1:
    输入: nums = [3, 4, 2]
    输出: 6
    解释: 
    删除 4 来获得 4 个点数，因此 3 也被删除。
    之后，删除 2 来获得 2 个点数。总共获得 6 个点数。

    示例 2:
    输入: nums = [2, 2, 3, 3, 3, 4]
    输出: 9
    解释: 
    删除 3 来获得 3 个点数，接着要删除两个 2 和 4 。
    之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
    总共获得 9 个点数。

    链接：https://leetcode-cn.com/problems/delete-and-earn
*/
// 递归，每个数都要标记一遍，删完又要不标记，复杂度高
// 没写完，太tm复杂了
// export const deleteAndEarn = (nums) => {
//     nums.sort((a,b) => a-b);
//     let n = nums.length;
//     // 保存不重复元素的起始位置
//     let unDup = new Map();
//     for (let i = 0; i < n; i++) {
//         if (!unDup.has(nums[i])) {
//             unDup.set(nums[i], i);
//         }
//     }
//     let unDupArr = Array.from(unDup.keys());

//     function helper(state, num) {
//         index = nums.indexOf(num);
//         lastIndex = nums.lastIndexOf(num);
//         if ((state & (1<< index)) === 0) {
//             state = setState(state, index, lastIndex);
//             if (nums[index -1] === num -1) {
//                 const preIndex = nums.indexOf(nums[index -1]);
//                 state = setState(state, preIndex, index -1);
//             }
//             if (nums[index +1] === num +1) {
//                 const nextIndex = nums.lastIndexOf(nums[lastIndex +1]);
//                 state = setState(state, lastIndex+1, nextIndex);
//             }
//         }
//     }

//     function setState(state, index, lastIndex) {
//         for (let i = index; i <= lastIndex; i++) {
//             state = (state | (1<<i));
//         }
//         return state;
//     }
// }

// https://leetcode-cn.com/problems/delete-and-earn/solution/ru-guo-ni-li-jie-liao-da-jia-jie-she-zhe-ti-ni-ken/
// 正整数哦！拿 2 不拿 1，拿 3 不拿 2，不就是打家劫舍了吗：统计下所有元素出现的次数就行
export const deleteAndEarn = (nums) => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    // 这个不对，得是 numCount 中才是这个逻辑
    // if (nums.length === 2) return Math.max(nums[0], nums[1]);

    let n = nums.length;
    // 统计元素个数：下标为元素，值为个数！！很重要的技巧
    // numCount 需要初始化为 0，不然没法 加
    let max = 0;
    for (let i=0; i< n; i++) {
        max = Math.max(max, nums[i]);
    }
    // 给 0 留位置
    let numCount = Array(max+1).fill(0);
    for (let i = 0; i < n; i++) {
        numCount[nums[i]]++;
    }

    let len = numCount.length;
    let dp = Array(len).fill(0);

    dp[1] = 1*numCount[1];
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2]+ i*numCount[i]);
    }

    return dp[len-1];
}
