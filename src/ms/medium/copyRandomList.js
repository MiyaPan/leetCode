/**
 * 138. 复制带随机指针的链表
 * https://leetcode-cn.com/problems/copy-list-with-random-pointer/
*/
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
/**
 * =============================
 * 二刷
*/
var copyRandomList = function(head) {
    let node = head;
    let cloned = new Map();
    let copyNode = new Node();
    let dummy = copyNode;
    // copy 一遍
    while (node) {
        let temp = new Node(node.val);
        cloned.set(node, temp);
        copyNode.next = temp;
        copyNode = copyNode.next;
        node = node.next;
    }
    node = head;
    copyNode = cloned.get(node);
    while (node) {
        copyNode = cloned.get(node);
        copyNode.random = cloned.get(node.random);
        copyNode = copyNode.next;
        node = node.next;
    }
    return dummy.next;
}








/**
 * =============================
 * 一刷
*/
// 难点在 random 指针的处理这
var copyRandomList = function(head) {
    if (!head) return null;
    
    let map = new Map();
    // 生成基本链表
    let newList = new Node(head.val);
    let oldP = head;
    let newP = newList;
    while(oldP) {
        newP.next = oldP.next ? new Node(oldP.next.val) : null;
        map.set(oldP, newP);
        newP = newP.next;
        oldP = oldP.next;
    }

    // 添加 random 指针
    oldP = head;
    newP = newList;
    while(oldP) {
        newP.random = oldP.random ? map.get(oldP.random) : null;
        newP = newP.next;
        oldP = oldP.next;
    }

    return newList;
};

function generate(head) {
    if (head) {
        let node = new Node(head.val);
        let next = generate(head.next);
        node.next = next;
        // 下面这句不对，这就指向老链表了
        // node.random = head.random;
        // 可以用 map 保存新旧链表上两个相同节点的映射关系，这样不就对了吗
        // 就不用递归了，迭代更省性能
        return node;
    }
    return null;
}
