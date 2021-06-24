/**
 * 剑指 Offer 31. 栈的压入、弹出序列
 * https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/
*/
var validateStackSequences = function(pushed, popped) {
    let n = pushed.length;
    let m = popped.length;
    if (n !== m) return false;

    let i = 0;
    let stack = [];
    while (i < n) {
        while (i < n && pushed[i] !== popped[0]) {
            stack.push(pushed[i]);
            i++;
        }
        // 相等的这个要先push进去，统一再删除
        stack.push(pushed[i++]);
        
        while (stack.length > 0 && stack[stack.length-1] === popped[0]) {
            stack.pop();
            popped.shift();
        }
    }
    return stack.length === 0;
};
