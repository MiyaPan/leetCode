/**
 * 94. 二叉树的中序遍历
 * 
 * 给定一个二叉树，返回它的中序 遍历。
    示例:
    输入: [1,null,2,3]
       1
        \
        2
        /
       3
    输出: [1,3,2]
    进阶: 递归算法很简单，你可以通过迭代算法完成吗
*/
// TODO: 三刷
/**
 * =============================
 * 一刷
*/
export const inorderTraversal = (root) => {
    let stack = [];
    let ans = [];
    let node = root;
    while (stack.length > 0 || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        let temp = stack.pop();
        ans.push(temp.val);
        node = temp.right;
    }
    return ans;
}



/**
 * =============================
 * 一刷
*/
// 啥也别说了，刷吧！！！生做也能做出来，就是难看啊
export const inorderTraversal = (root) => {
    // 这句判断怎么能少呢！
    if (!root) return [];
    let stack = [];
    let ans = [];
    let isFromStack = false;
    let node = root;
    while(stack.length > 0 || node) {
        // 这里把 根 给 pop 出来了，就没法访问右边了
        // node = stack.pop();
        while (node && !isFromStack) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        ans.push(node.val);
        if (node.right) {
            node = node.right;
            isFromStack = false;
        } else {
            node = stack[stack.length-1];
            isFromStack = true;
        }
    }
    return ans;
}

// 非递归
export const inorderTraversalNotRecursive = (root) => {
    const result = [];
    // 因为下面while里，如果 node.left，会 push node，所以初始化不用。或者while里就不要判断 node.left，而是判断 node
    // let stack = [root];
    let stack = [];
    let node = root;
    let pre = null;

    // 因为是中序，root 会从栈中弹出，当把 root 从栈里 pop 出来的时候，栈空了，还需要加 || node 这个条件
    while(stack.length || node) {
        // 不用 pop 栈顶，下一个 node 总是在循环最后给出，要么是栈里的，要么是右子
        // node = stack.pop();
        while(node.left && node !== pre) {
            stack.push(node);
            node = node.left;
        }

        result.push(node.val);

        // 右子"从来不入栈"，只有左子入栈 -- 右子会作为下个循环的根入栈
        if (node.right) {
            node = node.right;
        } else {
            node = stack.pop();
            // 记录下前一个从栈里弹出的节点，只需要记录栈里弹出的就行，保证栈里的不重复入栈就行
            pre = node;
        }
    }
    
    return result;
}

// 非递归 - while 中判 node 而不是 node.left,看看会不会缩减代码
export const inorderTraversalNotRecursive1 = (root) => {
    const result = [];
    let stack = [root];
    let node = root.left;

    while(stack.length || node) {
        while(node) {
            stack.push(node);
            // 这样最后一个 node 是 null，我们可以直接开始出栈
            // 所以用到遍历的流程，最好都把 null push 进去？？？！！！
            node = node.left;
        }

        node = stack.pop();
        result.push(node.val);
        // node 会为 null，这样正好跳过下个循环的 while，接着出栈！
        // 如果不为 null，正好遍历右子树！赞啊！也不用记录 pre了！！
        // 二叉树的 null 一定要重视，要好好用起来啊
        // 一定不要判断，就是直接赋值，因为 null 是有用的！！！！
        node = node.right;
    }
    
    return result;
}