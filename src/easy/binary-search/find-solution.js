/**
 * 1237. 找出给定方程的正整数解
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
