/**
 * 107. 二叉树的层次遍历 II
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
/**
 * =============================
 * 二刷
*/
var levelOrderBottom = function(root) {
    // 树的题目一定要判空，不然会出现格式不正确等很多细节判断，比如这里不判断往下走就会返回 [[]]
    if (!root) return [];

    let stack = [root];
    let p = 0;
    let ans = [];
    let nodesInCurLevel = [];
    let nodesInNextLevel = [];
    while (p < stack.length) {
        // 我靠，不要忘了每轮置空啊
        nodesInCurLevel = [];
        nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            nodesInCurLevel.push(node.val);
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        ans.push(nodesInCurLevel);
        stack = stack.concat(nodesInNextLevel);
    }
    return ans.reverse();
}

/**
 * =============================
 * 一刷
*/
var levelOrderBottom = function(root) {
    if (!root) return [];

    let stack = [root];
    let result = [];
    let level = 0;
    let p = 0;

    while(p < stack.length) {
        let nodesInNextLvel = [];
        result[level] = [];
        while(p < stack.length) {
            let cur = stack[p];
            cur.left && nodesInNextLvel.push(cur.left);
            cur.right && nodesInNextLvel.push(cur.right);
            result[level].push(cur.val);
            p++;
        }

        level++;
        stack = stack.concat(nodesInNextLvel);
    }
    return result.reverse();
}
