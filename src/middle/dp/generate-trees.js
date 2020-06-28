/**
 * 95. 不同的二叉搜索树 II
 * https://leetcode-cn.com/problems/unique-binary-search-trees-ii/
*/
export const generateTrees = (n) => {
    // 正常情况要的是数组啊，怎么会返回 null，当然是空数组！！！
    // if (n === 0) return null;
    if (n === 0) return [];

    let root = new TreeNode(1);
    let pre = [root];
    let cur = [root];

    for (let num = 2; num <= n; num++) {
        cur = [];
        for (let i = 0; i < pre.length; i++) {
            let root = pre[i];
            // 在根节点上添加新数字
            let newRoot = new TreeNode(num);
            newRoot.left = root;
            cur.push(JSON.parse(JSON.stringify(newRoot)));

            let node = root;
            // 再右子树依次添加
            while(node) {
                let newNode = new TreeNode(num);
                // 注意这里，要清晰，只操作了右子，左子不要管！
                newNode.left = node.right;
                node.right = newNode;
                // Object.assign 是浅拷贝！！！！最简单的深拷贝是 JSON.parse(JSON.stringfy)
                // let copy = Object.assign({}, root);
                let copy = Object.assign(JSON.parse(JSON.stringify(root)));
                cur.push(copy);

                // 撤回上面对原树的改动
                node.right = newNode.left;

                node = node.right;
            }
        }

        pre = [...cur];
    }

    return cur;
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 递归，好多地方碰到的思路
// 见解法二：https://leetcode-cn.com/problems/unique-binary-search-trees-ii/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-2-7/
export const generateTrees1 = (n) => {
    if (n === 0) return [];
    return helper(1, n);
}

function helper(start, end) {
    // 空数组会使 以 1 为根时，左子树为空，进不来排列组合的循环，所以要放个null！！
    // if (start > end) return [];
    if (start > end) return [null];
    if (start === end) return [new TreeNode(start)];
    
    let result = [];
    for (let i = start; i <= end; i++) {
        // 得到的是所有可能的左子树
        let leftTrees = helper(start, i-1);
        // 得到的是所有可能的右子树，要排列组合
        let rightTrees = helper(i+1, end);
        
        for (let left of leftTrees) {
            for (let right of rightTrees) {
                let root = new TreeNode(i);
                root.left = left;
                root.right = right;
                result.push(root);
            }
        }
    }

    return result;
}