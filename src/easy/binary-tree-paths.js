/**
 * 257. 二叉树的所有路径
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
    说明: 叶子节点是指没有子节点的节点。

    输入:

      1
    /   \
   2     3
    \
     5

    输出: ["1->2->5", "1->3"]

    解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
*/
export const binaryTreePaths = (root) => {
    let result = [];

    _binaryTreePaths(root, []);

    function _binaryTreePaths(root, arr) {
        if (!root) {
            return '';
        }
    
        let p = arr.concat(root.val);
        if (!root.left && !root.right) {
            result.push(p.join('->'))
            return;
        }

        _binaryTreePaths(root.left, p);
        _binaryTreePaths(root.right, p);
    }

    return result;
}

// BFS 迭代实现这个也不错 https://leetcode-cn.com/problems/binary-tree-paths/solution/er-cha-shu-de-suo-you-lu-jing-by-leetcode/