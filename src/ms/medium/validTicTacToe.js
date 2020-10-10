/**
 * 794. 有效的井字游戏
 * https://leetcode-cn.com/problems/valid-tic-tac-toe-state/
*/
/**
 * @param {string[]} board
 * @return {boolean}
 */
export var validTicTacToe = function(board) {
    let xNum = count('X', board);
    let oNum = count('O', board);
    // 下的次数问题：不是 x 先下，或者 x 下多了等
    if ((xNum - oNum) !== 0 && (xNum - oNum) !== 1) {
        return false;
    }

    if(win(board, 'X') && (xNum - oNum) !== 1) {
        return false;
    }
    if(win(board, 'O') && (xNum - oNum) !== 0) {
        return false;
    }
    
    return true;
};

function win(board, char) {
    // 检测横向竖向
    for (let i = 0; i < 3; i++) {
        if (board[0].charAt(i) === char && board[1].charAt(i) === char && board[2].charAt(i) === char) {
            return true;
        }
        if (board[i].charAt(0) === char && board[i].charAt(1) === char && board[i].charAt(2) === char) {
            return true;
        }
    }

    // 检测对角线
    if (board[0].charAt(0) === char && board[1].charAt(1) === char && board[2].charAt(2) === char
        || board[0].charAt(2) === char && board[1].charAt(1) === char && board[2].charAt(0) === char) {
        return true;
    }
    return false;
}

function count(char, board) {
    let count = 0;
    board.forEach(item => {
        item.split('').forEach(character => {
            if (character === char) {
                count++;
            }
        })
    })
    return count;
}