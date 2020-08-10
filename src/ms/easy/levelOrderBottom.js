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
