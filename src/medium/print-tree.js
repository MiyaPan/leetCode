
/**
 * 655. 输出二叉树
 * 
 * 在一个 m*n 的二维字符串数组中输出二叉树，并遵守以下规则：

行数 m 应当等于给定二叉树的高度。
列数 n 应当总是奇数。
根节点的值（以字符串格式给出）应当放在可放置的第一行正中间。根节点所在的行与列会将剩余空间划分为两部分（左下部分和右下部分）。
你应该将左子树输出在左下部分，右子树输出在右下部分。左下和右下部分应当有相同的大小。
即使一个子树为空而另一个非空，你不需要为空的子树输出任何东西，但仍需要为另一个子树留出足够的空间。然而，如果两个子树都为空则不需要为它们留出任何空间。
每个未使用的空间应包含一个空的字符串""。
使用相同的规则输出子树。
示例 1:

输入:
     1
    /
   2
输出:
[["", "1", ""],
 ["2", "", ""]]
示例 2:

输入:
     1
    / \
   2   3
    \
     4
输出:
[["", "", "", "1", "", "", ""],
 ["", "2", "", "", "", "3", ""],
 ["", "", "4", "", "", "", ""]]
示例 3:

输入:
      1
     / \
    2   5
   / 
  3 
 / 
4 
输出:
[["",  "",  "", "",  "", "", "", "1", "",  "",  "",  "",  "", "", ""]
 ["",  "",  "", "2", "", "", "", "",  "",  "",  "",  "5", "", "", ""]
 ["",  "3", "", "",  "", "", "", "",  "",  "",  "",  "",  "", "", ""]
 ["4", "",  "", "",  "", "", "", "",  "",  "",  "",  "",  "", "", ""]]
注意: 二叉树的高度在范围 [1, 10] 中。
*/
export const printTree = (root) => {
    let maxDepth = getMaxDepth(root);
    let rowLength = Math.pow(2, maxDepth) - 1;
    let row = Array(rowLength).fill('');
    // 这样写，也是引用的同一个数组啊啊啊
    // let result = Array(maxDepth).fill([...row]);
    let result = Array(maxDepth).fill(null).map(() => [...row]);

    dfs(root, 0, result, 0, rowLength - 1);

    return result;
}

function dfs(root, depth, result, left, right) {
    if (!!root) {
        let currentIndex = Math.floor((left + right) / 2);
    
        result[depth][currentIndex] = (root.val) + '';
    
        dfs(root.left, depth+1, result, left, currentIndex);
        dfs(root.right, depth+1, result, currentIndex+1, right);
    }
}

function getMaxDepth(root) {
    if (!root) {
        return 0;
    }

    let l = getMaxDepth(root.left);
    let r = getMaxDepth(root.right);
    return 1 + Math.max(l,r);
}
