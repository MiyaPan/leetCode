
/**
 * 1104. 二叉树寻路
 * 在一棵无限的二叉树上，每个节点都有两个子节点，树中的节点 逐行 依次按 “之” 字形进行标记。
    如下图所示，在奇数行（即，第一行、第三行、第五行……）中，按从左到右的顺序进行标记；
    而偶数行（即，第二行、第四行、第六行……）中，按从右到左的顺序进行标记。

    给你树上某一个节点的标号 label，请你返回从根节点到该标号为 label 节点的路径，该路径是由途经的节点标号所组成的。

    示例 1：
    输入：label = 14
    输出：[1,3,4,14]
    示例 2：
    输入：label = 26
    输出：[1,2,6,10,26]

    提示：
    1 <= label <= 10^6
    链接：https://leetcode-cn.com/problems/path-in-zigzag-labelled-binary-tree
*/
export const pathInZigZagTree = (label) => {
    if (label === 1) return [1];
    let result = [label];

    helper(label, result);

    return result.sort((a,b) => a-b);
}

function helper(label, result) {
    // 2^k -1 是 label 上面的满二叉树，所以对 2^k -1 = label 里的 k 向上取整，就能得到 label 所在的 k
    const k = Math.ceil(logBase(2, label+1));
    // 第 k 层满二叉树的起始节点是 2^(k-1)，所以 k 距离它这层的起始节点距离可以得出，同时考虑左右方向
    // 这里是按不曲折的，把偶数行 倒过来计算的，所以 distance 要根据 k 的奇偶判断
    const distance = k%2 === 1 ? label - Math.pow(2, k-1) : (Math.pow(2, k) -1) - label;
    // 又因为 label 的上层都是满的，即每个节点都有 2 个孩子，
    // 所以 distance 除以 2 可以得出 label 的父节点距离上层起始节点的距离，也就得到了父节点，然后递归父节点即可
    const parentDist = Math.floor(distance/2);

    // 上层节点也要注意左右顺序
    const parent = k%2 === 1 ? Math.pow(2, k-1) -1  - parentDist : Math.pow(2, k-2) + parentDist;

    result.push(parent);

    parent > 1 && helper(parent, result);
}

// 以 x 为底， y 的对数
function logBase(x, y) {
    return Math.log(y) / Math.log(x);
}
