/**
 * 剑指 Offer 68 - II. 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
    百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

    例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

    示例 1:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
    输出: 3
    解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
    
    示例 2:
    输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
    输出: 5
    解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
     
    说明:
    所有节点的值都是唯一的。
    p、q 为不同节点且均存在于给定的二叉树中。
    注意：本题与主站 236 题相同：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
    链接：https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof
*/
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 递归
var lowestCommonAncestor = function(root, p, q) {

}
// getPath 可以单独抽出来，更规范，执行两遍还是一遍根本不影响任何事情
var lowestCommonAncestor = function(root, p, q) {
    let pPath = [];
    let qPath = [];
    let path = [];
    dfs(root, p, q, path, pPath, qPath);

    let lenP = pPath.length;
    let lenQ = qPath.length;
    let i = 0;
    let j = 0;
    let ans = pPath[0];
    while (i < lenP && j < lenQ && pPath[i] === qPath[j]) {
        ans = pPath[i];
        i++;
        j++;
    }
    return ans;
};
function dfs(root, p, q, path, pPath, qPath) {
    if (!root) return;

    path.push(root);

    if (root === p) {
        // 卧槽，咋又在函数里改变量，只能 push 操作啥的，不能赋值啊
        // pPath = [...path];
        pPath.push(...path);
    }
    if (root === q) {
        // qPath = [...path];
        qPath.push(...path);
    }
    dfs(root.left, p, q, path, pPath, qPath);
    dfs(root.right, p, q, path, pPath, qPath);
    path.pop();
}
