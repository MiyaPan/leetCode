/**
 * 529. 扫雷游戏
 * 让我们一起来玩扫雷游戏！
    给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，
    'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，
    'X' 则表示一个已挖出的地雷。

    现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：

    如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
    如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
    如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
    如果在此次点击中，若无更多方块可被揭露，则返回面板。
     
    示例 1：
    输入: 
    [['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E']]

    Click : [3,0]

    输出: 
    [['B', '1', 'E', '1', 'B'],
    ['B', '1', 'M', '1', 'B'],
    ['B', '1', '1', '1', 'B'],
    ['B', 'B', 'B', 'B', 'B']]

    示例 2：
    输入: 
    [['B', '1', 'E', '1', 'B'],
    ['B', '1', 'M', '1', 'B'],
    ['B', '1', '1', '1', 'B'],
    ['B', 'B', 'B', 'B', 'B']]

    Click : [1,2]

    输出: 
    [['B', '1', 'E', '1', 'B'],
    ['B', '1', 'X', '1', 'B'],
    ['B', '1', '1', '1', 'B'],
    ['B', 'B', 'B', 'B', 'B']]

    注意：
    输入矩阵的宽和高的范围为 [1,50]。
    点击的位置只能是未被挖出的方块 ('M' 或者 'E')，这也意味着面板至少包含一个可点击的方块。
    输入面板不会是游戏结束的状态（即有地雷已被挖出）。
    简单起见，未提及的规则在这个问题中可被忽略。例如，当游戏结束时你不需要挖出所有地雷，考虑所有你可能赢得游戏或标记方块的情况。

    链接：https://leetcode-cn.com/problems/minesweeper
*/
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
// 整体思路和答案的 DFS 是一样的，可以优化的是 forEach 
// 既用了 stack，又去深度搜索，有点浪费了，既然有了satck，可以广度搜索，一个 while 搞定
var updateBoard = function(board, click) {
    const [row, column] = click;
    const target = board[row][column];
    const m = board.length;
    const n = board[0].length;

    if (target === 'M') {
        board[row][column] = 'X';
    }

    if (/d/.test(+target)) {
        return;
    }

    const oprator = [-1, 0, 1];

    if (target === 'E') {
        let mineNum = 0;
        let stack = [];
        oprator.forEach(rowOpr => {
            oprator.forEach(columnOpr => {
                const newR = row + rowOpr;
                const newC = column + columnOpr;
                if (newR >= 0 && newR < m
                    && newC >= 0 && newC < n
                    && (!!rowOpr || !!columnOpr)) {
                    if (board[newR][newC] === 'M') {
                        mineNum++;
                    } else if (board[newR][newC] === 'E') {
                        stack.push([newR, newC]);
                    }
                }
            });
        });
        
        if (mineNum !== 0) {
            // 如果周围一圈有雷，标记个数，然后返回
            board[row][column] = mineNum + '';
        } else {
            // 如果周围一圈没有雷，递归的揭示其他 E
            board[row][column] = 'B';
            stack.forEach(click => {
                updateBoard(board, click);
            });
        }
    }
    return board;
};

var updateBoard1 = function(board, click) {
    const [row, column] = click;
    const target = board[row][column];
    const m = board.length;
    const n = board[0].length;

    if (target === 'M') {
        board[row][column] = 'X';
    }

    if (/d/.test(+target)) {
        return;
    }

    // 一圈的 8 个位置的位移
    const dirX = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dirY = [-1, 0, 1, -1, 1, -1, 0, 1];

    if (target === 'E') {
        let mineNum = 0;
        let stack = [];
        for (let i = 0; i < 8; i++) {
            const newR = row + dirX[i];
            const newC = column + dirY[i];
            if (newR >= 0 && newR < m
                && newC >= 0 && newC < n) {
                if (board[newR][newC] === 'M') {
                    mineNum++;
                } else if (board[newR][newC] === 'E') {
                    stack.push([newR, newC]);
                }
            }
        }

        if (mineNum !== 0) {
            // 如果周围一圈有雷，标记个数，然后返回
            board[row][column] = mineNum + '';
        } else {
            // 如果周围一圈没有雷，递归的揭示其他 E
            board[row][column] = 'B';
            // 这里递归正好过滤掉了 数字的
            stack.forEach(click => {
                updateBoard(board, click);
            });
        }
    }
    return board;
};

// 执行时间大大缩小，因为没有递归栈了
var updateBoard2 = function(board, click) {
    const [row, column] = click;
    const target = board[row][column];
    const m = board.length;
    const n = board[0].length;

    if (target === 'M') {
        board[row][column] = 'X';
    }

    // if (/d/.test(+target)) {
    //     return;
    // }
    // 一圈的 8 个位置的位移
    const dirX = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dirY = [-1, 0, 1, -1, 1, -1, 0, 1];
    const stack = [click];
    let pointer = 0;

    while(pointer < stack.length) {
        const curClick = stack[pointer];
        const [curRow, curColumn] = curClick;
        const target = board[curRow][curColumn];
        if (target === 'E') {
            let mineNum = 0;
            for (let i = 0; i < 8; i++) {
                const newR = curRow + dirX[i];
                const newC = curColumn + dirY[i];
                if (newR >= 0 && newR < m
                    && newC >= 0 && newC < n) {
                    if (board[newR][newC] === 'M') {
                        mineNum++;
                    }
                    // else if (board[newR][newC] === 'E') {
                    //     // 不能在这里 push，因为 当前节点如果是数字的话，就不应该继续递归它的外圈了，这样push可能把不需要处理的 E push进去
                    //     // 上面的解法在递归的时候过滤了数字，所以这里也要过滤，改成迭代就得两遍 for了
                            // 这个 push 应该只在当前节点可以是 B 的时候push，数字的不应 oush
                    //     stack.push([newR, newC]);
                    // }
                }
            }
    
            if (mineNum !== 0) {
                // 如果周围一圈有雷，标记个数，然后返回
                board[curRow][curColumn] = mineNum + '';
            } else {
                // 如果周围一圈没有雷，递归的揭示其他 E
                board[curRow][curColumn] = 'B';
                for (let i = 0; i < 8; i++) {
                    const newR = curRow + dirX[i];
                    const newC = curColumn + dirY[i];
                    if (newR >= 0 && newR < m
                        && newC >= 0 && newC < n) {
                        if (board[newR][newC] === 'E') {
                            // 这个 push 应该只在当前节点可以是 B 的时候push，数字的不应 oush
                            stack.push([newR, newC]);
                        }
                    }
                }
            }
        }
        pointer++;
    }
    return board;
};
