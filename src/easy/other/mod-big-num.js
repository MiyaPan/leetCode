export const lastDigit = (str1, str2) => {
    const str1LastNumber = Number(str1[str1.length - 1]);

    if (str2 === '1') {
        return str1LastNumber;
    }

    if (str2 === '0') {
        return 1;
    }

    if (str1 === '0' && str2 === '0') {
        return 1;
    }

    const possibleNumber = [];
    let tempProduct = 1;
    while (true) {
        tempProduct *= str1LastNumber;
        if (possibleNumber.indexOf(tempProduct % 10) === -1) {
            possibleNumber.push(tempProduct % 10)
        } else {
            break;
        }
    }

    const mod = modBigNum(str2, possibleNumber.length);

    return mod === 0 ? possibleNumber[possibleNumber.length -1] : possibleNumber[mod - 1];
}

function modBigNum(s, divisor) {
    let mod = 0;
    for (let i = 0; i < s.length; i++) {
        mod = (mod * 10 + (s[i] - 0)) % divisor;
    }
    return mod;
}
