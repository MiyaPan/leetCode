/**
 * 40. 组合总和 II
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
    candidates 中的每个数字在每个组合中只能使用一次。

    说明：
    所有数字（包括目标数）都是正整数。
    解集不能包含重复的组合。 
    
    示例 1:
    输入: candidates = [10,1,2,7,6,1,5], target = 8,
    所求解集为:
    [
    [1, 7],
    [1, 2, 5],
    [2, 6],
    [1, 1, 6]
    ]
    
    示例 2:
    输入: candidates = [2,5,2,1,2], target = 5,
    所求解集为:
    [
      [1,2,2],
      [5]
    ]

    链接：https://leetcode-cn.com/problems/combination-sum-ii
*/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// TODO: 三刷！
/**
 * =============================
 * 二刷
*/
export var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a-b);
    let ans = [];
    let path = [];
    dfs(candidates, target, 0, path, ans);
    return ans;
}
function dfs(candidates, target, startIdx, path, ans) {
    let visited = {};
    for (let i = startIdx; i < candidates.length; i++) {
        if (candidates[i] > target) {
            return;
        } else if (candidates[i] === target) {
            ans.push([...path, candidates[i]]);
            return;
        } else if (candidates[i] < target) {
            if (!visited[candidates[i]]) {
                path.push(candidates[i]);
                visited[candidates[i]] = true;;
                dfs(candidates, target-candidates[i], i+1, path, ans);
                path.pop();
            }
        }
    }
}




/**
 * =============================
 * 一刷
*/
/**
 * 总结：
 * 现在思路都是有的，也都是对的，就是细节！！细节！！细节！！
 * 1. 思路是对的，下面这个是反着找的，也可以正着找，见 39. 组合总和，外加剪枝
 * 2. 本题目不能用 map 备忘！！不然会重复啊啊啊啊
 * 3. 不是所有的相等都要抛弃，这样就影响了下一层的搜索了，应该只在本层内判断
 * 4. findIndex 如果找不到会返回 -1 啊啊啊
*/
export var combinationSum2 = function(candidates, target) {
    candidates.sort((a,b) => a-b);
    let biggerIdx = candidates.findIndex(item => item > target);
    // biggerIdx 如果搜不到就是 -1 ！！！！
    biggerIdx = biggerIdx === -1 ? candidates.length : biggerIdx;

    // 保存备忘
    let map = {};

    return helper(candidates, target, biggerIdx-1, map);
};

function helper(candidates, target, end, map) {
    // if (map[target]) return map[target];

    let result = [];
    let pre;
    for (let i = end; i >= 0; i--) {
        let cur = candidates[i];
        // 不是所有的相等都要抛弃，这样就影响了下一层的搜索了，应该只在本层内判断
        // if (cur > target || candidates[i+1] && cur === candidates[i+1]) continue;
        if (cur > target || cur === pre) continue;
        if (cur === target) {
            result.push([target]);
        } else {
            let part = helper(candidates, target-cur, i-1, map);
            for (let j = 0; j < part.length; j++) {
                result.push([...part[j], cur]);
            }
        }
        pre = cur;
    }
    // map[target] = [...result];
    return result;
}
