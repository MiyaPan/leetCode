/**
 * 剑指 Offer 32 - III. 从上到下打印二叉树 III
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
*/
var levelOrder = function(root) {
    if (!root) return [];

    let ans = [];
    let stack = [root];
    let p = 0;
    let level = 0;
    while (p < stack.length) {
        let nodesInNextLevel = [];
        let nodesInCurLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (level % 2 === 0) {
                nodesInCurLevel.push(node.val);
            } else {
                nodesInCurLevel.unshift(node.val);
            }

            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        level++;
        ans.push(nodesInCurLevel);
        stack = stack.concat(nodesInNextLevel);
    }
    return ans;
};