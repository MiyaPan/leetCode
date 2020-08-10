/**
 * 63. 不同路径 II
 * https://leetcode-cn.com/problems/unique-paths-ii/
*/
export const uniquePathsWithObstacles = (obstacleGrid) => {
    let n = obstacleGrid.length;
    let m = obstacleGrid[0].length;

    // 这种不行，错在，如果第一行有一个 1，其实后面就都是 0 了，所以第一行和第一列也要算
    // for (let i = 0; i < n; i++) {
    //     obstacleGrid[i][0] = !obstacleGrid[i][0];
    // }
    // for (let j = 1; j < m; j++) {
    //     obstacleGrid[0][j] = !obstacleGrid[0][j];
    // }

    // 这个问题就难在初始状态处理
    let findObstacle = false;
    for (let i = 0; i < n; i++) {
        obstacleGrid[i][0] = !findObstacle && !obstacleGrid[i][0] || 0;
        if (obstacleGrid[i][0] === 0) {
            findObstacle = true;
        }
    }
    findObstacle = obstacleGrid[0][0] === 0;
    for (let j = 1; j < m; j++) {
        obstacleGrid[0][j] = !findObstacle && !obstacleGrid[i][0] || 0;;
        if (obstacleGrid[0][j] === 0) {
            findObstacle = true;
        }
    }

    for (let j = 1; j < m; j++) {
        for (let i = 1; i < n; i++) {
            if (obstacleGrid[i][j] === 1) {
                obstacleGrid[i][j] = 0;
            } else {
                obstacleGrid[i][j] = obstacleGrid[i-1][j]+ obstacleGrid[i][j-1];
            }
        }
    }
    return obstacleGrid[n-1][m-1];
}

// 另解：扩展一行没错，初始值整对了也很简单，就是初始化 扩展行的 [0][1] 或者 [1][0] 为 1 即可
// https://leetcode-cn.com/problems/unique-paths-ii/solution/czui-jian-ji-de-dong-tai-gui-hua-chu-shi-hua-yi-ge/
