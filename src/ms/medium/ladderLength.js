/**
 * 127. 单词接龙
 * 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

    每次转换只能改变一个字母。转换过程中的中间单词必须是字典中的单词。

    说明:
    如果不存在这样的转换序列，返回 0。
    所有单词具有相同的长度。所有单词只由小写字母组成。字典中不存在重复的单词。
    你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

    示例 1:
    输入:
    beginWord = "hit",
    endWord = "cog",
    wordList = ["hot","dot","dog","lot","log","cog"]
    输出: 5
    解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
        返回它的长度 5。
    
    示例 2:
    输入:
    beginWord = "hit"
    endWord = "cog"
    wordList = ["hot","dot","dog","lot","log"]
    输出: 0
    解释: endWord "cog" 不在字典中，所以无法进行转换。

    提示：
        1 <= beginWord.length <= 10
        endWord.length == beginWord.length
        1 <= wordList.length <= 5000
        wordList[i].length == beginWord.length
        beginWord、endWord 和 wordList[i] 由小写英文字母组成
        beginWord != endWord
        wordList 中的所有字符串 互不相同

    链接：https://leetcode-cn.com/problems/word-ladder
*/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
// TODO: 三刷!，分清这是 bfs 还是 dfs
// set has 比数组性能好不要太多：https://zhuanlan.zhihu.com/p/62178971
/**
 * =============================
 * 二刷
*/
export var ladderLength = function(beginWord, endWord, wordList) {
    // ["cog", "dog", "dot", "hot", "log", "lot"]
    // 用 set 都不用 sort 再二分，因为 set 是键值对，检索复杂度 o(1)
    // wordList.sort((a, b) => a < b ? -1 : 1);
    let stack = [beginWord];
    let arrSet = new Set(wordList);
    let visited = new Set();
    let p = 0;
    let nodesInNextlevel = [];
    let level = 0;
    while (p < stack.length) {
        nodesInNextlevel = [];
        while (p < stack.length) {
            let cur = stack[p++];
            for (let i = 0; i < cur.length; i++) {
                // A：65；a：97！！！！！
                for (let j = 0; j < 26; j++) {
                    // 傻啊，replace 第一个参数是正则或者 string，那是啥！
                    // let temp = cur.replace(i, String.fromCharCode(97+j));
                    // 不能用 replace，如果 word 中有重复的字符，会 replace 第一个啊啊啊啊啊啊！！
                    // let temp = cur.replace(cur.charAt(i), String.fromCharCode(97+j));
                    let temp = cur.substring(0,i) + String.fromCharCode(97+j) + cur.substring(i+1);

                    if (arrSet.has(temp)) {
                        // if (temp === endWord) return level+1;
                        // 第一个 +1 是因为提前判断了，而没有放到下一层再判断，level 还没加；第二个是 答案长度包含 startWord
                        if (temp === endWord) return level+1+1;
    
                        if (!visited.has(temp)) {
                            visited.add(temp);
                            nodesInNextlevel.push(temp);
                        }
                    }
                }
            }
        }
        level++;
        stack = stack.concat(nodesInNextlevel);
    }
    return 0;
}

function find(wordList, target) {
    let l = 0;
    let r = wordList.length;
    while (l <= r) {
        let m = l + parseInt((r-l)/2);
        if (wordList[m] === target) {
            return true;
        }
        else if (wordList[m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return false;
}







/**
 * =============================
 * 一刷
*/
// 大佬啊，思路就是清晰 https://leetcode-cn.com/problems/word-ladder/solution/shou-hua-tu-jie-127-dan-ci-jie-long-bfsde-dian-x-2/
// 虽然思路自己也想到了，但是存储结构没想到，用队列啊！！！不要递归啊
export var ladderLength1 = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;
    let wordSet = new Set(wordList);

    let stack = [beginWord];
    let p = 0;
    let level = 1;
    // "a"
    // "c"
    // ["a","b","c"]
    while(p < stack.length) {
        let nodesInCurrentLevel = [];
        while(p < stack.length) {
            let node = stack[p];
            if (node === endWord) return level;

            // for(let i = 0; i < node.length; i++) {
            //     let reg = new RegExp(node.substring(0, i) + '.?' + node.substring(i+1));
            //     // for of 和 splice 修改原数组造成错误，被删掉的下一个的index变为已访问过的
            //     for (let i = 0; i < wordList.length; i++) {
            //         word = wordList[i];
            //         if (word !== node && reg.test(word)) {
            //             nodesInCurrentLevel.push(word);
            //             // 删掉，防止重复入列
            //             wordList.splice(wordList.indexOf(word), 1);
            //             // 这里又回退一步，因为删掉了一个，这样就非常不好，应该换一种方式检查
            //             i--;
            //         }
            //     }
            // }
            // 将 wordList 转换为 set 会明显提高速度！
            // wordList 耗时 8864ms VS set 耗时 252ms！！！
            for(let i = 0; i < node.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    let newWord = node.substring(0, i) + String.fromCharCode(c) + node.substring(i+1);
                    if (wordSet.has(newWord)) {
                        nodesInCurrentLevel.push(newWord);
                        // 删掉，防止重复入列
                        wordSet.delete(newWord);
                        // 这里又回退一步，因为删掉了一个，这样就非常不好，应该换一种方式检查
                    }
                }
            }

            p++;
        }
        stack = stack.concat(nodesInCurrentLevel);
        level++;
    }

    return 0;
};


// 解法二，双向BFS！！！！层与层相碰撞，看看是不是包含了，看https://leetcode-cn.com/problems/word-ladder/solution/yan-du-you-xian-bian-li-shuang-xiang-yan-du-you-2/
// 解法三，构建图！！！看答案
