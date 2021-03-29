/**
 * 79. 单词搜索
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
    单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
    同一个单元格内的字母不允许被重复使用。

    示例:
    board =
    [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
    ]

    给定 word = "ABCCED", 返回 true
    给定 word = "SEE", 返回 true
    给定 word = "ABCB", 返回 false
     
    提示：
    board 和 word 中只包含大写和小写英文字母。
    1 <= board.length <= 200
    1 <= board[i].length <= 200
    1 <= word.length <= 10^3

    链接：https://leetcode-cn.com/problems/word-search
*/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
/**
 * board =
    [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
    ]

    给定 word = "ABCCED", 返回 true
    给定 word = "SEE", 返回 true
    给定 word = "ABCB", 返回 false
 */ 
export var exist = function(board, word) {
    let n = board.length;
    if (n <=0) return false;
    let m = board[0].length;

    let visited = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === word.charAt(0)) {
                visited = [];
                visited.push([i, j]);
                if (dfs(board, word, visited, i ,j, 0)) return true;
            }
        }
    }

    return false;
};

// visited 别存 坐标啊，计算就麻烦点，直接存和 board 等大的数组，标记就行了
// 存坐标是省空间了，可是数组查询浪费时间了啊，所以还是空间换时间比较好，存 board 
// 太慢辽啊，存坐标
// 思路和答案一样的，存储方式太懒辽啊，存 board 等大的数组啊
function dfs(board, word, visited, r, c, index) {
    if (index >= word.length - 1) return true;

    let n = board.length;
    let m = board[0].length;

    let rDirection = [-1, 0, 0, 1];
    let cDirection = [0, -1, 1, 0];

    let nextChar = word.charAt(index + 1);
    for (let i = 0; i < 4; i++) {
        let newR = r + rDirection[i];
        let newC = c + cDirection[i];
        if (0 <= newR && newR < n && 0 <= newC && newC < m && !isContain(visited, [newR, newC])) {
            if (board[newR][newC] === nextChar) {
                visited.push([newR, newC]);
                if (dfs(board, word, visited, newR ,newC, index+1)) return true;
                visited.pop();
            }
        }
    }

    return false;
}

function isContain(array, tar) {
    return array.find(item => item[0] === tar[0] && item[1] === tar[1]);
}
