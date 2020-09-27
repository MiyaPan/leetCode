/**
 * 938. 二叉搜索树的范围和
 * 给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。
    二叉搜索树保证具有唯一的值。

    示例 1：
    输入：root = [10,5,15,3,7,null,18], L = 7, R = 15
    输出：32
    
    示例 2：
    输入：root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
    输出：23

    提示：
    树中的结点数量最多为 10000 个。
    最终的答案保证小于 2^31。

    链接：https://leetcode-cn.com/problems/range-sum-of-bst
*/

var rangeSumBST = function(root, L, R) {
    let sum = 0;

    function dfs(root, L, R) {
        if (!root) return;
    
        // 如果值在 l 和 r 中间，左右子树都得遍历，没法剪枝
        if (root.val >= L && root.val <= R) {
            sum += root.val;
            dfs(root.left, L, R);
            dfs(root.right, L, R);
        }
        if (root.val < L) {
            dfs(root.right, L, R);
        }
        if (root.val > R) {
            dfs(root.left, L, R);
        }

        // 上述也可以写作，好难理解的写法
        // if (root.val >= L && root.val <= R) {
        //     sum += root.val;
        // }
        // if (root.val > L) {
        //     dfs(root.left, L, R);
        // }
        // if (root.val < R) {
        //     dfs(root.right, L, R);
        // }
    }

    dfs(root, L, R);

    return sum;
};

