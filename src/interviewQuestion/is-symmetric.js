/**
 * 面试题28. 对称的二叉树
 * 给定一个二叉树，检查它是否是镜像对称的。
    例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
        1
       / \
      2   2
     / \ / \
    3  4 4  3
     
    但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

        1
       / \
      2   2
       \   \
       3    3
     
    进阶：你可以运用递归和迭代两种方法解决这个问题吗
*/
export const isSymmetric = (root) => {
    if(!root) {
        return true;
    }

    return _isSymmetric(root.left, root.right);

    function _isSymmetric(t1, t2) {
        if (!t1 && !t2) {
            return true;
        }
        if (!t1 || !t2 || t1.val !== t2.val) {
            return false;
        }

        return _isSymmetric(t1.left, t2.right) && _isSymmetric(t1.right, t2.left);
    }
}

export const isSymmetricIterative = (root) => {
    if(!root) {
        return true;
    }

    let stack1 = [root.left];
    let stack2 = [root.right];
    let pointer = 0;
    let node1 = null;
    let node2 = null;
        /**
                      1
                   /     \
                  2       2
                 / \     /  \
                3   4    4   3
               / \ / \  / \  / \
              5  6 7  8 8  7 6  5
    */

    while(pointer < stack1.length) {
        node1 = stack1[pointer];
        node2 = stack2[pointer];

        // 如果都为 null，直接看下一个，不再往后走 push 了
        if (!node1 && !node2) {
            pointer++;
            continue;
        }

        if (!node1 || !node2 || node1.val !== node2.val) {
            return false;
        }

        stack1.push(node1.left);
        stack1.push(node1.right);

        stack2.push(node2.right);
        stack2.push(node2.left);

        pointer++;
    }
    
    return true;
}
