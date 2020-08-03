/**
 * 1111. 有效括号的嵌套深度
 * 示例 1：
    输入：seq = "(()())"
    输出：[0,1,1,1,1,0]
    
    示例 2：
    输入：seq = "()(())()"
    输出：[0,0,0,1,1,0,1,1]
    解释：本示例答案不唯一。
    按此输出 A = "()()", B = "()()", max(depth(A), depth(B)) = 1，它们的深度最小。
    像 [1,1,1,0,0,1,1,1]，也是正确结果，其中 A = "()()()", B = "()", max(depth(A), depth(B)) = 1 。 

    链接：https://leetcode-cn.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings
*/
// 哇，括号还不够明显吗！！用栈解析啊！！
// 核心思想就是：连续的 (会造成嵌套深度的增加，因此对于这种要把他们分到不同的组中。
// https://leetcode-cn.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/solution/you-xiao-gua-hao-de-qian-tao-shen-du-by-leetcode-s/
var maxDepthAfterSplit = function(seq) {
    let n = seq.length;
    let stack = [seq[0]];
    let ans = [0];
    for (let i = 1; i < n; i++) {
        if (canMatch(stack[stack.length-1], seq[i])) {
            ans.push(!(stack.length % 2));
            stack.pop();
        } else {
            stack.push(seq[i]);
            ans.push(!(stack.length % 2));
            // 每多一个 （ 就变一次 flag，其实就等于 对 2 取模，偶数 flag = 0，奇数 = 1，同时还能照顾到栈外的 ），而不需要特殊计算
            // flag != flag;
        }
    }
    return ans;
};

function canMatch(a,b) {
    return a === '(' && b === ')';
}

// 由于只有 ()，栈中只会存 (，而且ans 塞 0 还是 1 恰好可以用栈高度推出，所以不用栈，用个变量保存
var maxDepthAfterSplit = function(seq) {
    let n = seq.length;
    let depth = 0;
    let ans = [];
    for (let i = 0; i < n; i++) {
        if (seq[i] === '(') {
            depth++;
            ans.push(depth % 2);
        } else {
            ans.push(depth % 2);
            depth--;
        }
    }
    return ans;
};
