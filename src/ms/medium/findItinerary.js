/**
 * 332. 重新安排行程
 * 给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，
 * 对该行程进行重新规划排序。所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，
 * 所以该行程必须从 JFK 开始。

    提示：
    如果存在多种有效的行程，请你按字符自然排序返回最小的行程组合。例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
    所有的机场都用三个大写字母表示（机场代码）。
    假定所有机票至少存在一种合理的行程。
    所有的机票必须都用一次 且 只能用一次。

    示例 1：
    输入：[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
    输出：["JFK", "MUC", "LHR", "SFO", "SJC"]
    
    示例 2：
    输入：[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    输出：["JFK","ATL","JFK","SFO","ATL","SFO"]
    解释：另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"]。但是它自然排序更大更靠后。

    链接：https://leetcode-cn.com/problems/reconstruct-itinerary
*/
/**
 * @param {string[][]} tickets
 * @return {string[]}n    
 */
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export var findItinerary = function(tickets) {
    let n = tickets.length;
    let map = {};
    for (let i = 0; i < n; i++) {
        if (map[tickets[i][0]]) {
            map[tickets[i][0]].push({to: tickets[i][1], index: i});
        } else {
            map[tickets[i][0]] = [{to: tickets[i][1], index: i}];
        }
    }
    Object.keys(map).forEach(from => {
        map[from].sort((a,b) => a.to < b.to ? - 1 : 1);
    });

    let ans = ['JFK'];
    let path = [];
    let visited = [];
    dfs(tickets, map, 'JFK', path, ans, visited, 0);
    return ans;
}
function dfs(tickets, map, from, path, ans, visited, count) {
    if (!map[from]) return false;

    let tos = map[from];
    for (let to of tos) {
        if (!visited[to.index]) {
            path.push(to.to);
            count++;
            visited[to.index] = true;
            if (count === tickets.length) {
                ans.push(...path);
                return true;
            }
            if (dfs(tickets, map, to.to, path, ans, visited, count)) return true;
            visited[to.index] = false;
            // 这里别忘了啊
            count--;
            path.pop();
        }
    }
}




/**
 * =============================
 * 二刷
*/
// 思路：mdzz 强行回溯也能通过的，还超 61%呢！麻烦就麻烦在数据结构的设计上了，好多细节点，值得二刷。
// 👍 自己真的可以强行做出来啊，自己的思路正好和已 java 大佬一样的：https://leetcode-cn.com/problems/reconstruct-itinerary/solution/java-bu-yong-ou-la-zhi-yong-hui-su-si-lu-4v83/
// 但是，其实这个类型叫 欧拉通路，有套路的，另见 753. 破解保险箱：https://leetcode-cn.com/problems/cracking-the-safe/
// 欧拉通路介绍：https://www.cxyxiaowu.com/962.html
// 这种写法是很典型的回溯，掌握它，稳稳的。 -- 摘自别人的答案
// 害，这个回溯和 hierholzer 算法一样的，不过 hierholzer 算法没有设置 visited 标记，而是直接在数组里删除了元素，频繁用到了 shift 和 unshift，只是你没敢用而已
export var findItinerary1 = function(tickets) {
    let len = tickets.length;
    // 要包含起始点
    let ansLen = len + 1;
    let map = {};
    for (let i = 0; i < len; i++) {
        const [from, to] = tickets[i];
        if (map[from]) {
            map[from].push({to, visited: false});
        } else {
            map[from] = [{to, visited: false}];
        }
    }
// 只有实现了Iterator接口的对象才能够使用 for of 来进行遍历取值。
// 所以说 for of 只是语法糖，真正的主角是Iterator。
// 也就是说 Iteratorble 的都可以 for of 哦
    // map.entries()/keys()/values() 这种 iteratorble 的可以用 for..of 但是不可以用 forEach，数组才可以用 forEach，所以可以把 iteratorble 的转成数组再用 forEach
    // map 自身提供 forEach 方法哦！
    // 字符串比较不可以用减法，但是可以用 大小号哦！
    Object.keys(map).forEach(key => {
        map[key].sort((a, b) => {
            // 这样 return 的是 boolean，是不符合 sort 要求的，必须要返回 1，0，-1
            // a.to < b.to
            if (a.to === b.to) return 0;
            return a.to < b.to ? -1 : 1;
        })
    });

    // visited 数组没办法和 map 配合啊，只能放到 map 这个数据结构里，和一个java答案思路一样的
    // let visited = Array(len).fill(0);
    let count = 0;
    let ans = [];
    let path = [];
    // [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]] -> ['JFK', "NRT", 'JFK', "KUL"]
    dfs(map, 'JFK', count, path, ans, ansLen);

    return ans;
};

function dfs1(map, from, count, path, ans, ansLen) {
    path.push(from);
    count++;

    // 正好走完
    if (count === ansLen) {
        // ans.push([...path]);
        // 作用域问题，改了传入参数就在函数内部了：https://www.jianshu.com/p/330ce6f4bfdd
        // 如果不修改 ans，ans 拿到的是外部 ans 的引用，这时候修改里面的属性没问题，
        // 但是，一旦给 函数内部的 ans 赋值，它就丢失了外部 ans 的医用了，它就是函数内的一个变量了
        // ans = [...path];
        // ans.push(...path);
        return true;
    }

    // 没有以 from 出发的，就不能走完，就直接舍弃这条路
    if (!map[from]) {
        // 这里忘了啊
        path.pop();
        return false;
    }

    let toPoints = map[from];
    for (let toPoint of toPoints) {
        if (!toPoint.visited) {
            toPoint.visited = true;
            let res = dfs(map, toPoint.to, count, path, ans, ansLen);
            if (res) return true;
            toPoint.visited = false;
        }
    }

    path.pop();
}

// 欧拉通路判定：
// 对于无向图 G，G 是欧拉图当且仅当 G 是连通的且没有奇度顶点。
// 对于无向图 G，G 是半欧拉图当且仅当 G 是连通的且 G 中恰有 2 个奇度顶点。
// 对于有向图 G，G 是欧拉图当且仅当 G 的所有顶点属于同一个强连通分量且每个顶点的入度和出度相同。
// 对于有向图 G，G 是半欧拉图当且仅当 G 的所有顶点属于同一个强连通分量且
//      恰有一个顶点的出度与入度差为 1；
//      恰有一个顶点的入度与出度差为 1；
//      所有其他顶点的入度和出度相同。
// 判定总结：
//      无向图：图联通且没有奇数度的定点，或只有 2 个奇数度的节点；
//      有向图：强联通且每个顶点的入度和出度相同，或(只有 1 个定点的 出-入度 = 1 && 只有一个 入-出 = 1 && 其他都相同)。
// 性质：
// 若图 G 为连通图，且有 2k 个奇度顶点，则图需要用 k 笔画成，且至少需要k笔才能画成。https://www.cxyxiaowu.com/962.html
// 可参考js：https://leetcode-cn.com/problems/reconstruct-itinerary/solution/shou-hua-tu-jie-liang-chong-jie-fa-zui-ji-ben-de-h/
export var findItinerary2 = function(tickets) {
    // 二刷再说吧
    // 害，这个回溯和 hierholzer 算法一样的，不过 hierholzer 算法没有设置 visited 标记，而是直接在数组里删除了元素，频繁用到了 shift 和 unshift，只是你没敢用而已
};
