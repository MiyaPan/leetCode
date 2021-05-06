/**
 * 171. Excel表列序号
 * 给定一个Excel表格中的列名称，返回其相应的列序号。
    例如，
        A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28 
        ...
    示例 1:
    输入: "A"
    输出: 1
    
    示例 2:
    输入: "AB"
    输出: 28
    
    示例 3:
    输入: "ZY"
    输出: 701

    链接：https://leetcode-cn.com/problems/excel-sheet-column-number
*/
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function(columnTitle) {
    let n = columnTitle.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let charCode = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1;
        sum += charCode * Math.pow(26, n-i-1);
    }
    return sum;
};
