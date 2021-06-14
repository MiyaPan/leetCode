
/**
 * 698. 划分为k个相等的子集
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。

    示例 1：

    输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
    输出： True
    说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
     

    提示：
    1 <= k <= len(nums) <= 16
    0 < nums[i] < 10000

    链接：https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets
*/
// [10,10,10,7,7,7,7,7,7,6,6,6]
// 3 - true
// 不一定是两个数啊，是多个
// TODO: 三刷！！！！！
/**
 * =============================
 * 二刷
*/
// 参考：https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/solution/javahui-su-jian-zhi-shou-ba-shou-jiao-hu-0equ/
export const canPartitionKSubsets = (nums, k) => {
    let sum = 0;
    nums.forEach(num => sum += num);
    if (sum % k !== 0) return false;

    nums.sort((a,b) => b-a);
    let tar = sum / k;
    if (nums[0] > tar) return false;

    let visited = Array(nums.length).fill(false);

    return dfs(nums, visited, 0, tar, 0, k);
}
function dfs(nums, visited, curSum, tar, start, k) {
    let isAllUsed = visited.every(item => !!item);
    if (isAllUsed) return true;
    let n = nums.length;
    for (let i = start; i < n; i++) {
        if (visited[i]) continue;

        if (curSum + nums[i] === tar) {
            visited[i] = true;
            // 如果找到一组，就进行下一组，cursum 从 0 开始就行了，没找到就下面的 if 去累计
            if (dfs(nums, visited, 0, tar, 0)) {
                return true;
            }
            visited[i] = false;
        }
        if (curSum + nums[i] < tar) {
            // 这里不能加，加了就影响后面的了，要么就加了在下面回溯不行再减回去
            // curSum += nums[i];
            visited[i] = true;
            if (dfs(nums, visited, curSum+nums[i], tar, i+1)) {
                return true;
            }
            visited[i] = false;
        }
    }
    return false;
}
function dfs1(nums, visited, curSum, tar, start, k) {
    if(k === 1) return true;
    let isAllUsed = visited.every(item => !!item);
    if (isAllUsed) return true;
    let n = nums.length;
    // 每一轮凑数中，由于数组降序，可以从前一位之后查询，因为前面的肯定试过了不行
    // 新开的一轮中，把 start 置成 0 即可
    if (curSum === tar) {
        return dfs(nums, visited, 0, tar, 0, k-1);
    }
    for (let i = start; i < n; i++) {
        if (visited[i]) continue;

        if (curSum + nums[i] <= tar) {
            // 这里不能加，加了就影响后面的了，要么就加了在下面回溯不行再减回去
            // curSum += nums[i];
            visited[i] = true;
            if (dfs(nums, visited, curSum+nums[i], tar, i+1, k)) {
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
export const canPartitionKSubsets1 = (nums, k) => {
    let sum = 0;
    let n = nums.length;
    nums.forEach(num => sum += num);

    if (sum % k !== 0) return false;
    let tar = sum / k;

    nums.sort((a,b) => b-a);

    if (nums[0] > tar) return false;

    let start = 0;
    while(start < n && nums[start] === tar) {
        start++;
        // 集合数量减一
        k--;
    }

    let group = Array(k).fill(0);
     
    const helper = (start) => {
        if (start >= n) return true;

        let num = nums[start];
        for (let i = 0; i < k; i++) {
            if (num + group[i] <= tar) {
                group[i] += num;
                // 得把所有数偶都放完且都是true，因为递归的退出条件就是 start > n
                if (helper(start+1)) return true;
                group[i] -= num;
            }

            // 当group[i]==0时说明此时该元素放入这个桶中失败了，而后面几个桶也为空放入同样失败，
            // 所以不用再遍历后面的几个桶，直接返回失败
            if (group[i] === 0) break;
        }

        return false;
    }

    return helper(start, nums, tar, group);
}
