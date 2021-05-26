
/**
 * 894. 所有可能的满二叉树
 * 满二叉树是一类二叉树，其中每个结点恰好有 0 或 2 个子结点。
    返回包含 N 个结点的所有可能满二叉树的列表。 答案的每个元素都是一个可能树的根结点。
    答案中每个树的每个结点都必须有 node.val=0。
    你可以按任何顺序返回树的最终列表。

    示例：

    输入：7
    输出：[[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],
        [0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]

    链接：https://leetcode-cn.com/problems/all-possible-full-binary-trees
*/

/**
 * @param {number} N
 * @return {TreeNode[]}
 */
// 思路：N 肯定奇数，因为是满二叉树，只有根是一个，其他都成对出现
// “枚举”肯定用动态规划
// 每个迭代，遍历 N-2 的result数组中的树，对于每棵树，给所有叶子节点依次加 2 个节点
// 超时了，属于暴力了，不行了
// export const allPossibleFBT = (N) => {
//     if (N % 2 !== 1) return [null];

//     if (N === 3) {
//         const root = new TreeNode(0);
//         root.left = new TreeNode(0)
//         root.right = new TreeNode(0);
//         return [root];
//     }

//     const base = allPossibleFBT(N-2);

//     // bulit 放所有构造的新二叉树，及其对应的 JSON 串，为了去重
//     let bulit = new Map();

//     let result = [];

//     for (let i = 0; i < base.length; i++) {
//         let root = base[i];
//         // setted 放数里面被加过子节点的叶节点
//         const setted = new Set([]);
//         let leaives = leafCount(root);

//         let arr = [];
//         for (let j = 0; j <leaives; i++) {
//             const newTree = Object.assign({}, root);
//             dfs(newTree, setted);

//             let dup = false;
//             for (const tree of bulit) {
//                 if (bulit.get(tree) === JSON.stringify(newTree)) dup = true;
//             }

//             !dup && arr.push(newTree);
//         }
//         result = result.concat(arr);
//     }
    
//     return result;
// }

// function leafCount(root) {
//     if (!root) return 0;

//     if (!root.left && !root.right) {
//         return 1;
//     }

//     let l = leafCount(root.left);
//     let r = leafCount(root.right);

//     return l + r;
// }

// function dfs(root, setted) {
//     if (!root) return false;

//     // 叶子节点
//     if (!root.left && !root.right && !setted.has(root)) {
//         setted.add(root);
//         root.left = new TreeNode(0);
//         root.right = new TreeNode(0);

//         return true;
//     }

//     let setOne = dfs(root.left, setted);
//     setOne = !setOne && dfs(root.right, setted);

//     return setOne;
// }

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 思路：如果要的树是颗满二叉树，那子树也都是满二叉，把 N 分成两个数的合，用这两个加数分别去构造子树，
// 然后遍历加数构造所得的数组，排列组合，分别添加在当前 根节点上，这样去构造新树。
// 像上面那种顶部固定，自顶向下的向叶节点添加的方式，根是没法区分树的，由于存的都是大对象，又没办法存根节点，只能 Object.assign 这样，就会超内存
// 所以一定要从底向上，这样新 new 的是根节点，我们能保持这个引用，而不用保存大对象，还得去重，这样都不用去重？
// 是的不用去重，比如 7分成 3 + 3【1是自己】，N = 3时，并不会构造两颗，因为返回的 mapN[1]只有1个元素，所以 i -> j的映射只有 1 -> 1，只生产一颗
// 类似的，7 的左3 和右3 也只有一颗，并不会重复，不会 i和j 不会分别等于 3 出现两次 
export const allPossibleFBT = (N) => {
    let mapN = new Map();
    return helper(N, mapN);
}

function helper(N, mapN) {
    if (N % 2 !== 1) return [];

    if (mapN.has(N)) return mapN.get(N);

    if(N === 1) return [new TreeNode(0)];

    let ans = []
    for (let i = 1; i < N; i++) {
        // 减的 1 是自己，根节点
        let j = N - 1 - i;

        const leftNodes = helper(i, mapN);
        const rightNodes = helper(j, mapN);

        leftNodes.forEach(leftRoot => {
            rightNodes.forEach(rightRoot => {
                const root = new TreeNode(0);
                root.left = leftRoot;
                root.right = rightRoot;

                ans.push(root);
            });
        });
    }

    mapN.set(N, ans)

    return ans;
}