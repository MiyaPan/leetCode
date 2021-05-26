/**
 * 222. 完全二叉树的节点个数
 * 给出一个完全二叉树，求出该树的节点个数。

    完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，
    并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

    示例:

    输入: 
        1
       / \
      2   3
     / \  /
    4  5 6

    输出: 6
*/
export const countNodes = (root) => {
    if (!root) {
        return 0;
    }

    return countNodes(root.left) + countNodes(root.right) + 1;
}

// 判断是左边不完全还是右边不完全，完全的一边用公式2^k -1，不完全的一边用加和遍历
// 怎么判断完全不完全：树的最左边和左右边是不是等长
export const countNodes1 = (root) => {
    if (!root) {
        return 0;
    }

    // while 这么写，基数就是1，lh和rh不光是用来做比较啊，如果是完全 ，还得用它计算呢！！！所以你不对啊
    // 下面那样才常用，节点有值就加1
    let lh = 1;
    let node = root;
    while(node.left) {
        lh++;
        node = node.left;
    }

    let rh = 1;
    node = root;
    while(node.right) {
        rh++;
        node = node.right;
    }

    // let left = root;
    // let h1 = 0;
    // while (left != null) {
    //     h1++;
    //     left = left.left;
    // }
    // let right = root;
    // let h2 = 0;
    // while (right != null) {
    //     h2++;
    //     right = right.right;
    // }

    if (lh === rh) {
        // 2 的多少次方运算用位移，位移比加减优先级还低，需要加括号
        // return Math.pow(2, lh) - 1;
        return (1 << lh) - 1;
    } else {
        // 最终只有瘸腿的那一分支是加和的，它的兄弟如果是完全的，也用了公式
        return countNodes1(root.left) + countNodes1(root.right) + 1;
    }
}

// 二分
export const countNodes = (root) => {
    return helper(root);
}

function helper(root) {
    if (!root) return 0;

    let node = root;
    let hl = 0;
    while(node) {
        hl++;
        node = node.left;
    }

    node = root;
    let hr = 0;
    while(node) {
        hr++;
        node = node.right;
    }

    if (hl === hr) {
        return (1 << hl) -1;
    } else {
        return helper(root.left) + helper(root.right) + 1;
    }
}
