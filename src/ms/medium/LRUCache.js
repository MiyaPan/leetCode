/**
 * 146. LRU缓存机制
 * https://leetcode-cn.com/problems/lru-cache/
*/

// 题解：https://leetcode-cn.com/problems/lru-cache/solution/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan/


function ListNode(key, val) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
}

/**
 * @param {number} capacity
 */
export var LRUCache = function(capacity) {
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
LRUCache.prototype.get = function(key) {
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
LRUCache.prototype.put = function(key, value) {
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

LRUCache.prototype.moveToHead = function (node) {
    this.removeFromList(node);
    this.addToHead(node);
}

LRUCache.prototype.removeFromList = function (node) {
    const pre = node.prev;
    const next = node.next;
    pre.next = next;
    next.prev = pre;

    this.count--;
}

LRUCache.prototype.addToHead = function (node) {
    const head = this.virtualHead.next;

    this.virtualHead.next = node;
    node.prev = this.virtualHead;

    node.next = head;
    head.prev = node;

    this.count++;
}

LRUCache.prototype.removeTail = function () {
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