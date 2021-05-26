/**
 * 794. 有效的井字游戏
 * 示例 1:
    输入: board = ["O  ", "   ", "   "]
    输出: false
    解释: 第一个玩家总是放置“X”。

    示例 2:
    输入: board = ["XOX", " X ", "   "]
    输出: false
    解释: 玩家应该是轮流放置的。

    示例 3:
    输入: board = ["XXX", "   ", "OOO"]
    输出: false

    示例 4:
    输入: board = ["XOX", "O O", "XOX"]
    输出: true
 * https://leetcode-cn.com/problems/valid-tic-tac-toe-state/
*/
/**
 * @param {string[]} board
 * @return {boolean}
 */
/**
 * =============================
 * 二刷
*/
export var validTicTacToe = function(board) {
    let n = board.length;
    let m = board[0].length;
    let countX = 0;
    let countO = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i].charAt(j) === 'X') countX++;
            if (board[i].charAt(j) === 'O') countO++;
        }
    }

    if (countX < countO || countX -1 > countO) return false;
    let isXfinished = isFinished(board, 'X');
    let isOfinished = isFinished(board, 'O');
    if (countX === countO && isXfinished || countX - 1 === countO && isOfinished) {
        return false;
    }
    return true;
}
function isFinished(board, val) {
    for (let i = 0; i < 3; i++) {
        if (board[i] === val + val + val) return true;
        if (board[0].charAt(i) === val
            && board[1].charAt(i) === val
            && board[2].charAt(i) === val) return true;
    }
    // 自主对角线
    if (board[0].charAt(0) === val
        && board[1].charAt(1) === val
        && board[2].charAt(2) === val) return true;
    // 别忘了副对角线
    if (board[0].charAt(2) === val
        && board[1].charAt(1) === val
        && board[2].charAt(0) === val) return true;
    return false;
}



















/**
 * =============================
 * 一刷
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