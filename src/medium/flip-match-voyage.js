/**
 * 971. 翻转二叉树以匹配先序遍历
 * 给定一个有 N 个节点的二叉树，每个节点都有一个不同于其他节点且处于 {1, ..., N} 中的值。
    通过交换节点的左子节点和右子节点，可以翻转该二叉树中的节点。
    考虑从根节点开始的先序遍历报告的 N 值序列。将这一 N 值序列称为树的行程。
    （回想一下，节点的先序遍历意味着我们报告当前节点的值，然后先序遍历左子节点，再先序遍历右子节点。）
    我们的目标是翻转最少的树中节点，以便树的行程与给定的行程 voyage 相匹配。 
    如果可以，则返回翻转的所有节点的值的列表。你可以按任何顺序返回答案。
    如果不能，则返回列表 [-1]。

    示例 1：

    输入：root = [1,2], voyage = [2,1]
    输出：[-1]
    示例 2：

    输入：root = [1,2,3], voyage = [1,3,2]
    输出：[1]
    示例 3：

    输入：root = [1,2,3], voyage = [1,2,3]
    输出：[]
     
    提示：
    1 <= N <= 100
    链接：https://leetcode-cn.com/problems/flip-binary-tree-to-match-preorder-traversal
*/
/**
 * =============================
 * 二刷
*/
export const flipMatchVoyage = (root, voyage) => {
    if (!root) return [];

    let idx = 0;
    let ans = [];
    const dfs = (root) => {
        if (!root) return;
        if (root.val !== voyage[idx]) return false;

        idx++;

        if (root.left && root.left.val !== voyage[idx]) {
            ans.push(root.val);
            let first = dfs(root.right);
            let second = dfs(root.left);
            return first !== false && second !== false;
        } else {
            let first = dfs(root.left);
            let second = dfs(root.right);
            return first !== false && second !== false;
        }
    }
    if (dfs(root) !== false){
        return ans;
    } else {
        return [-1];
    }
}








/**
 * =============================
 * 1刷
*/
export const flipMatchVoyage1 = (root, voyage) => {
    if (!root) return [];

    let result = [];
    let voyageIndex = {i: 0};
    let flag = helper(root, voyage, voyageIndex, result);
    return flag ? result : [-1];
}

function helper(root, voyage, voyageIndex, result) {
    if (root.val !== voyage[voyageIndex.i]) return false;

    voyageIndex.i++;

    // 如果当前节点的左子不等于路径值，就把左右换过来
    if (root.left && (root.left.val !== voyage[voyageIndex.i])) {
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        result.push(root.val);
    }

    // 不能这样写，这样写 l和r 会是 null 当没子树的时候
    // let l = root.left && helper(root.left, voyage, voyageIndex, result);
    // let r = root.right && helper(root.right, voyage, voyageIndex, result);
    let l = 1, r = 1;
    if (root.left) {
        l = helper(root.left, voyage, voyageIndex, result);
    }
    if (root.right) {
        r = helper(root.right, voyage, voyageIndex, result);
    }

    return l && r;
}

// 还是要看看官方题解的，所有的翻转，都不用交换节点的，都只是 先遍历左 还是 先遍历右 的区别而已
export const flipMatchVoyage2 = (root, voyage) => {
    if (!root) return [];

    let result = [];
    let voyageIndex = {i: 0};
    let flag = dfs(root, voyage, voyageIndex, result);
    return flag === false ?  [-1]:result ;
}

function dfs(root, voyage, voyageIndex, result) {
    if (!root) return;
    if (root.val !== voyage[voyageIndex.i++]) return false;

    if (root.left && root.left.val !== voyage[voyageIndex.i]) {
        result.push(root.val);
        let l = dfs(root.right, voyage, voyageIndex, result);
        let r = dfs(root.left, voyage, voyageIndex, result);
        return l !==false && r !== false;
    } else {
        let l = dfs(root.left, voyage, voyageIndex, result);
        let r = dfs(root.right, voyage, voyageIndex, result);
        return l !==false && r !== false;
    }
}