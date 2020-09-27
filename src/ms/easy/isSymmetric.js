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
export const isSymmetric = (root) => {
    if(!root) {
        return true;
    }

    return helper(root.left, root.right);
}

function helper(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;

    // return p.val === q.val && helper(p.left, q.left) && helper(p.right, q.right);
    return p.val === q.val && helper(p.left, q.right) && helper(p.right, q.left);
}

// 树的迭代只会层序，但是比较数组逆序就不对了，但是层序可以反着往里放啊！！！逆序的层序啊！
export const isSymmetricIterate = (root) => {
    if(!root) {
        return true;
    }

    let stack1 = [root.left];
    let stack2 = [root.right];
    let p = 0;

    while(p < stack1.length) {
        let node1 = stack1[p];
        let node2 = stack2[p];

        if (!node1 && !node2) {
            p++;
            continue;
        }

        if (!node1 || !node2) {
            return false;
        }

        if (node1.val !== node2.val) {
            return false;
        }

        stack1.push(node1.left);
        stack1.push(node1.right);

        stack2.push(node2.right);
        stack2.push(node2.left);

        p++;
    }

    return p === stack2.length;
}
