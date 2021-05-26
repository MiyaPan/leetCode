/**
 * 958. 二叉树的完全性检验
 * 
 * 给定一个二叉树，确定它是否是一个完全二叉树。
    百度百科中对完全二叉树的定义如下：
    若设二叉树的深度为 h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树。（注：第 h 层可能包含 1~ 2h 个节点。）

      1
    /   \
   2     3
  / \   /
 4   5 6
 最后一层前的每一层都是满的（即，结点值为 {1} 和 {2,3} 的两层），且最后一层中的所有结点（{4,5,6}）都尽可能地向左。
*/

/**
 *    1
    /   \
   2     3
  /     / \
 4     6   5
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export const isCompleteTree = (root) => {
    let stack = [root];
    let nodesInNextLevel = [];
    let p = 0;
    let shouldBeNull = false;
    while (p < stack.length) {
        nodesInNextLevel = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (node && shouldBeNull) return false;
            if (!node) {
                shouldBeNull = true;
            }
            node && nodesInNextLevel.push(node.left);
            node && nodesInNextLevel.push(node.right);
        }
        stack = stack.concat(nodesInNextLevel);
    }
    return true;
}







/**
 * =============================
 * 一刷
*/
// 要再刷一次，看了下之前的思路才想通的
// 思路：就按照直观看到的，如果当前层前面有一个节点是 null 了，它层序后面就不能是 null 了，而不用统计个数再看左右子，就最直观的就行啊
export const isCompleteTree = (root) => {
    if (!root) {
        return false;
    }

    /**
     *     1            1                1
     *   /   \        /   \            /   \
     *  2     3      2     3          2     3
     * /                  /  \       /     /  \
     * 5                  5   6     4      5   6
    */
    let satck = [root];
    let pointer = 0;

    let nextNodeShouldBeNull = false;
    while(pointer < satck.length) {
        // 但，其实，不用分层的，不用 nodesInNextLevel 的，一个 while 遍历就行了
        let nodesInNextLevel = [];
        while(pointer < satck.length) {
            let node = satck[pointer++];
            if (nextNodeShouldBeNull && node) return false;
            // 只要碰到一个 null，后面就不能有节点了
            if (!node) nextNodeShouldBeNull = true;
            node && nodesInNextLevel.push(node.left);
            node && nodesInNextLevel.push(node.right);
        }
        satck = satck.concat(nodesInNextLevel);
    }

    return true;
}

export const isCompleteTree = (root) => {
    if (!root) {
        return false;
    }

    let satck = [root];
    let pointer = 0;

    let nextNodeShouldBeNull = false;
    while(pointer < satck.length) {
        let node = satck[pointer++];
        if (nextNodeShouldBeNull && node) return false;
        // 只要碰到一个 null，后面就不能有节点了
        if (!node) nextNodeShouldBeNull = true;
        node && satck.push(node.left);
        node && satck.push(node.right);
    }

    return true;
}
