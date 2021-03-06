/**
 * 692. 前K个高频单词
 * 给一非空的单词列表，返回前 k 个出现次数最多的单词。
    返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

    示例 1：
    输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
    输出: ["i", "love"]
    解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
        注意，按字母顺序 "i" 在 "love" 之前。

    示例 2：
    输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
    输出: ["the", "is", "sunny", "day"]
    解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
        出现次数依次为 4, 3, 2 和 1 次。

    注意：
    假定 k 总为有效值， 1 ≤ k ≤ 集合元素数。
    输入的单词均由小写字母组成。
    扩展练习：
    尝试以 O(n log k) 时间复杂度和 O(n) 空间

    链接：https://leetcode-cn.com/problems/top-k-frequent-words
*/
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
// TODO: 三刷下，细节老是忘
/**
 * =============================
 * 二刷
*/
var topKFrequent = function(words, k) {
    let map = new Map();
    for (let word of words) {
        if (map.get(word)) {
            map.set(word, map.get(word)+1);
        } else {
            map.set(word, 1);
        }
    }

    let heap = [];
    let count = 0;
    map.forEach((val, key) => {
        if (count < k) {
            heap.push(key);
            shiftUp(heap, map);
            count++;
        } else {
            if (val > map.get(heap[0]) || val === map.get(heap[0]) && key < heap[0]) {
                heap[0] = key;
                shiftDown(heap, map);
            }
        }
    });

    // FIX ME: 出错的 case 是因为 shiftdown 和 shiftup 的时候没有用 compare 比较，只比了大小不对哦
    heap.sort((a, b) => compare(a, b, map));
    return heap;
};
function compare(a, b, map) {
    if (map.get(a) === map.get(b)) {
        return a === b
                ? 0
                : a < b
                    ? -1
                    : 1;
    }
    return map.get(b) - map.get(a);
}
function shiftUp(heap, map) {
    let i = heap.length-1;
    while (i > 0) {
        let parentIdx = parseInt((i-1)/2);
        // if (map.get(heap[parentIdx]) <= map.get(heap[i])) break;
        if (compare(heap[parentIdx], heap[i], map) >= 0) break;
        swap(heap, i, parentIdx);
        i = parentIdx;
    }
}
function shiftDown(heap, map) {
    let n = heap.length;
    let i = 0;
    while (i < n) {
        let max = i;
        let leftIdx = 2*i+1;
        // if (map.get(heap[leftIdx]) <= map.get(heap[max])) {
        if (compare(heap[leftIdx], heap[max], map) >= 0) {
            max = leftIdx;
        }
        let rightIdx = 2*i+2;
        // if (map.get(heap[rightIdx]) <= map.get(heap[max])) {
        if (compare(heap[rightIdx], heap[max], map) >= 0) {
            max = rightIdx;
        }
        if (i === max) break;
        swap(heap, i, max);
        i = max;
    }
}
function swap(heap, i, j) {
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
}














/**
 * =============================
 * 一刷
*/
// map 和 object 混用，你有毛病啊
// 优先用 object，实在有需求在用 map，以后优先用 object，这次应为 map 处理了好多错误
/**
 * 总结：
 * mdzz！问题都不是堆，是排序和细节啊啊啊 !!
    1. shiftDown 没判断出口
    2. shiftUp 用parseInt 处理父节点index
    3. 咋老不更新控制变量呢
    4. 辅助函数的参数写完都tm给我好好检查一遍！！！
    5. 优先用 object吧，你 map 用的跟屎一样，没特殊需要不要用 map 了！
 */
export var topKFrequent = function(words, k) {
    let map = new Map();
    for (let word of words) {
        if (!map.has(word)) {
            map.set(word, 1);
        } else {
            map.set(word, map.get(word)+1);
        }
    }

    let heap = [];
    let count = 0;
    map.forEach((value, key) => {
        if (count < k) {
            heap.push(key);
            shiftUp(map, heap, count);
            // 咋老忘更新循环控制量
            count++;
        } else {
            // ["i", "love", "leetcode", "i", "love", "coding"]，3
            // 频率相等的时候还得比较下谁字典靠前，谁进去，，，，，
            if (value > map.get(heap[0]) || value === map.get(heap[0]) && key < heap[0]) {
                heap[0] = key;
                shiftDown(map, heap, 0);
            }
        }
    });

    // 最后还得按照顺序输出，还要处理下，本身处理 heap 的复杂度就是 o(Nlogk)，再排序不影响
    // ...按从高到低。。。还得先按频率排。。。
    // 你这 compare 还要额外的 map 参数啊。。。
    // heap.sort(compare);
    heap.sort((a, b) => compare(map, a, b));

    return heap;
};
// 小根堆
function shiftUp(map, heap, i) {
    let parentIdx = parseInt((i-1)/2);
    // ！！！这些比较的地方都错了，都要比较下同频的时候的 字典顺序！！！
    // while (heap[parentIdx] && map.get(heap[i]) < map.get(heap[parentIdx])) {
    // 最后 parentIdx 会一直是 -0 ，死循环了， 
    // while (heap[parentIdx] && compare(map, heap[i], heap[parentIdx]) >= 0) {
    while (parentIdx >= 0 && compare(map, heap[i], heap[parentIdx]) >= 0) {
        swap(heap, i, parentIdx)
        i = parentIdx;
        // 死循环是这里啊啊啊啊啊，要用 floor 啊，用 parseInt 就 是 0 了！！！
        // parentIdx = parseInt((i-1)/2);
        parentIdx = Math.floor((i-1)/2);
    }
}

function shiftDown(map, heap, i) {
    while (heap[2*i+1] || heap[2*i+2]) {
        let min = i;
        // if (heap[2*i+1] && map.get(heap[2*i+1]) < map.get(heap[i])) {
        if (heap[2*i+1] && compare(map, heap[2*i+1], heap[i]) >= 0) {
            min = 2*i+1;
        }
        // 堆是用完全二叉树存储，不存在 空左 的情况，经过上面的 if 最小
        if (heap[2*i+2] && compare(map, heap[2*i+2], heap[i]) >= 0 && compare(map, heap[2*i+2], heap[2*i+1]) >= 0) {
            min = 2*i+2;
        }
        // 这里忘了判断出口了！！！ i 可能已经最小了，min 就是 i 啊！
        if (i === min) {
            break;
        } else {
            swap(heap, i ,min);
            i = min;
        }
    }
}

function compare(map, a, b) {
    if (map.get(a) === map.get(b)) {
        // 这里是字典靠前的权值大！
        return a === b ? 0 : a < b ? -1 : 1;
    }
    // return map[a] < map[b] ? -1 : 1;
    return map.get(a) < map.get(b) ? 1 : -1;
}

function swap(heap, i, j) {
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
}
