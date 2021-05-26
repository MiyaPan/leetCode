/**
 * 1372. 二叉树中的最长交错路径
 * https://leetcode-cn.com/problems/longest-zigzag-path-in-a-binary-tree/
*/
export const longestZigZag = (root) => {
    const nodeZigMap = new Map();
    let max = 0;

    dfs(root, nodeZigMap);

    Array.from(nodeZigMap.values()).forEach(value => {
        max = Math.max(max, value.zigleft);
        max = Math.max(max, value.zigRight);
    });

    return max;
}

// 节点的右拐值 = 1 + 右子的左拐值
// 右子的左拐值 = 1+ 右子的左子的右拐值
function dfs(root, nodeZigMap) {
    if (!root) return {zigleft: -1, zigRight: -1};

    const {zigleft: lzigleft, zigRight: lzigRight} = dfs(root.left, nodeZigMap);
    const {zigleft: rzigleft, zigRight: rigRight} = dfs(root.right, nodeZigMap);
    
    const zigleft = 1 + lzigRight;
    const zigRight = 1 + rzigleft;

    nodeZigMap.set(root, {zigleft, zigRight});

    return {zigleft, zigRight};
}

// 上面的 max 取值可以放到递归中
export const longestZigZag = (root) => {
    let max = 0;

    // 节点的右拐值 = 1 + 右子的左拐值
    // 右子的左拐值 = 1+ 右子的左子的右拐值
    function dfs(root) {
        if (!root) return {zigleft: -1, zigRight: -1};

        const {zigleft: lzigleft, zigRight: lzigRight} = dfs(root.left);
        const {zigleft: rzigleft, zigRight: rigRight} = dfs(root.right);
        
        const zigleft = 1 + lzigRight;
        const zigRight = 1 + rzigleft;

        max= Math.max(max,zigleft, zigRight);

        return {zigleft, zigRight};
    }

    dfs(root);

    // Array.from(nodeZigMap.values()).forEach(value => {
    //     max = Math.max(max, value.zigleft);
    //     max = Math.max(max, value.zigRight);
    // });

    return max;
}

