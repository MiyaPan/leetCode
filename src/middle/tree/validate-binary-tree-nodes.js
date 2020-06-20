/**
 * 1361. 验证二叉树
 * https://leetcode-cn.com/problems/validate-binary-tree-nodes/
*/
/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
// 思路：一个节点不能被多个节点指向，也不能不被节点指向【这种就看访问结束的时候，数组是不是遍历完了就行】
// 不应该从 0 开始，可能存在倒着指向，但是也是一棵树的，比如：2， [-1,-1], [-1,0]，
// 所以先找入度为 0 的，也就是根节点，已根节点为开始，挨个索引；如果存在多个入度为 0 的直接错
export const validateBinaryTreeNodes = (n, leftChild, rightChild) => {
    if (n !== leftChild.length || n !== rightChild.length) return false;
    // 记录已经被指向过的节点引用【引用就是编号[0-n)】
    // let visited = new Set();

    // 不应该从 0 开始，可能存在倒着指向，但是也是一棵树的，比如：2， [-1,-1], [-1,0]，
    // 所以先找入度为 0 的，也就是根节点，已根节点为开始，挨个索引；如果存在多个入度为 0 的直接错
    let root = [];
    for (let i =0; i < n; i++) {
        if (!leftChild.includes(i) && !rightChild.includes(i)) {
            root.push(i);
        }
    }
    if (root.length !== 1) return false;

    let stack = [root[0]];
    let pointer = 0;

    while (pointer < stack.length) {
        let curNode = stack[pointer++];
        // 用 stack 判断就用不着这个了
        // if (visited.has(curNode)) {
        //     return false;
        // } else {
        //     visited.add(curNode);
        // }

        const left = leftChild[curNode];
        if (~left) {
            if (stack.includes(left)) return false;
            else stack.push(left);
        }
        const right = rightChild[curNode];
        if (~right) {
            if (stack.includes(right)) return false;
            else stack.push(right);
        }
    }

    if (pointer < leftChild.length) return false;

    return true;
}
