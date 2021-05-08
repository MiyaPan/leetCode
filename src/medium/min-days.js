/**
 * 1482. 制作 m 束花所需的最少天数
 * 示例 1：
    输入：bloomDay = [1,10,3,10,2], m = 3, k = 1
    输出：3
    解释：让我们一起观察这三天的花开过程，x 表示花开，而 _ 表示花还未开。
    现在需要制作 3 束花，每束只需要 1 朵。
    1 天后：[x, _, _, _, _]   // 只能制作 1 束花
    2 天后：[x, _, _, _, x]   // 只能制作 2 束花
    3 天后：[x, _, x, _, x]   // 可以制作 3 束花，答案为 3
   
    示例 2：
    输入：bloomDay = [1,10,3,10,2], m = 3, k = 2
    输出：-1
    解释：要制作 3 束花，每束需要 2 朵花，也就是一共需要 6 朵花。而花园中只有 5 朵花，无法满足制作要求，返回 -1 。
    
    示例 3：
    输入：bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
    输出：12
    解释：要制作 2 束花，每束需要 3 朵。
    花园在 7 天后和 12 天后的情况如下：
    7 天后：[x, x, x, x, _, x, x]
    可以用前 3 朵盛开的花制作第一束花。但不能使用后 3 朵盛开的花，因为它们不相邻。
    12 天后：[x, x, x, x, x, x, x]
    显然，我们可以用不同的方式制作两束花。
    
    示例 4：
    输入：bloomDay = [1000000000,1000000000], m = 1, k = 1
    输出：1000000000
    解释：需要等 1000000000 天才能采到花来制作花束
    
    示例 5：
    输入：bloomDay = [1,10,2,9,3,8,4,7,5,6], m = 4, k = 2
    输出：9

    链接：https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets
*/
export var minDays = function(bloomDay, m, k) {
    let n = bloomDay.length;
    if (n < m * k) return -1;
    let sorted = [...bloomDay].sort((a,b) => a-b);
    if (n === m * k) return sorted[n-1];

    let l = 0;
    let r = n-1;
    while(l <= r) {
        let mid = l + parseInt((r-l)/2);
        if (check(bloomDay, sorted[mid], m, k)) {
            r = mid - 1;
        } else {
            l = mid +1;
        }
    }
    return sorted[l];
};

function check(bloomDay, day, m, k) {
    let n = bloomDay.length;
    let status = Array(n).fill(0);
    let count = 0;
    for (let i = 0; i < bloomDay.length; i++) {
        if (bloomDay[i] <= day) {
            status[i] = 1;
        }

        // status[i] === 1 的时候都该进，因为 不等于 1 的在 else 里置 0 了，不要重了
        if (status[i] === 1) {
            count++;
            if (count === k) {
                m--;
                count = 0;
                if (m === 0) return true;
            }
        } else {
            count = 0;
        }
    }

    return m <= 0;
}
