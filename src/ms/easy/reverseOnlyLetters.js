/**
 * 917. 仅仅反转字母
 * 给定一个字符串 S，返回 “反转后的” 字符串，其中不是字母的字符都保留在原地，而所有字母的位置发生反转。

    示例 1：
    输入："ab-cd"
    输出："dc-ba"
    
    示例 2：
    输入："a-bC-dEf-ghIj"
    输出："j-Ih-gfE-dCba"
    
    示例 3：
    输入："Test1ng-Leet=code-Q!"
    输出："Qedo1ct-eeLg=ntse-T!"

    提示：
    S.length <= 100
    33 <= S[i].ASCIIcode <= 122 
    S 中不包含 \ or "

    链接：https://leetcode-cn.com/problems/reverse-only-letters
*/
export var reverseOnlyLetters = function(S) {
    let n = S.length;
    let result = S.split('');
    // 输入："a-bC-dEf-ghIj"
    // 输出："j-Ih-gfE-dCba"
    let i = 0;
    let j = n - 1;
    // while(i < j) {
    //     if (isLetter(result[i])) {
    //         if (!isLetter(result[j])) {
    //             j--;
    //         }
    //         let temp = result[j];
    //         result[j--] = result[i];
    //         result[i++] = temp;
    //     } else {
    //         i++;
    //     }
    // }
    while(i < j) {
        if (!isLetter(result[j])) {
            j--;
            continue;
        }
        if (!isLetter(result[i])) {
            i++;
            continue;
        }
        let temp = result[j];
        result[j--] = result[i];
        result[i++] = temp;
    }
    return result.join('');
};

function isLetter(x) {
    return /[a-zA-Z]/.test(x);
}
