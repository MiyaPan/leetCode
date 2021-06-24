/**
 * 剑指 Offer 32 - II. 从上到下打印二叉树 II
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/
*/
var levelOrder = function(root) {
    if (!root) return [];

    let ans = [];
    let stack = [root];
    let p = 0;
    while (p < stack.length) {
        let nodesInCurLevel = [];
        let nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            nodesInCurLevel.push(node.val);

            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        ans.push(nodesInCurLevel);
        stack = stack.concat(nodesInNextLevel);
    }
    return ans;
};
