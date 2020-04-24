# 二叉树

TODO: **请二刷的时候给所以题目补全思路【面试的时候交流的是思路，而不是代码细节！】**

LeetCode 二叉树题目汇总：https://tding.top/archives/101cdf53.html
http://www.jintiankansha.me/t/4EJM5iEhVB
https://juejin.im/post/5d9f0b9551882509165ff2a8

二叉树解法就全是递归，不要想非递归的方法！非递归的 BFS 和 DFS 会就行，其他问题都递归，不用想非递归解法，更不简洁了。

## 0. 二叉树的一些性质

二叉树第i层上的结点数目最多为 2^(i-1) (i≥1)
深度为h的二叉树至多有2^h-1个结点(h≥1)
包含n个结点的二叉树的高度至少为log2 (n+1)
在任意一棵二叉树中，若终端结点的个数为n0，度为2的结点数为n2，则n0=n2+1

## 1. 二叉树深度遍历 DFS

参考： https://www.jianshu.com/p/5e9ea25a1aae
https://segmentfault.com/a/1190000008850005

### 先序遍历 - 即先根遍历
1. 递归写法

```js
function preOrder(p) {
    if (node === null) {
        return;
    }
    
    let result = [];
    _preOrder(p, result);
}

function _preOrder(node, result) {
    if (node) {
        result.push[node.val];
        _preOrder(node.left);
        _preOrder(node.right);
    }
}
```
2. 非递归遍历

```js
function preOrderNonRecursive(node) {
    if (node === null) {
        return;
    }
    
    let result = [];
    let stack = [node];
    let currentNode = node.left;
    let top = null;

    // 当把根节点 pop 出来时，stack 为空，这时候因为右子还有，还要继续遍历
    while(stack.length || currentNode) {
        // 一捅到底的把左子都放进去，知道左子为空，开始弹出，出的时候检查右子，如果还有左子就接着捅，没有就单纯出
        while(currentNode) {
            result.push(currentNode.val); // 和中序的区别就是在 while push 左孩子的时候就输出“根节点值”
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
    
        // 出顶节点，不用放右孩子到栈里，只是把当前节点更新为右孩子，这样就避免了拿到顶元素又去遍历左孩子的死循环
        top = stack.pop();
        currentNode = top.right;
    }

    return result;
}
```

3. 非递归 - 2【想先访问谁就后压栈谁】

```js
function preOrderNonRecursive2(node) {
    if (node === null) {
        return;
    }
    
    let result = [];
    let stack = [node];
    let currentNode = null;

    while(stack.length) {
        currentNode = stack.pop()
        result.push(currentNode.val);
        currentNode.right && stack.push(currentNode.right);
        currentNode.left && stack.push(currentNode.left);
    }

    return result;
}
```


### 中序遍历 - 即中根遍历

1. 递归解法

```js
function inOrder(p) {
    if (node === null) {
        return;
    }
    
    let result = [];
    _inOrder(p, result);
}

function _inOrder(node, result) {
    if (node) {
        _inOrder(node.left);
        result.push[node.val];
        _inOrder(node.right);
    }
}
```

2. 非递归遍历

```js
function inOrderNonRecursive(node) {
    if (node === null) {
        return;
    }
    
    let result = [];
    let stack = [node];
    let currentNode = node.left;
    let top = null;

    // 当把根节点 pop 出来时，stack 为空，这时候因为右子还有，还要继续遍历
    while(stack.length || currentNode) {
        // 一捅到底的把左子都放进去，知道左子为空，开始弹出，出的时候检查右子，如果还有左子就接着捅，没有就单纯出
        while(currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
 
        // 出顶节点，不用放右孩子到栈里，，只是把当前节点更新为右孩子，这样就避免了拿到顶元素又去遍历左孩子的死循环
        // 不要企图 push 右节点，push 的操作都放到 while 里，pop 都在 while 外，清晰
        top = stack.pop();
        result.push(top.val);
        currentNode = top.right;
    }

    return result;
}
```

3. 非递归遍历 2

```js
// 先递归遍历左子树，从最后一个左子树开始存入数组，然后回溯遍历双亲结点，再是右子树，这样递归循环。
function inOrderNonRecursive2(node) {
    if (node === null) {
        return;
    }
    
    let stack = [node];
    let result = [];
    let currentNode = node;
    let top = null;

    // 如果加点不空，就放进去，节点空就向前 pop 一个【向前的，都是之前左序一个个push进去的根，所以】，再看 pop 的这个的 right，重复循环
    while(stack.length || node) {
        if (currentNode.left) { // 也就是解法 1 中的 while，感觉上面的效率更高一点？？
            stack.push(currentNode.left);
            currentNode = currentNode.left;
        } else {
            top = stack.pop();
            result.push(top.val);
            currentNode = top.right;
        }
    }
    return result;
}
```

### 后序遍历 - 即后根遍历

1. 递归写法
```js
function postOrder(p) {
    if (node === null) {
        return;
    }
    
    let result = [];
    _postOrder(p, result);
}

function _postOrder(node, result) {
    if (node) {
        _postOrder(node.left);
        _postOrder(node.right);
        result.push[node.val];
    }
}
```
2. 非递归写法

```js
// https://segmentfault.com/a/1190000008850005
/**
 * 思路：非递归版本中，对于一个结点，如果我们要输出它，只有它既没有左孩子也没有右孩子或者它有孩子但是它的孩子已经被输出（由此设置 pre 变量）。
 * 若非上述两种情况，则将该结点的右孩子和左孩子依次入栈，这样就保证了每次取栈顶元素的时候,先依次遍历左子树和右子树。
*/
function postOrderNonRecursive(node) {
    if (node === null) {
        return;
    }

    let stack = [node];
    let result = [];
    let currentNode = node;
    let pre = null;

    while(stack.length) {

        currentNode = stack[stack.length - 1];

        // 出栈并记录值：1. 叶子节点；2. 刚刚已经访问过其左孩子或者右孩子了。
        // 否则，右、左孩子按序入栈
        if ((currentNode.left === null && currentNode.right === null)
            // 如果树只有一个很节点和右孩子，如果不加 pre && 这个判断条件，pre == null === root.left == null，会把 root 输出就跳出了，不行，关键因为用的 || 这个判断，没办法
            // 只有当第一个 currentNode.left === null && currentNode.right === null 成立过之后 
            // -- 也就是有叶子节点输出了【要输出的第一个节点必然为叶子，否则不对】
            // pre 会被更新，后面的 pre 就起到 防止重复入栈的作用了
            || (pre && (pre == currentNode.left || pre == currentNode.right))) {

            result.push(currentNode.val);
            pre = currentNode;
            stack.pop();

        } else {
            currentNode.right && stack.push(currentNode.right);
            currentNode.left && stack.push(currentNode.left);
        }
    }
    return result;
}
```


## 2. 二叉树广度遍历 BFS -- 层序遍历

1. 用栈，递归

```js
function bfsStack(node) {
    let stack = [node];
    let result = [];
    let count = 0;
    _bfs(node, result, count);
}

function _bfs(node, result, count) {
    let node = stack[count];
    if (node) {
        result.push(node.val);
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
        count++;
        // 这里没法用 while 是因为出栈的条件不好找
        _bfs(node, result, count);
    }

    return result;
}
```

2. 用队列，不用递归了

```js
function bfsQueue(node) {
    let result = [];
    let queue = [node];

    while(queue.length) {
        node = queue.shift(); // 取队列首元素
        result.push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return result;
}
```

3. 用队列，不用递归了，优化性能：shift 性能低，换用指针来记录

```js
function bfsQueue(node) {
    let result = [];
    let queue = [node];
    let pointer = 0;

    while(queue.length) {
        node = queue[pointer++]; // 取队列首元素
        result.push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return result;
}
```

## 3. 求树的结点数

粗暴的方法是用 BFS 或者 DFS 遍历一遍。简单写法：

```js
function countNode(node) {
    if (!node) {
        return 0;
    }
    // +1 就是数了自己
    return countNode(node.left) + countNode(mode.right) + 1;
}
```

## 4. 求树的叶子节点数

```js
function countLeafNode(node) {
    // 不要忘了 0 这个结束条件
    if (node === null) {
        return 0;
    }

    if (node.left === null && node.right === null) {
        return 1;
    }
    return countLeafNode(node.left) + countLeafNode(node.right);
}
```

## 5. 获取树的深度

我想的是层序遍历的时候 count 一下，就不太简洁了
```js
function getDepth(node) {
    if (!node) {
        return 0;
    }
    let leftDepth = getDepth(node.left) + 1;
    let rightDepth = getDepth(node.right) + 1;
    return leftDepth > rightDepth ? leftDepth : rightDepth;
}
```

## 6. 求二叉树第k层的结点个数

```js
function getKLevelNodes(k, node) {
    if (!node) {
        return 0;
    }

    if (k === 1) {
        return 1;
    }
    // k 是递减，但是不是倒着递归的，而是
    /**
     * k 层的节点数 = root.left 的 k - 1 层节点数 + root.right 的 k - 1 层节点数
     * root.left 在 k - 1 层节点数 = (root.left).left 的 k -2 层的节点数 + (root.left).right 的 k -2 层的节点数
     * ...
     * 是这样一层层分解子树下去的，k 做为计数用
     * 
     * 因为二叉树只能从根往下走，没办法倒着遍历，所以只能从根开始左右递归
    */
    return getKLevelNodes(k -1, node.left) + getKLevelNodes(k -1, node.right);
}
```

## 7. 判断两棵二叉树是否（结构）相同

```js
/**
 * 从这里可以体会到：处理二叉树，只需要处理 3 个节点，根为首的 3 个【抽象递归公式】，和叶子节点的 3 个【处理边界】
*/
function isSameTree(p, q) {
    if (!p && !q) {
        return true;
    }
    if (!q || !q) {
        return false;
    }

    // 只判断结构是否相同，就去掉 p.val === q.val 这个条件即可
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

## 8. 求二叉树的镜像

```js
function mirrorTree(node) {
    if (!node) {
        return;
    }
    let temp = node.left;
    node.left = node.right;
    node.right = temp;

    mirrorTree(node.left);
    mirrorTree(node.right);

    // 递归的退出条件上面已经有了，不用 return 了，不 return 的函数会 return undefined，我们这里只是不需要返回值而已，并不是函数没返回，函数总有返回的
}
```

## 9. 求两个结点的最低公共祖先结点 - 在解题前，先问面试官是不是特殊性质的二叉树

参考：http://zhedahht.blog.163.com/blog/#m=0&t=3&c=%E5%BE%AE%E8%BD%AF

分析：求数中两个结点的最低共同结点是面试中经常出现的一个问题。这个问题至少有两个变种。

第一变种是二叉树是一种特殊的二叉树：查找二叉树。也就是树是排序过的，位于左子树上的结点都比父结点小，而位于右子树的结点都比父结点大。我们只需要从根结点开始和两个结点进行比较。如果当前结点的值比两个结点都大，则最低的共同父结点一定在当前结点的左子树中。如果当前结点的值比两个结点都小，则最低的共同父结点一定在当前结点的右子树中。

第二个变种是树不一定是二叉树，每个结点都有一个指针指向它的父结点。于是我们可以从任何一个结点出发，得到一个到达树根结点的单向链表。因此这个问题转换为两个单向链表的第一个公共结点。

>JS 没有指针（pointer），只有引用（reference）。一个简单的判断依据就是：指针是可以有 ++ 操作的，但 JS 办不到。


1. 自顶向下的方法

note：先想怎么能解决，再想怎么更好的解决，不要企图一下找最优的解法

思路：从根节点出发，如果都在左子树，那公共节点在左子树中，都在右子树，那公共节点在右子树中。如果一个在左子树，一个在右子树，那当前节点就是最低公共。

由于对每个结点都调用了 findNode 函数，时间复杂度：O(n^n)，空间复杂度：O(n)

```js
function findLCATop2Bottom(node, target1, target2) {
    const inLeft = findNode(node.left, target1) && findNode(node.left, target2);
    const inRight = findNode(node.right, target1) && findNode(node.right, target2);
    if (inLeft) {
        return findLCATop2Bottom(node.left, target1, target2);
    }
    if (inRight) {
        return findLCATop2Bottom(node.right, target1, target2);
    }
    return node;
}

function findNode(node, target) {
    if (!node) {
        return false;
    }

    if (node === target) {
        return true;
    }

    // 这个函数整体是要返回值的，不是遍历就行了的
    return findNode(node.left, target) || findNode(node.right, target);
}
```

2. 自底向上的方法

note：**如何能做到自底向上？递归！能保留当前状态**。这也是二叉树这么多递归的原因。

思路：左右递归遍历，如果找到目标，返回节点，到达上一层递归中，如果是在上一次的左子中找到的，就继续执行类似的右子树的递归。
如果右子树没找到，就返回左子树找到的节点，以此类推，如果没找齐左右两个，就始终退出递归到上一层中，直到在某层递归中，同时在左右子中找到了目标节点，返回这个节点。然后继续退出递归，这个时候肯定只能在 `findLCABottom2Top(node.left, target1, target2)` 或 `findLCABottom2Top(node.right, target1, target2);` 之一找到目标节点，所以会一直返回找到的节点退出，直到退出到第一层。

时间复杂度：O(n)

```js
function findLCABottom2Top(node, target1, target2) {
    if (!node) {
        return null;
    }

    // 不用关心是 p 还是 q，只要有就行，那另外一个肯定是 q 或 p
    if (node === p || node === q) {
        // 这里返回 true 也一样。我们用不着 node 的值
        return node;
    }

    // 如果左边找到了，那 left 就是 p 或者 q 那个节点，我们不用一层层返回根节点，因为递归栈中有，不用手动返回
    const left = findLCABottom2Top(node.left, target1, target2);
    const right = findLCABottom2Top(node.right, target1, target2);

    if (left && right) {
        // 根节点在这呢，不用手动返回，只需要递归的去看里面有没有就行
        return node;
    }
    // 谁存在就返回谁，
    return left || right;
}
```

3. 公共路径法

思路：记录找到 p 的路径和找到 q 的路径，然后求最长公共节点。

```js
function findLCACCommonPath(node, target1, target2) {
    if (!node) {
        return null;
    }

    const stack1 = [];
    const stack2 = [];
    const path1 = findPath(node, target1, stack1);
    const path2 = findPath(node, target2, stack2);

    const minLen = path1 < path2 ? path1 : path2;

    const location = 0;

    for(let i =0; i< minLen -1; i++) {
        if(stack1[i] !== stack2[i]){
            location = i;
            break;
        }
    }

    return stack1.slice(location);
}

// 也是一题目
function findPath(node, target, stack) {
    if (!node) {
        return false;
    }

    stack.push(node);

    if (node.val === target.val) {
        return true;
    }

    let found = false; 

    found = node.left && findPath(node.left, target, stack);
    found = node.right && findPath(node.right, target, stack);
    
    if (!found) {
        stack.pop();
    }
    // 退出当前节点，也是 false 一种退出条件
    return found;
}
```

## 10. 求任意两结点距离

note: 二叉树的问题都要“从根到叶子”竖着看

思路：1.出两个节点的最近祖先，2.再分别求到祖先的距离，3.相加即可

```js
function getDistance(node, p, q) {
    const ancestor = findLCABottom2Top(node, p, q);

    const distP = getDistanceToRoot (ancestor, p);
    const distQ = getDistanceToRoot (ancestor, q);

    return distP + distQ;
}

// 也就是 getPath，解对了，但是 left 和 right 其实可以用一个变量
function getDistanceToRoot (node, p) {
    if (!node) {
        return -1;
    }

    if (node === p) {
        return 0;
    }
    
    // const left = getDistanceToRoot (node.left, p);
    // const right = left === -1 && getDistanceToRoot (node.right, p);

    // distance = left !== -1 ? left + 1 : right !== -1 ? right + 1 : -1;

    // return distance;

    let distance = getDistanceToRoot (node.left, p);
    distance = distance === -1 && getDistanceToRoot (node.right, p);

    if (distance !== -1) {
        return distance + 1;
    }

    return -1;
}
```

自己写的，**还没验证，碰到题目验证一下**

```js
function getDistance (node, p, q, root) {
    if (!node) {
        return -1;
    }

    if (node === p || node === q) {
        return 0;
    }

    const left = findDistanceToLowestAncestor(node.left, p, q);
    const right = findDistanceToLowestAncestor(node.right, p, q);

    if (left !== -1 && right !== -1) {
        return left + right;
    }

    // 到根节点时，还有一个没找到或都没找到，就返回 0
    if (node === root && !(left !== -1 && right !== -1)) {
        return 0;
    } else {
        return left
            ? left + 1
            : right
                ? right + 1
                : -1;
    }
}
```

## 11. 找出二叉树中某个结点的所有祖先结点

思路：如果遍历到叶子都没有发现，就说明这一分支没有，然后逐层退递归栈，回退的时候检测如果左子树没有，就去右子树找。如果左子树找到了，就逐层把当前节点的值放到 result 里。

已测试
```js
function getAllAncestor (node, p, result) {
    if (!node) {
        return false;
    }

    if (node === p) {
        // 里面有 0 ，不能 return 0，或者下一个 if 要判断 ！== 0
        return true;
    }
    
    let foundNode = getAllAncestor(node.left, p) || getAllAncestor(node.right, p);

    if (foundNode) {
        result.push(node.val);
        return true;
    }

    return false;
}
```

## 12. 根据前序中序构建二叉树

方式 | 序列
-- | --
前序 | [1 2 4 7 3 5 8 9 6]
中序 | [4 7 2 1 8 5 9 3 6]
后序 | [7 4 2 8 9 5 6 3 1]

思路：前序的一个是根，然后把中序分成左右两个子树，然后对子树递归创建

已测试
```js
function buildTree2(preorder, inorder) {
    if (!preorder || preorder.length === 0 || !inorder || inorder.length === 0) {
        return null;
    }

    // 这种记得 shift 掉头
    // if (preorder.length === 1 || inorder.length === 1) {
    //     // return new TreeNode(preorder[0]);
    //     return new TreeNode(preorder.shift());
    // }

    const index = inorder.indexOf(preorder[0]);
    let root = new TreeNode(preorder.shift());
    root.left = buildTree2(preorder, inorder.slice(0, index));
    root.right = buildTree2(preorder, inorder.slice(index + 1));

    return root;
};
```
## 13. 根据 前序中序 => 后序

思路：1. 在构建过程中直接输出后序
    2. 先构建，再遍历输出

在构建过程中直接输出后序：

思路： 这样递归的方式就是先构建左子，再右子，再回退递归栈到上一层，也就是根，所以按照这个顺序正好就是

```js
// 因为这样递归的方式就是先构建左子，再右子，再回退递归栈到上一层，也就是根，所以按照这个顺序正好就是
function getPostByPreAndIn(preorder, inorder) {
    let result = [];

    const root = _getPostByPreAndIn(preorder, inorder);
    console.log(root)

    function _getPostByPreAndIn(preorder, inorder) {
        if (!preorder || !inorder || inorder.length === 0  || preorder.length  === 0 ) {
            return null;
        }
    
        const index = inorder.indexOf(preorder[0]);
        const root = new TreeNode(preorder.shift());
    
        root.left = _getPostByPreAndIn(preorder, inorder.slice(0, index));
        root.right = _getPostByPreAndIn(preorder, inorder.slice(index+1));

        result.push(root.val)
    
        return root;
    }

    return result;
}
```

## 14. 根据中后序构建二叉树，并输出前序

思路：同上

```js
function buildTree(inorder, postorder) {
    const result = [];
    _buildTree(inorder, postorder);

    function _buildTree(inorder, postorder) {
        if (!inorder.length || !postorder.length) {
            return null;
        }
    
        const index = inorder.indexOf(postorder[postorder.length-1]);
        const root = new TreeNode(postorder.pop());
    
        // 区别就是先 右 后 左：因为 postorder 是逆序挨个 pop，左右得在 inorder 中先找右边，
        // 先找左边会找不到 postorder[postorder.length-1]
        root.right = _buildTree(inorder.slice(index+1), postorder);
        root.left = _buildTree(inorder.slice(0, index), postorder);
    
        // 同时这里可以输出前序，这里是逆序的，转一下就行
        result.push(root.val);
    
        return root;
    }

    return result.reverse();
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
```