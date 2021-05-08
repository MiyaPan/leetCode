/**
 * 1237. 找出给定方程的正整数解
 * 示例 1：
    输入：function_id = 1, z = 5
    输出：[[1,4],[2,3],[3,2],[4,1]]
    解释：function_id = 1 暗含的函数式子为 f(x, y) = x + y
    以下 x 和 y 满足 f(x, y) 等于 5：
    x=1, y=4 -> f(1, 4) = 1 + 4 = 5
    x=2, y=3 -> f(2, 3) = 2 + 3 = 5
    x=3, y=2 -> f(3, 2) = 3 + 2 = 5
    x=4, y=1 -> f(4, 1) = 4 + 1 = 5
    
    示例 2：
    输入：function_id = 2, z = 5
    输出：[[1,5],[5,1]]
    解释：function_id = 2 暗含的函数式子为 f(x, y) = x * y
    以下 x 和 y 满足 f(x, y) 等于 5：
    x=1, y=5 -> f(1, 5) = 1 * 5 = 5
    x=5, y=1 -> f(5, 1) = 5 * 1 = 5
     
    提示：
    1 <= function_id <= 9
    1 <= z <= 100
    题目保证 f(x, y) == z 的解处于 1 <= x, y <= 1000 的范围内。
    在 1 <= x, y <= 1000 的前提下，题目保证 f(x, y) 是一个 32 位有符号整数。

 * https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/
*/
/**
 * // This is the CustomFunction's API interface.
 * // You should not implement it, or speculate about its implementation
 * function CustomFunction() {
 *     @param {integer, integer} x, y
 *     @return {integer}
 *     this.f = function(x, y) {
 *         ...
 *     };
 * };
 */
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export const findSolution = (customfunction, z) => {
    let ans = [];
    for (let x = 1; x <= 1000; x++) {
        let y = getY(customfunction, z, x);
        if (y !== -1) {
            ans.push([x, y]);
        }
    }
    return ans;
}
function getY(customfunction, z, x) {
    let l = 1;
    let r = 1000;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        let result = customfunction.f(x, m);
        if (result === z) {
            return m;
        } else if (result < z) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
// 题目保证 f(x, y) == z 的解处于 1 <= x, y <= 1000 的范围内。
// 因为对于 x 和 y 都是有序的，因此要考虑双指针！！！一个固定，动另一个，再换过来
export const findSolution = (customfunction, z) => {
    let l = 1;
    let r = 1000;
    let result = [];
    // 也不能折半映射一下，还是要遍历所有，反正也不慢了，解出来再考虑能不能优化
    while(l <= 1000 && r >= 1) {
        let res = customfunction.f(l,r);
        if (res === z) {
            result.push([l,r]);
            l++;
            r--;
        } else if (res < z) {
            l++;
        } else {
            r--;
        }
    }
    return result;
}
