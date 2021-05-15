/**
 * 450. 删除二叉搜索树中的节点
 * 
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
 * 返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：
首先找到需要删除的节点；
如果找到了，删除它。

说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

示例:
root = [5,3,6,2,4,null,7]
key = 3

    5
   / \
  3   6
 / \   \
2   4   7
给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。

一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
    5
   / \
  4   6
 /     \
2       7

另一个正确答案是 [5,2,6,null,4,null,7]。
    5
   / \
  2   6
   \   \
    4   7

链接：https://leetcode-cn.com/problems/delete-node-in-a-bst
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * 思路：二叉搜索树删除节点，谁该上来顶替它？当然是要么它的前驱，要么它的后继，有谁来谁，就左好了。
 *      前驱就是它的左子树的最右节点，后继就是它的右子树的最左节点。
 * 
 * 所以分类：
 * 
 * 1. 没有子节点的，直接删除
 * 2. 有右子的，找后继，来替代，再删除后继
 * 3. 有左子的，找前驱，来替代，再删除前驱【也可以找后继，但是左子的后继不好找还得回溯，所以直接前驱好了】
 * 
 * https://leetcode-cn.com/problems/delete-node-in-a-bst/solution/shan-chu-er-cha-sou-suo-shu-zhong-de-jie-dian-by-l/
 */ 

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export var deleteNode = function(root, key) {
    if (!root) return null;
    
    let dummy = new TreeNode();
    dummy.right = root;
    dfs(root, key, dummy);
    return dummy.right;
}
function dfs(root, key, parent) {
    if (root.val === key) {
        if (!root.left && !root.right) {
            // root = null;
            if (parent.left === root) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        } else if (!root.left || !root.right) {
            if (parent.left === root) {
                parent.left = root.left || root.right;;
            } else {
                parent.right = root.left || root.right;;
            }
        } else {
            let temp = root.left;
            let node = root.right;
            while (node.left) {
                node = node.left;
            }
            node.left = temp;
            // 传进来的是引用，如果不更改引用，只改里面的值没有问题
            // 但是一旦修改了引用，就等于这个引用指向了别的地方，而不会影响到外面
            // root = root.right;
            if (parent.left === root) {
                parent.left = root.right;
            } else {
                parent.right = root.right;
            }
        }
    } else if (root.val > key) {
        root.left && dfs(root.left, key, root);
    } else {
        root.right && dfs(root.right, key, root);
    }
}






/**
 * =============================
 * 一刷
*/
var deleteNode1 = function(root, key) {
    if (!root) return null;

    if (key > root.val) root.right = deleteNode(root.right, key);
    else if (key < root.val) root.left = deleteNode(root.left, key);
    else {
        // 如果 key === root.val，这样递归下来，就不用去 find 了，因为此时肯定 == key，找到了
        // let [parent, tar] = findNode(key, root);
        // if (!tar) return null;
    
        // 是叶子节点，无孩子
        if (!root.left && !root.right) root = null;
    
        // 删除节点有右孩子
        else if (root.right) {
            let successor = findSuccessor(root);
            root.val = successor.val;
            // 已经把后继的值替换到目标节点了，下面要删除的就是后继的值的节点了
            root.right = deleteNode(root.right, successor.val);
        }
    
        // 删除节点有左孩子
        else if (root.left) {
            let preccessor = findPreccessor(root);
            root.val = preccessor.val;
            root.left = deleteNode(root.left, preccessor.val);
        }
    }
    return root;
};

// 后继：先取当前节点的 right，然后 right 一直向左，没有向右哦！
function findSuccessor(root) {
    let node = root.right;
    while(node.left) {
        node = node.left;
    }

    return node;
}

// 前驱
function findPreccessor(root) {
    let node = root.left;
    while(node.right) {
        node = node.right;
    }

    return node;
}

// function findNode(key, root) {
//     if (!root) return null;

//     let node = root;
//     let parent = root;
//     while(node && node.val !== key) {
//         if (node.val < key) {
//             parent = node;
//             node = node.right;
//         } else {
//             parent = node;
//             node = node.left;
//         }
//     }
//     return [parent, node];
// }
