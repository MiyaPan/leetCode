/**
 * 863. 二叉树中所有距离为 K 的结点
 * 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。
    返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。

    示例 1：

    输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
    输出：[7,4,1]
    解释：
    所求结点为与目标结点（值为 5）距离为 2 的结点，
    值分别为 7，4，以及 1

    注意，输入的 "root" 和 "target" 实际上是树上的结点。
    上面的输入仅仅是对这些对象进行了序列化描述。
    提示：
        给定的树是非空的。
        树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
        目标结点 target 是树上的结点。
        0 <= K <= 1000.

    链接：https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree
 */ 

 /**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
// // 思路：距离为k的，无非：在左子树上 || 在右子树上 || 父节点网上，找距离他为 k 的，其实就是找距离这三个 k-1 的，依次递归
// // 最终找的是 距离为 0 的，也就是退出递归的节点的left、right和root
// // 父节点这里，不能递归中回溯，不然拿到的是距离 target 是 k-1 的节点，反而近了一个，用个 set 来保存已访问节点处理
export const distanceK = (root, target, K) => {
    let parentMap = new Map();
    setParent(root, null, parentMap);
    
    let nodesInLevel = [target];
    let visited = new Set();
    visited.add(target);

    while(nodesInLevel.length) {
        if (K === 0) return nodesInLevel.map(node => node.val);

        nodesInNextLevel = [];
        for(const node of nodesInLevel) {
            visited.add(node);

            if (node.left && !visited.has(node.left)) nodesInNextLevel.push(node.left);
            if (node.right && !visited.has(node.right)) nodesInNextLevel.push(node.right);
            const parent = parentMap.get(node);
            if (parent && !visited.has(parent)) nodesInNextLevel.push(parent);
        }

        nodesInLevel = nodesInNextLevel;
        K--;
    }

    return [];
}

function setParent(root, parent, parentMap){
    if (!root) return;

    parentMap.set(root, parent);

    root.left && setParent(root.left, root, parentMap);
    root.right && setParent(root.right, root, parentMap);
}

// huapeng代码
var distanceK_huapeng = function(root, target, K) {
    const parentMap = new Map();
    findParent(root, null, parentMap);

    let adjs = [target];
    const visited = new Set();
    while (adjs.length) {
        if (K === 0) return adjs.map(node => node.val);

        const nextAdjs = [];
        for (const node of adjs) {
            visited.add(node);

            const parent = parentMap.get(node);
            if (parent && !visited.has(parent)) nextAdjs.push(parent);
            const left = node.left;
            if (left && !visited.has(left)) nextAdjs.push(left);
            const right = node.right;
            if (right && !visited.has(right)) nextAdjs.push(right);
        }
        adjs = nextAdjs;
        K--;
    }
    return [];
};

function findParent(node, parent, parentMap) {
    if (node === null) return;
    parentMap.set(node, parent);
    findParent(node.left, node, parentMap);
    findParent(node.right, node, parentMap);
}