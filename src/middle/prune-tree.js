/**
 * 814. 二叉树剪枝
 * 
 * 给定二叉树根结点 root ，此外树的每个结点的值要么是 0，要么是 1。
    返回移除了所有不包含 1 的子树的原二叉树。
    ( 节点 X 的子树为 X 本身，以及所有 X 的后代。)
    示例1:
    输入: [1,null,0,0,1]
    输出: [1,null,0,null,1]

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/binary-tree-pruning
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
export const pruneTree = (root) => {
    if (!root) {
        return null;
    }

    dfs(root);

    return root;
}

function dfs(root) {
    if (!root) {
        return false;
    }

    // 脑抽了？
    // if (root.val === 1) {
    //     return true;
    // }

    let l = dfs(root.left);
    if (!l) {
        root.left = null;
    }

    let r = dfs(root.right);
    if (!r) {
        root.right = null;
    }

    if (!l && !r && root.val === 0) {
        return false;
    } else {
        return true;
    }
}
