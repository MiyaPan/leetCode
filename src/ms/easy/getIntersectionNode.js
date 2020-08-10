/**
 * 160. 相交链表
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode/
*/
// 好的思路：怎么消除距离差，对于链表找相同点，就期望从倒数长度相同的开始就好了
var getIntersectionNode = function(headA, headB) {
    let pa = headA;
    let pb = headB;

    while(pa !== pb) {
        pa = pa ? pa.next : headB;
        pb = pb ? pb.next : headA;
    }

    return pa;
};
