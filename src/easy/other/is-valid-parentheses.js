// 执行用时 : 68 ms，击败了 59.44%
// 内存消耗 : 34.6 MB, 击败了 43.98%
/**
 * =============================
 * 二刷，done - ms 20. 有效的括号
*/
export const isValidParentheses = (s) => {
    const stack = []; 

    for (let i =0;i<s.length;i++) {
        // 优化点：当然不用每次都检测了，左括号检测个毛线，直接入栈啊！
        if (canMatch(stack[stack.length - 1], s[i])) {
            stack.pop(stack[stack.length - 1]);
        } else {
            stack.push(s[i]);
        }
    }

    return stack.length === 0;
}

function canMatch(p1, p2) {
    if (p1 === '(' && p2 === ')'
        || p1 === '[' && p2 === ']'
        || p1 === '{' && p2 === '}') {
        return true;
    }
    return false;
}

// 执行用时 : 64 ms，击败了 76.79%
// 内存消耗 : 34 MB, 击败了 72.93%
export const isValidParentheses2 = (s) => {
    const stack = []; 

    for (let i =0;i<s.length;i++) {
        // 优化点：当然不用每次都检测了，左括号检测个毛线，直接入栈啊！
        if (isLeft(s[i])) {
            stack.push(s[i]);
        } else {
            if (canMatch2(stack[stack.length - 1], s[i])) {
                stack.pop(stack[stack.length - 1]);
            } else {
                return false;
            }
        }
    }

    return stack.length === 0;
}

function isLeft (s) {
    return s === '(' || s === '[' || s === '{';
}

function canMatch2(p1, p2) {
    switch (p1+p2) {
        case '()':
        case '[]':
        case '{}':
            return true;

    }
    return false;
}

// 2 为官方解答，在此基础上，判断特殊情况，可以提高效率
export const isValidParentheses3 = (s) => {
    if (s.length === 0) {
        return true;
    }

    // 查询是否含，有没有，！！！用 indexOf 啊！还要手动判断吗
    // if (s.length % 2 !== 0 || !isLeft(s[0])) {
    // 哦，实际上，indexOf 好像效率很低，才打败 9.7%
    // if (s.length % 2 !== 0 || ['(', '[', '{'].indexOf(s[0]) === -1) {
    if (s.length % 2 !== 0 || !isLeft(s[0])) {
        return false;
    }

    const stack = []; 
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    stack.push(s[0]);

    for (let i =1;i<s.length;i++) {
        // 优化点：当然不用每次都检测了，左括号检测个毛线，直接入栈啊！
        let top = stack.length > 0 ? stack[stack.length - 1] : null;
        if (map[s[i]] === top) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.length === 0;
}
