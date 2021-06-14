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