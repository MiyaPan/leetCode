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