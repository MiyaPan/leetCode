/**
 * 706. 设计哈希映射
 * 具体地说，你的设计应该包含以下的功能
    put(key, value)：向哈希映射中插入(键,值)的数值对。如果键对应的值已经存在，更新这个值。
    get(key)：返回给定的键所对应的值，如果映射中不包含这个键，返回-1。
    remove(key)：如果映射中存在这个键，删除这个数值对

    解释：就是存储解构不要用对象，只用数组去实现

    链接：https://leetcode-cn.com/problems/design-hashmap
*/
/**
 * =============================
 * 二刷
*/
var ListNode = function(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
};

var MyHashMap = function() {
    this.factor = 2021;
    this.hash = Array(this.factor).fill(null).map(_ => new ListNode());
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    let hashKey = key % this.factor;
    let node = this.hash[hashKey];
    // 这里为了保留前一个 node，从 node.next 开始的，、
    // 那么，if 判断的时候也要从 node.next 判断，不然会少了最后一个元素判断不到
    // next 是没问题的，是因为开头的守卫节点，就该从 next 开始
    while (node.next) {
        // if (node.key === key) {
        if (node.next.key === key) {
            node.next.val = value;
            return;
        }
        node = node.next;
    }
    node.next = new ListNode(key, value);
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    let hashKey = key % this.factor;
    let node = this.hash[hashKey];
    while (node) {
        if (node.key === key) return node.val;
        node = node.next;
    }
    return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    let hashKey = key % this.factor;
    let node = this.hash[hashKey];
    let pre = node;
    while (node) {
        if (node.key === key) {
            pre.next = node.next;
            return
        }
        pre = node;
        node = node.next;
    }
};

/**
 * =============================
 * 一刷
*/
/**
 * Initialize your data structure here.
 */
var ListNode = function(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
};

var MyHashMap = function() {
    const N = 2021;
    this.hash = Array(N).fill(null).map(_ => new ListNode());
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    const N = 2021;
    let head = this.hash[key % N];
    while(head && head.next) {
        if (head.next.key === key) {
            head.next.val = value;
            return;
        }
        head = head.next;
    }
    const node = new ListNode(key, value);
    head.next = node;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    const N = 2021;
    let head = this.hash[key % N];
    while(head && head.next) {
        if (head.next.key === key) {
            return head.next.val;
        }
        head = head.next;
    }
    return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    const N = 2021;
    let head = this.hash[key % N];
    while(head && head.next) {
        if (head.next.key === key) {
            head.next = head.next.next;
            return;
        }
        head = head.next;
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */