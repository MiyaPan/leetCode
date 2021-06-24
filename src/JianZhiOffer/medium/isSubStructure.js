/**
 * 剑指 Offer 26. 树的子结构
 * https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/
*/
var isSubStructure = function(A, B) {
    if (!A || !B) return false;

    let stack = [A];
    let p = 0;
    while (p < stack.length) {
        let node = stack[p++];
        if (node.val === B.val) {
            if (dfs(node, B)) return true;
        }
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
    }
    return false;
};
function dfs(A, B) {
    if (!B) return true;
    if (!A && B) return false;
    if (A.val !== B.val) return false;
    return dfs(A.left, B.left) && dfs(A.right, B.right);
}
