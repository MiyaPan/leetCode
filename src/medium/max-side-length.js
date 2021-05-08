/**
 * 1292. 元素和小于等于阈值的正方形的最大边长
 * 输入：mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
    输出：2
    解释：总和小于 4 的正方形的最大边长为 2，如图所示。
    
    示例 2：
    输入：mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
    输出：0
    
    示例 3：
    输入：mat = [[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0]], threshold = 6
    输出：3
    
    示例 4：
    输入：mat = [[18,70],[61,1],[25,85],[14,40],[11,96],[97,96],[63,45]], threshold = 40184
    输出：2

    提示：
    1 <= m, n <= 300
    m == mat.length
    n == mat[i].length
    0 <= mat[i][j] <= 10000
    0 <= threshold <= 10^5
    链接：https://leetcode-cn.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold
*/
export var maxSideLength = function(mat, threshold) {
    let m = mat.length;
    let n = mat[0].length;
    let maxLen = 0;

    let dp = Array(m+1).fill(null).map(_ => Array(n+1).fill(0));
    dp[1][1] = mat[0][0];

    // 构建以 0，0 为基准的 和 的 dp
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i][j-1] + dp[i-1][j] + mat[i-1][j-1] - dp[i-1][j-1];
        }
    }

    // 用上面的 dp 再计算出 x1,y1 -> x2,y2 的和，这里面在 x1,y1 定下后，x2,y2 的确定可以用二分
    // 关键在于：是正方形！！！不是矩形，所以算就行了，不用找 x2,y2 再遍历了
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // l r 是边长的取值范围，m 是二分出来的边长
            let l = 1;
            let r = Math.min(m,n);
            while(l <= r) {
                let mid = l + parseInt((r-l)/2);
                if (i+mid-1 <= m && j+mid-1 <= n && helper(i, j, i+mid-1, j+mid-1, threshold, dp)) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            // r 是最大边长
            maxLen = Math.max(maxLen, r);
        }
    }

    return maxLen; 
};

function helper(x1, y1, x2, y2, threshold, dp) {
    return (dp[x2][y2] - dp[x1-1][y2] - dp[x2][y1-1] + dp[x1-1][y1-1]) <= threshold;
}
