/**
 * 143. 重排链表
 * https://leetcode-cn.com/problems/reorder-list/
*/
// 解法1：用空间，数组栈存储
export var reorderList = function(head) {
    if (!head) return null;

    let stack = [];
    while(head) {
        stack.push(head);
        head = head.next;
    }

    // 出现 shift ，头怎么着，尾怎么着的，一定优先指针，反正是数组
    // let l = stack.shift();
    // let p = l;
    // let i = 1;
    // while(stack.length > 0) {
    //     let node;
    //     // 而且！！！拿头和拿尾可以在一次循环里啊！！！干嘛非 2 次
    //     if (i % 2 === 0) {
    //         node = stack.shift();
    //     } else {
    //         node = stack.pop();
    //     }
    //     p.next = node;
    //     p = p.next;

    //     i++;
    // }

    // let p = stack[0];
    // let i = 1;
    // let j = stack.length - 1;
    // while(i <= j) {
    //     p.next = stack[j--];;
    //     p = p.next;

    //     if (i > j) {
    //         break;
    //     }

    //     p.next = stack[i++];
    //     p = p.next;
    // }

    // if (stack.length %2 === 0) {
    //     stack[i].next = null;
    // } else {
    //     stack[j].next = null;
    // }

    let i = 0;
    let j = stack.length - 1;
    while(i < j) {
        // 而且！！！拿头和拿尾可以在一次循环里啊！！！干嘛非 2 次
        stack[i].next = stack[j];
        i++;

        if (i === j) break;

        stack[j].next = stack[i];
        j--;
    }
    // 这一步很重要！！解决指针循环！！！
    stack[i].next = null;
};

// 解法2：原地翻转。其实逆置链表复杂度很低的，只是能用的 case 不多
export var reorderList = function(head) {
    if (!head) return null;

    let slow = head;
    let quick = head;
    // 1 2 3 4 5
    // while(quick && quick.next) 这样得到的 slow 是奇数的中间，偶数的后半段第一个，即：把奇数中间的归到后半段
    // while(quick.next && quick.next.next) 行，这样得到的 slow 偶数的前半段最后一个，即：把奇数中间的归到前半段
    // while(quick) 不行，这样得到的 slow 奇数的后半段第一个
    while(quick.next && quick.next.next) {
        slow = slow.next;
        quick = quick.next.next;
    }

    let pre = null;
    let cur = slow.next;
    slow.next = null;
    // 逆置后半段
    while(cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    // 这是合并诶，不用遍历完长的那个啊！
    while(head && pre) {
        let temp = head.next;
        head.next = pre;
        head = temp;
        
        temp = pre && pre.next;
        pre.next = head;
        pre = temp;
    }
}
