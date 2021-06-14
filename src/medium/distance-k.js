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
// TODO: 三刷! 好的思路真是省时间又省力气
/**
 * =============================  
 * 二刷
*/
// setParent 不想也不该修改源数据，用 map 映射啊
// 只用树的广度遍历思路就不对，比如：[0,null,1,2,5,null,3,null,null,null,4]，2，2，答案 [4,5,0] 还包含 5
// 并不是只从根去找哦！！！！！还是的 seetParent 再广度
export var distanceK = function(root, target, k) {
    let ans = [];
    let children = getChildren(target, k);
    ans = ans.concat(children);

    let parents = getParents(root,target);

    let cur = target;
    let pre = target;
    for (let i = parents.length-1; i >= 0; i--) {
        let parent = parents[i];
        pre = cur;
        cur = parent.find(node => node.left === cur || node.right === cur);
        k--;
        if (k === 0) {
            ans.push(cur.val);
            return ans;
        }
    }
    let newtar = pre === cur.left ? cur.right : cur.left;
    if (newtar) {
        let others = getChildren(newtar, k-1);
        ans = ans.concat(others);
    }
    return ans;
};
function getParents(root, target) {
    let stack = [root];
    let stackByLevel = [[root]];
    let p = 0;
    while(p < stack.length) {
        let nodesInNextLevel = [];
        while(p < stack.length) {
            let node = stack[p++];
            if (node && (node.left === target || node.right === target)) return stackByLevel;
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        stack = stack.concat(nodesInNextLevel);
        stackByLevel.push(nodesInNextLevel);
    }
    return [];
}
function getChildren(root, k) {
    if (k === 0) return [root.val];
    let stack = [root];
    let p = 0;
    let level = 0;
    while(p < stack.length) {
        let nodesInNextLevel = [];
        while(p < stack.length) {
            let node = stack[p++];
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        level++;

        if (level === k) return nodesInNextLevel.map(node => node.val);;
        stack = stack.concat(nodesInNextLevel);
    }
    return [];
}

export var distanceK = function(root, target, k) {
    if (k === 0) return [target.val];

    // setParent 不修改元数据，用 map 映射啊
    let parentMap = new Map();

    root.left && setParent(root, root.left, parentMap);
    root.right && setParent(root, root.right, parentMap);

    let visited = new Map();
    let stack = [target];
    let p = 0;
    let level = 0;
    while(p < stack.length) {
        let nodesInNextLevel = [];
        while(p < stack.length) {
            let node = stack[p++];
            visited.set(node, true);
            if (node.left && !visited.has(node.left)) {
                nodesInNextLevel.push(node.left);
            }
            if (node.right && !visited.has(node.right)) {
                nodesInNextLevel.push(node.right);
            }
            let parent = parentMap.get(node);
            if (parent && !visited.has(parent)) {
                nodesInNextLevel.push(parent);
            }
        }
        level++;

        if (level === k) return nodesInNextLevel.map(node => node.val);;
        stack = stack.concat(nodesInNextLevel);
    }
    return [];
}
function setParent(parent, cur, parentMap) {
    parentMap.set(cur, parent);
    cur.left && setParent(cur, cur.left, parentMap);
    cur.right && setParent(cur, cur.right, parentMap);
}















/**
 * =============================  
 * 二刷
*/
// // 思路：距离为k的，无非：在左子树上 || 在右子树上 || 父节点网上，找距离他为 k 的，其实就是找距离这三个 k-1 的，依次递归
// // 最终找的是 距离为 0 的，也就是退出递归的节点的left、right和root
// // 父节点这里，不能递归中回溯，不然拿到的是距离 target 是 k-1 的节点，反而近了一个，用个 set 来保存已访问节点处理
export const distanceK1 = (root, target, K) => {
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