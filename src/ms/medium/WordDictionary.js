/**
 * 211. 添加与搜索单词 - 数据结构设计
 * 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

    实现词典类 WordDictionary ：

    WordDictionary() 初始化词典对象
    void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
    bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。

    示例：

    输入：
    ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
    [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
    输出：
    [null,null,null,null,false,true,true,true]

    解释：
    WordDictionary wordDictionary = new WordDictionary();
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    wordDictionary.search("pad"); // return False
    wordDictionary.search("bad"); // return True
    wordDictionary.search(".ad"); // return True
    wordDictionary.search("b.."); // return True
     

    提示：
    1 <= word.length <= 500
    addWord 中的 word 由小写英文字母组成
    search 中的 word 由 '.' 或小写英文字母组成
    最多调用 50000 次 addWord 和 search

    链接：https://leetcode-cn.com/problems/design-add-and-search-words-data-structure
*/
/**
 * Initialize your data structure here.
 */
// TODO: 三刷!!
/**
 * =============================
 * 二刷
*/
export var WordDictionary = function() {
    this.nodes = [];
    this.isEnd = false;
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let cur = this;
    // 是 n + 1 那层才是 node 本身，比如：
    // ["WordDictionary","addWord","search"]，[[],["a"],["."]]
    for (let char of word) {
        let idx = char.charCodeAt() - 97;
        if (!cur.nodes[idx]) {
            cur.nodes[idx] = new WordDictionary();
        }
        cur = cur.nodes[idx];
    }
    cur.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    let cur = this;
    return find(cur, word, 0);
};
function find(cur, word, start) {
    if (start === word.length) return cur.isEnd;
    // for (let i = start; i < word.length; i++) {
        let char = word[start];
        if (char === '.') {
            // 如果 . 后面都没找到，这里会导致走到最后的 return cur.isEend,但这个 cur 是不对的，是当前层的
            for (let i = 0; i < 26; i++) {
                if (cur.nodes[i] && find(cur.nodes[i], word, start+1)) return true;
            }
            // 所以要加这个
            return false;
        } else {
            let idx = char.charCodeAt() - 97;
            if (!cur.nodes[idx]) return false;
            return find(cur.nodes[idx], word, start+1);
        }
    // }
    return cur.isEnd;
}















/**
 * =============================
 * 一刷
*/
// 思路：前缀树。你想的 map 按照长度分类的也行，也能 ac 。题目应该用前缀树做，另见 208 题：https://leetcode-cn.com/problems/implement-trie-prefix-tree/
// 可见：https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--43/
export var WordDictionary1 = function() {
    this.next = [];
    this.isEnd = false;
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary1.prototype.addWord = function(word) {
    let node = this;
    for (let char of word) {
        let idx = char.charCodeAt() - 'a'.charCodeAt();
        if (!node.next[idx]) {
            node.next[idx] = new WordDictionary();
        }
        node = node.next[idx];
    }
    node.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary1.prototype.search = function(word) {
    let node = this;
    
    return this.dfs(node, 0, word);
};

WordDictionary1.prototype.dfs = function(node, charIndex, word) {
    let len = word.length;
    // 这个判断条件好好想想，因为下面的 else，只要数组有节点就会向下，所以到达这里的，当超过 word 长度时，看看是不是树到底了
    // 树节点因为是用 next 判断的，所以比 char 慢一层
    // if (charIndex === len-1) return node.isEnd;
    if (charIndex >= len) return node.isEnd;

    let char = word[charIndex];
    if (char === '.') {
        let found = false;
        for (let i = 0; i <= 26 ; i++) {
            if (node.next[i]) {
                found = this.dfs(node.next[i], charIndex+1, word);
                // 只有 found 的时候才返回，false 的时候继续找别的分支
                if (found) return true;
            } 
            // 只有 found 的时候才返回，false 的时候继续找别的分支
            // else {
            //     return false;
            // }
        }
        return false;
    } else {
        let idx = char.charCodeAt() - 'a'.charCodeAt();
        if (node.next[idx]) {
            return this.dfs(node.next[idx], charIndex+1, word);
        } else {
            return false;
        }
    }
}
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
