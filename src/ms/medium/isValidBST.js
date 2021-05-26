/**
 * 98. 验证二叉搜索树
 * https://leetcode-cn.com/problems/validate-binary-search-tree/
*/
// 输入:
//     5
//    / \
//   4   6
//      / \
//     3   8
// 输出: false
// 解释: 输入为: [5,1,4,null,null,3,6]。
//      根节点的值为 5 ，但是其右子节点值为 4 。
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
// 递归可以换一个更好读的写法：规定 lower 和 upper ，每个节点去校验就行了
var isValidBST = function(root) {
    return dfs(root).isValid;
}
function dfs(root) {
    if (!root) return {
        isValid: true,
        min: Number.MAX_SAFE_INTEGER,
        max: Number.MIN_SAFE_INTEGER
    }
    let {min: lMin, max: lMax, isValid: lValid} = dfs(root.left);
    let {min: rMin, max: rMax, isValid: rValid} = dfs(root.right);
    return {
        isValid: lValid && rValid && root.val > lMax && root.val < rMin,
        min: Math.min(root.val, lMin),
        max: Math.max(root.val, rMax)
    }
}
// 上面的递归无非就是看前驱和后继是不是合法，所以直接中序遍历就行了
var isValidBST = function(root) {
    let path = [];
    return dfs(root, path);
}
function dfs(root, path) {
    if (!root) return true;
    let l = dfs(root.left, path);

    if (root.val <= path[path.length-1]) return false;

    path.push(root.val);
// 这里干啥要 pop，又不是走跟到叶子的路径，而是中序遍历啊，遍历啊，就是要拿到所有值啊
    let r = dfs(root.right, path);

    return l && r;
}
// 迭代，上面的递归无非就是看前驱和后继是不是合法，所以直接中序遍历就行了
var isValidBST = function(root) {
    let stack = [];
    let ans = [];
    let node = root
    while (stack.length || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        let temp = stack.pop();
        if (temp.val <= ans[ans.length-1]) return false;
        ans.push(temp.val);

        node = temp.right;
    }
    return true;
}


/**
 * =============================
 * 一刷
*/
var isValidBST = function(root) {
    return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

// 二叉树的性质：如果该二叉树的左子树不为空，则左子树上所有节点的值均小于它的根节点的值； 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值；它的左右子树也为二叉搜索树。
// 左子树的值均小于它的父亲节点值，右子树的值均大于它的父亲节点值！
// https://leetcode-cn.com/problems/validate-binary-search-tree/solution/yan-zheng-er-cha-sou-suo-shu-by-leetcode-solution/
function dfs(node, lower, upper) {
    if (!node) return true;

    // 不仅要验证当前节点 + 左右子节点，还得：当前节点和左子节点都得小于父亲节点的值，右都得大于！
    // let isLeftValid = true;
    // if (node.left) {
    //     isLeftValid = node.val > node.left.val && dfs(node.left);
    // }

    // let isRightValid = true;
    // if (node.right) {
    //     isRightValid = node.val < node.right.val && dfs(node.right);
    // }

    if (node.val <= lower || node.val >= upper) return false;

    return dfs(node.left, lower, node.val) && dfs(node.right, node.val, upper);
}

// 解法二：
// 中序遍历啊啊啊啊！
export var isValidBST2 = function(root) {
    return dfsInOrder(root, {val: Number.MIN_SAFE_INTEGER});
};

function dfsInOrder(node, pre) {
    if (!node) return true;

    // 必须得找个全局变量保存 pre，不然左子树递归回溯的时候，pre 不会被更新为刚访问的节点，用数组也行，对象也行，
    // 全局变量不行，函数传形参，改的是函数内的，改不到全局
    if (!dfsInOrder(node.left, pre)) return false;

    if (node.val <= pre.val) return false;

    pre.val = node.val;

    return dfsInOrder(node.right, pre);
}

// 解法三：
// 中序遍历的递归写法！
// 需要 stack 的！
export var isValidBST3 = function(root) {
    let pre = Number.MIN_SAFE_INTEGER;
    let p = root;
    let stack = [];

    // while(p || stack.length >= 0) {
    //     // 一捅到底，但是这样 判断 node.left，逻辑就乱了
    //     while(p.left) {
    //         stack.push(p.left);
    //         p = p.left;
    //     }
    //     if (p.val <= pre) return false;

    //     pre = p.val;

    //     if (p.right) {
    //         p = p.right;
    //     } else {
    //         p = stack.pop().right;
    //     }
    // }

    // 都先入栈，再统一出栈的时候判断，这样不会出错
    while(stack.length > 0 || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }

        p = stack.pop();
        if (p.val <= pre) return false;
        pre = p.val;

        p = p.right;
    }


    return true;
};

