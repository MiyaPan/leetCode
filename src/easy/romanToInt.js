// 耗时：144ms，超过 98.32%
// 内存：39.9 MB，超过 74.36%
export const romanToInt = (s) => {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    const letters = s.split('');
    let sum = 0;

    for (let i = 0; i< letters.length; i++) {
        if (letters[i] === 'I' && letters[i+1] === 'V'
            || letters[i] === 'I' && letters[i+1] === 'X') {
            if (letters[i+1] === 'V') {
                sum += 4;
            }
            if (letters[i+1] === 'X') {
                sum += 9;
            }
            i++;
        } else if (letters[i] === 'X' && letters[i+1] === 'L'
            || letters[i] === 'X' && letters[i+1] === 'C') {
            if (letters[i+1] === 'L') {
                sum += 40;
            }
            if (letters[i+1] === 'C') {
                sum += 90;
            }
            i++;
        } else if (letters[i] === 'C' && letters[i+1] === 'D'
            || letters[i] === 'C' && letters[i+1] === 'M') {
            if (letters[i+1] === 'D') {
                sum += 400;
            }
            if (letters[i+1] === 'M') {
                sum += 900;
            }
            i++;
        } else {
            sum += map[letters[i]];
        }
    }

    return sum;
}

/**
 * 1. string 在 js 里可以直接取index值，和数组一样， s[2]
 * 2. 题目已经描述的很清楚了，如果后面的字符比前面大，就减掉前面的 -- 读题！
 * 3. 优先处理特殊情况
*/ 

// 耗时：200ms，超过 16.40%
// 内存：39.6 MB，超过 92.37%
// PS: 这种处理，代码简单了，但是复杂度提高了，因为每个字母都要判断后一个字母了
export const romanToInt2 = (s) => {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    if (s.length === 0) {
        return 0;
    }

    if (s.length === 1) {
        return map[s];
    }

    const letters = s.split('');
    let sum = 0;

    for (let i = 0; i< letters.length; i++) {
        if (map[letters[i]] < map[letters[i+1]]) {
            sum -= map[letters[i]];
        } else {
            sum += map[letters[i]];
        }
    }

    return sum;
}
