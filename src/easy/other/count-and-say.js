
/**
 * 38. 外观数列
 * 「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下： 
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 * 1 被读作  "one 1"  ("一个一") , 即 11。
 * 11 被读作 "two 1s" ("两个一"）, 即 21。
 * 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。
 * 给定一个正整数 n（1 ≤ n ≤ 30），输出外观数列的第 n 项。
 * 注意：整数序列中的每一项将表示为一个字符串。
 */
// 打败 36.75%
export const countAndSay = (n) => {
    if (n === 1) {
        return '1';
    }
    
    let s = countAndSay(n-1);

    let count = 0;
    let current = s[0];
    let result = '';
    for(let i = 0; i<= s.length; i++) {
        if (current === s[i]){
            count++;
        } else {
            result = result + count + s[i-1];
            count = 1;
            current = s[i];
        }
    }
    return result;
}

// 正则和字符串替换
export const countAndSay1 = (n) => {
    let start = '1';
    for(let i = 1; i< n; i++) {
        // (\d*) 没有*，有*就是匹配所有数字了
        start = start.replace(/(\d)\1*/g, (match, digital) => {
            return match.length + digital;
        })
    }
    return start;
}
