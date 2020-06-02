/**
 * 236. 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
    百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，
    满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

    例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

    示例 1:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
    输出: 3
    解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

    示例 2:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
    输出: 5
    解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
     
    说明: 所有节点的值都是唯一的。p、q 为不同节点且均存在于给定的二叉树中。
*/
export const lowestCommonAncestor = (root, p, q) => {

    let ancestor = null;
    let pathp = [];
    let pathq = [];

    helper(root, []);

    const len = Math.min(pathq.length, pathq.length);

    for(let i = 0; i< len; i++) {
        if(pathp[i] !== pathq[i]) {
            ancestor = pathp[i-1];
            break;
        }
    }

    if (!ancestor) {
        ancestor = pathp[len -1];
    }

    return ancestor;

    function helper(node, path) {
        if (!node) {
            return null;
        }

        path.push(node);

        if (node === p) {
            pathp = [...path];
        }

        if (node === q) {
            pathq = [...path];
        }

        node.left && helper(node.left, path);
        node.right && helper(node.right, path);

        path.pop();
    }
}

// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/236-er-cha-shu-de-zui-jin-gong-gong-zu-xian-hou-xu/
/**
 * 思路：
 * 1. 如果 root === p 或者 === q，当前节点就是
 * 2. 不是1，遍历左右子树，如果左右子树分别都发现了值，那当前节点就是
 * 3. 如果左右子树中只有一个发现了，把**发现的**值返回，知道递归回溯到一个节点，它的左右子树都能发现，返回它，就是2
*/
export const lowestCommonAncestor1 = (root, p, q) => {
    if (!root) {
        return null;
    }

    if (root === p || root === q) {
        return root;
    }
    
    const left = lowestCommonAncestor1(root.left, p, q);
    const right = lowestCommonAncestor1(root.right, p, q);


    if (left && right) {
        return root;
    }
    // 这里必须返回值，以带到第一层的递归中，如果返 true，就导致返回值不对，拿不到下层的公共节点了
    // 这里是为了，找到公共节点之后，能顺利回溯，把公共节点返回到第一层
    if (!left) {
        return right;
    }
    if (!right) {
        return left;
    }
    return null;
}
