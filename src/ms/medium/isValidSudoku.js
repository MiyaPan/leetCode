/**
 * 36. 有效的数独
 * https://leetcode-cn.com/problems/valid-sudoku/
*/
/**
 * =============================
 * 二刷
*/
var isValidSudoku = function(board) {
    // let square = Array(9).fill(null).map(_ => Array(9).fill(0));
    let square = {};
    let row = {};
    let col = {};
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') continue;
        
            let num = board[i][j];
            if (row[i+'-'+num]) return false;
            if (col[j+'-'+num]) return false;
            let boxKey = parseInt(i/3) + '' + parseInt(j/3) + '-' + num;
            if (square[boxKey]) return false;

            row[i+'-'+num] = 1;
            col[j+'-'+num] = 1;
            square[boxKey] = 1;
        }
    }
    return true;
}








/**
 * =============================
 * 一刷
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
