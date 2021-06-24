/**
 * 剑指 Offer 12. 矩阵中的路径
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
    单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

    例如，在下面的 3×4 的矩阵中包含单词 "ABCCED"（单词中的字母已标出）。
    示例 1：
    输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    输出：true
    
    示例 2：
    输入：board = [["a","b"],["c","d"]], word = "abcd"
    输出：false

    提示：
    1 <= board.length <= 200
    1 <= board[i].length <= 200
    board 和 word 仅由大小写英文字母组成

    注意：本题与主站 79 题相同：https://leetcode-cn.com/problems/word-search/

    链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
*/
export var exist = function(board, word) {
    let n = board.length;
    let m = board[0].length;
    let visited = Array(n).fill(null).map(_ => Array(m).fill(false));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === word[0]) {
                if (dfs(board, visited, i, j, word, 0)) {
                    return true;
                }
            }
        }
    }
    return false;
};
function dfs(board, visited, i, j, word, index) {
    let n = board.length;
    let m = board[0].length;
    if (i < 0 || i >= n || j < 0 || j >= m || visited[i][j] || board[i][j] !== word[index]) return false;
    // 没写返回 true 的出口啊大姐
    if (index === word.length-1) return true;

    visited[i][j] = true;
    let directions = [[-1, 0], [0, 1],[1, 0], [0, -1]];
    for (let direction of directions) {
        let newR = i + direction[0];
        let newC = j + direction[1];
        if (dfs(board, visited, newR, newC, word, index+1)) {
            return true;
        }
    }
    visited[i][j] = false;
    return false;
}