/**
 * 210. 课程表 II
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
    在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，
    我们用一个匹配来表示他们: [0,1]
    给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

    可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

    示例 1:
    输入: 2, [[1,0]] 
    输出: [0,1]
    解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
    
    示例 2:
    输入: 4, [[1,0],[2,0],[3,1],[3,2]]
    输出: [0,1,2,3] or [0,2,1,3]
    解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
         因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
    说明:
    输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
    你可以假定输入的先决条件中没有重复的边。
    
    提示:
    这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
    通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
    拓扑排序也可以通过 BFS 完成。

    链接：https://leetcode-cn.com/problems/course-schedule-ii
*/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
// 典型的“拓扑排序”问题。
// 拓扑排序适用场景：对有依赖关系的事务进行排序。【就针对这个来的！】
/**
 * 对一个有向图，输出拓扑排序的算法：
 * "BFS":
 *      1. 找一个入度为 0 的，输出它，并在图中删除它和它指向别人的边(就是将它指向的节点的入度都减 1，减到 0 的时候可以存到 入度为 0 的栈中，方便接下来遍历它)
 *      2. 重复 1
 * 参考：https://www.jianshu.com/p/b59db381561a
 * 
 * "DFS":
 * 通过上述的三种状态，我们就可以给出使用深度优先搜索得到拓扑排序的算法流程，在每一轮的搜索搜索开始时，我们任取一个「未搜索」的节点开始进行深度优先搜索。
    我们将当前搜索的节点 uu 标记为「搜索中」，遍历该节点的每一个相邻节点 vv：
        如果 vv 为「未搜索」，那么我们开始搜索 vv，待搜索完成回溯到 uu；
        如果 vv 为「搜索中」，那么我们就找到了图中的一个环，因此是不存在拓扑排序的；
        如果 vv 为「已完成」，那么说明 vv 已经在栈中了，而 uu 还不在栈中，因此 uu 无论何时入栈都不会影响到 (u, v)(u,v) 之前的拓扑关系，以及不用进行任何操作。
    当 uu 的所有相邻节点都为「已完成」时，我们将 uu 放入栈中，并将其标记为「已完成」

    链接：https://leetcode-cn.com/problems/course-schedule-ii/solution/ke-cheng-biao-ii-by-leetcode-solution/
*/
// 图的表示方法：https://www.cnblogs.com/liushang0419/archive/2011/05/06/2039386.html
var findOrder = function(numCourses, prerequisites) {
    // stack 存储入度为 0 的节点，用来做 BFS
    let stack = [];
    // 维护所有节点的入度
    let inDegree = Array(numCourses).fill(0);
    let ans = [];
    for (let item of prerequisites) {
        // 数组 0 元素是被指向的
        inDegree[item[0]] += 1;
    }
    // 找出入度为 0 的来
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) stack.push(i);
    }
    // BFS 广度优先输出拓扑排序
    let p = 0;
    while (p < stack.length) {
        let node = stack[p];
        // 输出当前节点
        ans.push(node);
        // 这里每次都要遍历所有节点不值当，可以优化，建表，维护 <节点, 后续节点> 的表格，再写个方法，不污染原始思路了，见下面方法
        // 被 node 指向的节点入度减 1
        for (let item of prerequisites) {
            if (item[1] === node) {
                inDegree[item[0]] -= 1;
                if (inDegree[item[0]] <= 0) {
                    stack.push(item[0]);
                }
            }
        }
        p++;
    }

    // 始终有入度不为 0 的，即有环，则无法生成
    if (ans.length < numCourses) return [];

    return ans;
};

// 害，加了 map 也没提高多少，，，，到是细节麻烦了一点，有些判断，比如 if (successors[node]) 的看 successor 有没有，没有开不能 for 循环
var findOrder = function(numCourses, prerequisites) {
    // stack 存储入度为 0 的节点，用来做 BFS
    let stack = [];
    // 维护所有节点的入度
    let inDegree = Array(numCourses).fill(0);
    let ans = [];
    // 维护 <节点，后续节点> 表，方便下面入度减 1 的时候查询，而不用每次完全遍历数组
    let successors = {};
    for (let item of prerequisites) {
        // 数组 0 元素是被指向的
        inDegree[item[0]] += 1;
        if (!successors[item[1]]) successors[item[1]] = [];
        successors[item[1]].push(item[0]);
    }
    // 找出入度为 0 的来
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) stack.push(i);
    }
    // BFS 广度优先输出拓扑排序
    let p = 0;
    while (p < stack.length) {
        let node = stack[p];
        // 输出当前节点
        ans.push(node);
        // 这里每次都要遍历所有节点不值当，可以优化，建表，维护 <节点, 后续节点> 的表格，再写个方法，不污染原始思路了，见下面方法
        // 被 node 指向的节点入度减 1
        if (successors[node]) { // successors[node] 可能没有哦
            for (let item of successors[node]) {
                inDegree[item] -= 1;
                if (inDegree[item] <= 0) {
                    stack.push(item);
                }
            }
        }
        p++;
    }

    // 始终有入度不为 0 的，即有环，则无法生成
    if (ans.length < numCourses) return [];

    return ans;
};
