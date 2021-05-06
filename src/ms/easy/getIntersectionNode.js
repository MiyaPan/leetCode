/**
 * 160. 相交链表
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode/
*/
/**
 * =============================
 * 二刷
*/
var getIntersectionNode = function(headA, headB) {
    let count1 = 0;
    let count2 = 0;
    let node = headA;
    while (node) {
        count1++;
        node= node.next;
    }
    node = headB;
    while (node) {
        count2++;
        node= node.next;
    }
    let node1 = headA;
    let node2 = headB;
    let diff = 0;
    if (count1 >= count2) {
        diff = count1 - count2;
    } else {
        diff = count2 - count1;
        node1 = headB;
        node2 = headA;
    }

    while (diff > 0) {
        node1 = node1.next;
        diff--;
    }

    while(node1 && node2) {
        if (node1 === node2) {
            return node1;
        } else {
            node1 = node1.next;
            node2 = node2.next;
        }
    }
    return null;
};

/**
 * =============================
 * 一刷
*/
// 好的思路：怎么消除距离差，对于链表找相同点，就期望从倒数长度相同的开始就好了
// a/b 不一样长，但是 a + b 的长度就固定了，又因为相同的段一定在尾端，所以可以按照两个拼接走
// 方法3初看很难理解，但是细想就会发现很简单很巧妙 A和B两个链表长度可能不同，但是A+B和B+A的长度是相同的，所以遍历A+B和遍历B+A一定是同时结束。
//  如果A,B相交的话A和B有一段尾巴是相同的，所以两个遍历的指针一定会同时到达交点 如果A,B不相交的话两个指针就会同时到达A+B（B+A）的尾节点
var getIntersectionNode = function(headA, headB) {
    let pa = headA;
    let pb = headB;

    while(pa !== pb) {
        pa = pa ? pa.next : headB;
        pb = pb ? pb.next : headA;
    }

    return pa;
};
