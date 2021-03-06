/**
 * 278. 第一个错误的版本
 * 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。
 * 由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
    假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

    你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。
    实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

    示例:
    给定 n = 5，并且 version = 4 是第一个错误的版本。

    调用 isBadVersion(3) -> false
    调用 isBadVersion(5) -> true
    调用 isBadVersion(4) -> true
    所以，4 是第一个错误的版本。 

    链接：https://leetcode-cn.com/problems/first-bad-version
*/
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */
/**
 * =============================
 * 二刷
*/
var solution = function(isBadVersion) {
    return (n) => {
        let l = 1;
        let r = n;
        while (l <= r) {
            let m = l + parseInt((r-l)/2);
            let res = isBadVersion(m);
            if (res) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return l;
    };
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l = 1;
        let r = n;
        // while(l <= r) {
        //     // mid要用逻辑右移>>>，只用右移>>会超出时间限制
        //     let mid = ((l+r)>>1);
        //     if (l == r) return l; // 可能会走不到这一步的，比如 n=5，bad是4，r 会直接小于 l，导致没有相等的时候
        //     if (isBadVersion(mid)) {
        //         r = mid -1;
        //     } else {
        //         l = mid +1;
        //     }
        // }
        // return l;
        while(l <= r) {
            // mid要用逻辑右移>>>，只用右移>>会超出时间限制
            let mid = ((l+r)>>1);
            if (isBadVersion(mid)) {
                r = mid -1;
            } else {
                l = mid +1;
            }
        }
        // return r 都不对
        return l;
    };
};