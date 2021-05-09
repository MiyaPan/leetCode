/**
 * 101. 对称二叉树
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
/**
 * =============================
 * 二刷，done
*/
export const isSymmetric = (root) => {
    if(!root) {
        return true;
    }

    return _isTwoTreeSymmetric(root.left, root.right);
    
    function _isTwoTreeSymmetric(root1, root2) {
        if (root1 === null && root2 === null) {
            return true;
        }
        if (root1 === null || root2 === null || root1.val !== root2.val) {
            return false;
        }
        return _isTwoTreeSymmetric(root1.left, root2.right) && _isTwoTreeSymmetric(root1.right, root2.left);
    }
}

/**
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
*/
export const isSymmetricIterate = (root) => {
    if(!root) {
        return true;
    }

    return _isTwoTreeSymmetric(root.left, root.right);
    /**
                      1
                   /     \
                  2       2
                 / \     /  \
                3   4    4   3
               / \ / \  / \  / \
              5  6 7  8 8  7 6  5
    */
    function _isTwoTreeSymmetric(leftTree, rightTree) {
        let stack1 = [leftTree];
        let stack2 = [rightTree];
        let pointer = 0;

        while(pointer < stack1.length) {
            let node1 = stack1[pointer];
            let node2 = stack2[pointer];

            // 错在少写了这个 if，当两个都 null 的时候不应该再 push null.left null.right 了，报错啊，
            // 单纯 pointer 跳过 null 就行了，不要放弃 **往堆栈里放 null 的思路！这是对的！不过只应该放一层，null 的 null 就跳过循环就行，不要在 push 那里加判断！**
            if (node1 === null && node2 === null) {
                pointer++;
                continue;
            }
            if((node1 === null || node2 ===null )|| node1.val !== node2.val) {
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
}
