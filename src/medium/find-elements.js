/**
 * 1261. 在受污染的二叉树中查找元素
 * 链接：https://leetcode-cn.com/problems/find-elements-in-a-contaminated-binary-tree/
*/
/**
 * =============================  
 * 二刷
*/
var FindElements = function(root) {
    if (!root) return null;
    root.val = 0;
    this.root = root;
    this.set = new Set();
    dfs(root, this.set);
}
function dfs(root, set) {
    if (!root) return;
    set.add(root.val);
    if (root.left) {
        root.left.val = root.val * 2 + 1;
        dfs(root.left, set);
    }
    if (root.right) {
        root.right.val = root.val * 2 + 2;
        dfs(root.right, set);
    }
}
/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
    return this.set.has(target);
};









/**
 * =============================  
 * 1 刷
*/
/**
 * @param {TreeNode} root
 */
var FindElements = function(root) {
    root.val = 0;
    let result = [];
    dfs(root, result);

    this.result = result;
    this.root = root;
};

function dfs(root, result) {
    if (!root) return;

    result.push(root.val);

    if (root.left) {
        root.left.val = root.val * 2 +1;
        dfs(root.left,result);
    }
    if (root.right) {
        root.right.val = root.val * 2 +2;
        dfs(root.right,result);
    }
}

/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
    return this.result.includes(target);
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
