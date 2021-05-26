/**
 * 380. 常数时间插入、删除和获取随机元素
 * https://leetcode-cn.com/problems/insert-delete-getrandom-o1/
 * 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

    insert(val)：当元素 val 不存在时，向集合中插入该项。
    remove(val)：元素 val 存在时，从集合中移除该项。
    getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
    
    示例 :
    // 初始化一个空的集合。
    RandomizedSet randomSet = new RandomizedSet();

    // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
    randomSet.insert(1);

    // 返回 false ，表示集合中不存在 2 。
    randomSet.remove(2);

    // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
    randomSet.insert(2);

    // getRandom 应随机返回 1 或 2 。
    randomSet.getRandom();

    // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
    randomSet.remove(1);

    // 2 已在集合中，所以返回 false 。
    randomSet.insert(2);

    // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
    randomSet.getRandom();

    链接：https://leetcode-cn.com/problems/insert-delete-getrandom-o1
*/
/**
 * Initialize your data structure here.
 */
// TODO: 三刷!
/**
 * =============================
 * 二刷
*/
var RandomizedSet = function() {
    this.arr = [];
    this.val2Key = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.val2Key[val] === undefined) {
        this.val2Key[val] = this.arr.length;
        this.arr.push(val);
        return true;
    } else {
        return false;
    }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.val2Key[val] === undefined) {
        return false;
    } else {
        // 获取要移除的项，和最后一项交换，再删除最后一项！
        const idx = this.val2Key[val];
        const lastVal = this.arr[this.arr.length-1];
        // 少了这一步
        this.arr[idx] = lastVal;

        this.val2Key[lastVal] = idx;
        // 少了这一步！
        delete this.val2Key[val];
        this.arr.length--;
        return true;
    }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let n = this.arr.length;
    let randIdx = Math.floor(Math.random() * n);
    return this.arr[randIdx];
};




















/**
 * =============================
 * 一刷
*/
var RandomizedSet = function() {
    this.map = {};
    this.arr = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    const idx = this.map[val];
    if (idx || idx === 0) return false;
    this.arr.push(val);
    this.map[val] = this.arr.length - 1;
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    const idx = this.map[val];
    // idx 可能为 0 啊
    if (!idx && idx !== 0) return false;

    const last = this.arr[this.arr.length -1];
    this.arr[idx] = last;
    this.map[last] = idx;

    this.arr.pop();
    delete this.map[val];
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    // const idx = Math.floor(Math.random() * (this.arr.length - 1));
    // Math.random() :从0（包括0）往上，但是不包括1（排除1）!!!
    const idx = Math.floor(Math.random() * this.arr.length);
    return this.arr[idx];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
