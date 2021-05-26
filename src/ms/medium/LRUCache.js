/**
 * 146. LRU缓存机制
 * 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
    实现 LRUCache 类：

    LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
    int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
    void put(int key, int value) 如果关键字已经存在，则变更其数据值；
        如果关键字不存在，则插入该组「关键字-值」。
        当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

    进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？

    示例：
    输入
    ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    输出
    [null, null, null, 1, null, -1, null, -1, 3, 4]

    解释
    LRUCache lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // 缓存是 {1=1}
    lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
    lRUCache.get(1);    // 返回 1
    lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
    lRUCache.get(2);    // 返回 -1 (未找到)
    lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
    lRUCache.get(1);    // 返回 -1 (未找到)
    lRUCache.get(3);    // 返回 3
    lRUCache.get(4);    // 返回 4

    提示：
    1 <= capacity <= 3000
    0 <= key <= 3000
    0 <= value <= 104
    最多调用 3 * 104 次 get 和 put
    链接：https://leetcode-cn.com/problems/lru-cache
*/
// 题解：https://leetcode-cn.com/problems/lru-cache/solution/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan/
// TODO: 三刷!!!! 步骤分割清楚，&& 代码抽象分割
/**
 * =============================
 * 二刷
*/
function ListNode(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.pre = null;
}

/**
 * @param {number} capacity
 */
export var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.count = 0;

    this.dummyHead = new ListNode();
    // 不加尾巴，要很多判断，判断当前节点是不是最后一个，如果是怎么，如果不是怎么，，，
    this.dummyTail = new ListNode(-999, -999);
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.pre = this.dummyHead;
    
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        let node = this.map.get(key);

        this.moveToHead(node);

        return node.val;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        let node = this.map.get(key);
        node.val = value;
    
        this.moveToHead(node);
        return;
    }

    let temp = new ListNode(key, value);
    this.moveToHead(temp);
    this.map.set(key, temp);
    this.count++;

    if (this.count > this.capacity) {
        this.removeTail();
    }
};

LRUCache.prototype.moveToHead = function (node) {
    if (node.pre) {
        let pre = node.pre;
        pre.next = node.next;
        // 这里忘记加 pre 指针了！！！导致 put 3 的时候一直不对
        node.next.pre = pre;
    }

    node.next = this.dummyHead.next;
    this.dummyHead.next.pre = node;
    node.pre = this.dummyHead;
    this.dummyHead.next = node;
}
LRUCache.prototype.removeTail = function () {
    let realTail = this.dummyTail.pre;

    realTail.pre.next = this.dummyTail;
    this.dummyTail.pre = realTail.pre;

    this.map.delete(realTail.key);
    this.count--;
}















/**
 * =============================
 * 一刷
*/
function ListNode1(key, val) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
}

/**
 * @param {number} capacity
 */
export var LRUCache1 = function(capacity) {
    this.count = 0;
    this.capacity = capacity;
    this.hashMap = {};

    // 为了让头部和尾部节点的操作和其他节点一致
    this.virtualHead = new ListNode();
    this.virtualTail = new ListNode();
    this.virtualHead.next = this.virtualTail;
    this.virtualTail.prev = this.virtualHead;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get1 = function(key) {
    const node = this.hashMap[key];
    if (!node) {
        return -1;
    } else {
        this.moveToHead(node);
        return node.val;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put1 = function(key, value) {
    let node = this.hashMap[key];
    if (!node) {
        // 新数据
        node = new ListNode(key, value);
        this.hashMap[key] = node;
        this.addToHead(node);
        if (this.count > this.capacity) {
            this.removeTail();
        }
    } else {
        // 老数据
        node.val = value;
        // 记得这里也要更新位置，挪到头部去
        this.moveToHead(node);
    }
};

LRUCache.prototype.moveToHead1 = function (node) {
    this.removeFromList(node);
    this.addToHead(node);
}

LRUCache.prototype.removeFromList1 = function (node) {
    const pre = node.prev;
    const next = node.next;
    pre.next = next;
    next.prev = pre;

    this.count--;
}

LRUCache.prototype.addToHead1 = function (node) {
    const head = this.virtualHead.next;

    this.virtualHead.next = node;
    node.prev = this.virtualHead;

    node.next = head;
    head.prev = node;

    this.count++;
}

LRUCache.prototype.removeTail1 = function () {
    const tail = this.virtualTail.prev;
    const pre = tail.prev;

    pre.next = this.virtualTail;
    this.virtualTail.prev = pre;

    delete this.hashMap[tail.key];
    this.count--;
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */