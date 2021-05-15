/**
 * 39. 组合总和
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
    candidates 中的数字可以无限制重复被选取。

    说明：
    所有数字（包括 target）都是正整数。
    解集不能包含重复的组合。 

    示例 1：
    输入：candidates = [2,3,6,7], target = 7,
    所求解集为：
    [
    [7],
    [2,2,3]
    ]

    示例 2：
    输入：candidates = [2,3,5], target = 8,
    所求解集为：
    [
      [2,2,2,2],
      [2,3,3],
      [3,5]
    ]
     
    提示：
    1 <= candidates.length <= 30
    1 <= candidates[i] <= 200
    candidate 中的每个元素都是独一无二的。
    1 <= target <= 500

    链接：https://leetcode-cn.com/problems/combination-sum
*/
/**
 * @param {number[]} candidates
 * @param {number} target 
 * @return {number[][]}
 */
/**
 * =============================
 * 二刷
 * 一眼看上去真的很想用 dp，没必要啊，还是先跟着自己的思路想，想完之后看看能不能加备忘，再看能不能用dp
*/
var combinationSum = function(candidates, target) {
    candidates.sort((a, b) => a-b);
    let ans = [];
    let path = [];
    dfs(candidates, target, path, 0, ans);
    return ans;
}
function dfs(candidates, target, path, startIdx, ans) {
    for (let i = startIdx; i < candidates.length; i++) {
        if (candidates[i] > target) {
            return;
        }
        if (candidates[i] === target) {
            ans.push([...path, candidates[i]]);
            return;
        }
        if (candidates[i] < target) {
            path.push(candidates[i]);
            dfs(candidates, target-candidates[i], path, i, ans);
            path.pop();
        }
    }
}

/**
 * =============================
 * 一刷
*/
// 对于这类寻找所有可行解的题，我们都可以尝试用「搜索回溯」的方法来解决
// 问题的关键在于如何 去重，这里也是剪枝
var combinationSum = function(candidates, target) {
    candidates.sort((a,b) => a-b);

    let result = [];

    dfs(candidates, target, [], 0, result);

    return result;
};

function dfs(candidates, target, part, start, result) {
    if (target < candidates[0]) return;
    
    for (let i = start; i < candidates.length; i++) {
        // 如果找到 target 正好被选取，说明它就是叶子，push 进去即可
        if (target === candidates[i]) {
            result.push([...part, target]);
            return;
        }

        // 数组后面的数都比 target 大了，因为是正整数，所以后面的不用考虑了，组不成
        if (candidates[i] > target) break;

        // 最关键的剪枝，也能去重：观察发现，下一个选择项要么找不到，要么找到，找到的话：
        // 如果 下一个匹配项 值是小于当前遍历节点的，又因为数组是排序的，
        // 小的这个 匹配项，之前肯定已经遍历过了，因为数组是排序的
        // 是下一个选择项不能小于当前 candidates[i]，即 下一个选择项不能选之前选过的，即 下一层遍历 可选择项 的起点要 >= 当前项，当前项是可以的，因为可以重复

        // 可参考：https://leetcode-cn.com/problems/combination-sum/solution/shou-hua-tu-jie-zu-he-zong-he-combination-sum-by-x/
        dfs(candidates, target - candidates[i], [...part, candidates[i]], i, result);
    }
}
