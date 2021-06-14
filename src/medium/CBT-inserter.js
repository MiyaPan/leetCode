/**
 * 919. 完全二叉树插入器
 * 完全二叉树是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。
    设计一个用完全二叉树初始化的数据结构 CBTInserter，它支持以下几种操作：

    CBTInserter(TreeNode root) 使用头节点为 root 的给定树初始化该数据结构；
    CBTInserter.insert(int v)  向树中插入一个新节点，节点类型为 TreeNode，值为 v 。使树保持完全二叉树的状态，并返回插入的新节点的父节点的值；
    CBTInserter.get_root() 将返回树的头节点。

    示例 1：
    输入：inputs = ["CBTInserter","insert","get_root"], inputs = [[[1]],[2],[]]
    输出：[null,1,[1,2]]
    
    示例 2：
    输入：inputs = ["CBTInserter","insert","insert","get_root"], inputs = [[[1,2,3,4,5,6]],[7],[8],[]]
    输出：[null,3,4,[1,2,3,4,5,6,7,8]]

    提示：
    最初给定的树是完全二叉树，且包含 1 到 1000 个节点。
    每个测试用例最多调用 CBTInserter.insert  操作 10000 次。
    给定节点或插入节点的每个值都在 0 到 5000 之间。

    链接：https://leetcode-cn.com/problems/complete-binary-tree-inserter
*/
/**
 * =============================
 * 二刷
*/
var CBTInserter = function(root) {
    this.root = root;
};

/** 
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function(v) {
    let stack = [this.root];
    let p = 0;
    while (p < stack.length) {
        let nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (!node.left) {
                node.left = new TreeNode(v);
                return node.val;
            }
            if (!node.right) {
                node.right = new TreeNode(v);
                return node.val;
            }
            nodesInNextLevel.push(node.left);
            nodesInNextLevel.push(node.right);
        }
        stack = stack.concat(nodesInNextLevel);
    }
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function() {
    return this.root;
};





/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 */
var CBTInserter = function(root) {
    this.root = root;
};

/** 
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function(v) {
    let stack = [this.root];
    let nodesInNextLevel = [];
    let pointer = 0;
    let parent = this.root.val;
    let firstNodeInCurLevel = this.root;

    while(pointer < stack.length) {
        firstNodeInCurLevel = nodesInNextLevel[0];
        nodesInNextLevel = [];
        while(pointer < stack.length) {
            let node = stack[pointer++];

            if (!node.left) {
                node.left = new TreeNode(v);
                parent = node.val;
                return parent;
            }
            if (!node.right) {
                node.right = new TreeNode(v);
                parent = node.val;
                return parent;
            }
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }

        stack = stack.concat(nodesInNextLevel);
    }

    // 这种情况不会出现的
    // firstNodeInCurLevel.left = new TreeNode(v);
    // parent = firstNodeInCurLevel.val;

    return parent;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function() {
    return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */