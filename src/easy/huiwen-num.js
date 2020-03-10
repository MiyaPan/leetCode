export const isPalindrome = (x) => {
    if ( x< 0) {
        return false;
    }

    let y = 0;
    let t = x;
    while(x !==0) {
        y = y *10 + t% 10;
        t = ~~(t/10); 
    }

    return y === x;
}

// 官方解法：只计算一半就够
export const isPalindrome = (x) => {
    if ( x< 0 || x % 10 === 0 && x !==0) {
        return false;
    }

    let y = 0;
    while(x > y) {
        y = y *10 + x% 10;
        x = ~~(x/10); 
    }

    // x === parseInt(y/10)：奇数位，如 12321，y = 123, x = 12
    return y === x || x === parseInt(y/10);
}