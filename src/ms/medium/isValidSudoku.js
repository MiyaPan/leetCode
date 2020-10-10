/**
 * 36. 有效的数独
 * https://leetcode-cn.com/problems/valid-sudoku/
*/
var isValidSudoku = function(board) {
    let row = Array(9).fill(null).map(_ => []);
    let col = Array(9).fill(null).map(_ => []);
    let square = Array(3).fill(null).map(_ => Array(3).fill(null).map(_ => []));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === '.') {
                continue;
            }
            if (row[i].includes(board[i][j])) {
                return false;
            } else {
                row[i].push(board[i][j]);
            }

            if (col[j].includes(board[i][j])) {
                return false;
            } else {
                col[j].push(board[i][j]);
            }

            if (square[parseInt(i/3)][parseInt(j/3)].includes(board[i][j])) {
                return false;
            } else {
                square[parseInt(i/3)][parseInt(j/3)].push(board[i][j]);
            }
        }
    }
    return true;
};
