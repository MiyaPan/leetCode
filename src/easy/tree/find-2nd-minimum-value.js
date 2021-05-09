/**
 * 671. 二叉树中第二小的节点
 * 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。如果一个节点有两个子节点的话，那么这个节点的值不大于它的子节点的值。 

    给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。
    示例 1:

    输入: 
        2
       / \
      2   5
         / \
        5   7

    输出: 5
    说明: 最小的值是 2 ，第二小的值是 5 。
    示例 2:

    输入: 
        2
       / \
      2   2

    输出: -1
    说明: 最小的值是 2, 但是不存在第二小的值。
*/
/**
 * =============================
 * 二刷
*/
export const findSecondMinimumValue = (root) => {
    if (!root) return null;
    let target = root.val;
    let l = root.left && dfs(root.left, target);
    let r = root.right && dfs(root.right, target);
    if (l !== null && r !== null) {
        return Math.min(l, r);
    } else if (l !== null || r !== null) {
        return l || r;
    } else {
        return -1;
    }
}
function dfs(root, target) {
    if (!root) return null;
    if (root.val !== target) return root.val;
    let l = dfs(root.left, target);
    let r = dfs(root.right, target);
    // 我靠，+null = 0; +undefined = NaN
    if (l !== null && r !== null) {
        return Math.min(l, r);
    } else {
        return l || r;
    }
}

/**
 * =============================
 * 一刷
*/
export const findSecondMinimumValue = (root) => {
    if (!root) {
        return -1;
    }

    let min = Number.MAX_SAFE_INTEGER;
    let min2nd = Number.MAX_SAFE_INTEGER;

    traseval(root);

    function traseval(node) {
        if(!node) {
            return;
        }

        // 更新 min 这一步，要把 min 旧值更新给 min2nd，不然会漏掉前面遍历过的 小 min
        // min = node.val < min ? node.val : min;
        // min2nd = (node.val < min2nd) && (node.val > min) ? node.val : min2nd;

        if (node.val < min) {
            // 值小于最小值
            min2nd = min;
            min = node.val;
        }
        if (node.val < min2nd && node.val > min) { // 等于的不用管
            // 值大于最小值，但小于第二小
            min2nd = node.val;
        }

        traseval(node.left);
        traseval(node.right);
    }

    return min2nd === Number.MAX_SAFE_INTEGER ? -1 : min2nd;
}
