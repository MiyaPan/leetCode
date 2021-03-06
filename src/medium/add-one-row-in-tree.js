
/**
 * 623. 在二叉树中增加一行
 * 给定一个二叉树，根节点为第1层，深度为 1。在其第 d 层追加一行值为 v 的节点。

    添加规则：给定一个深度值 d （正整数），针对深度为 d-1 层的每一非空节点 N，为 N 创建两个值为 v 的左子树和右子树。
    将 N 原先的左子树，连接为新节点 v 的左子树；将 N 原先的右子树，连接为新节点 v 的右子树。
    如果 d 的值为 1，深度 d - 1 不存在，则创建一个新的根节点 v，原先的整棵树将作为 v 的左子树。

    示例 1:

输入: 
二叉树如下所示:
       4
     /   \
    2     6
   / \   / 
  3   1 5   

v = 1

d = 2

输出: 
       4
      / \
     1   1
    /     \
   2       6
  / \     / 
 3   1   5   

示例 2:

输入: 
二叉树如下所示:
      4
     /   
    2    
   / \   
  3   1    

v = 1

d = 3

输出: 
      4
     /   
    2
   / \    
  1   1
 /     \  
3       1
    注意:

    输入的深度值 d 的范围是：[1，二叉树最大深度 + 1]。
    输入的二叉树至少有一个节点。
*/

/**
 * @param {TreeNode} root
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
/**
 * =============================
 * 二刷
*/
var addOneRow = function(root, val, depth) {
    if (depth === 1) {
        let node = new TreeNode(val);
        node.left = root;
        return node;
    }
    let stack = [root];
    let p = 0;
    let level = 0;
    while (p < stack.length) {
        level++;
        let nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (level === depth-1) {
                let l = new TreeNode(val);
                let r = new TreeNode(val);
                let left = node.left;
                let right = node.right;
                l.left = left;
                r.right = right;
                node.left = l;
                node.right = r;
            } else {
                node.left && nodesInNextLevel.push(node.left);
                node.right && nodesInNextLevel.push(node.right);
            }
        }
        if (level === depth-1) break;

        stack = stack.concat(nodesInNextLevel);
    }
    return root;
};














/**
 * =============================
 * 一刷
*/
export const addOneRow = (root, v, d) => {
    if (d === 1) {
        return {
            val: v,
            left: root,
            right: null
        };
    }

    dfs(root, 1, d, v);
    return root;
}

function dfs(root, depth, d, v) {
    if (!root) {
        return;
    }

    // d 是新增节点所在的层，所以d-1层就要处理
    if (depth === d - 1) {
        let nodel = {
            val: v,
            left: root.left,
            right: null
        };
        let noder = {
            val: v,
            left: null,
            right: root.right
        }

        root.left = nodel;
        root.right = noder;
    } else {
        dfs(root.left, depth+1, d, v);
        dfs(root.right, depth+1, d, v);
    }
}