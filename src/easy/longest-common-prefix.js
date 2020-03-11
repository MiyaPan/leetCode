// 执行用时 : 76 ms，击败了 34.82%
// 内存消耗 : 35.3 MB, 击败了 43.61%
export const longestCommonPrefix = (strs) => {
    if (strs.length === 0) {
        return '';
    }

    if (strs.length === 1) {
        return strs[0];
    }

    for (let j = 0; j < strs[0].length; j++) {
        for (let i = 1; i < strs.length; i++) {
            // 保证 [0] 是最短的
            if (strs[i].length < strs[0].length) {
                let temp = strs[0];
                strs[0] = strs[i];
                strs[i] = temp;
            }

            if (i === strs.length -1 && j === strs[0].length - 1 && strs[i][j] === strs[0][j]) {
                return strs[0];
            }
            if (strs[i][j] !== strs[0][j]) {
                return (strs[0]).substring(0,j);
            }
        }
    }

    return '';
}

// 执行用时 : 92 ms，击败了 10.71%
// 内存消耗 : 33.9 MB, 击败了 89.18%
export const longestCommonPrefix2 = (strs) => {
    if (strs.length === 0) {
        return '';
    }

    strs.sort();

    const first = strs[0];
    const last = strs[strs.length - 1];

    // 1. 这样写正则不行！
    // if (first === last || last.match(`/^${first}/`)) {
    
    // 2. 正则效率低
    // const reg = new RegExp(`^${first}`)
    // if (first === last || last.match(reg)) {

    // 3. includes 不对，includes 是只要包含就 true，不是起始位置
    // if (first === last || last.includes(first)) {

    // 执行用时 : 64 ms，击败了 84.91%
    // 内存消耗 : 33.8 MB, 击败了 91.72%
    if (first === last || last.startWith(first)) {
        return first;
    } else {
        for (let i = 0; i< first.length; i++) {
            if (first[i] !== last[i]) {
                return first.substring(0, i);
            }
        }
    }

    return '';
}
