/**
 * 133. 克隆图
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
    图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。

    class Node {
        public int val;
        public List<Node> neighbors;
    }

    测试用例格式：
    简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val = 2），以此类推。该图在测试用例中使用邻接列表表示。
    邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。
    给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。

    示例 1：

    输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
    输出：[[2,4],[1,3],[2,4],[1,3]]
    解释：
    图中有 4 个节点。
    节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
    节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
    节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
    节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
    
    示例 2：

    输入：adjList = [[]]
    输出：[[]]
    解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
    
    示例 3：

    输入：adjList = []
    输出：[]
    解释：这个图是空的，它不含任何节点。
    
    示例 4：

    输入：adjList = [[2],[1]]
    输出：[[2],[1]]

    提示：
    节点数不超过 100 。
    每个节点值 Node.val 都是唯一的，1 <= Node.val <= 100。
    无向图是一个简单图，这意味着图中没有重复的边，也没有自环。
    由于图是无向的，如果节点 p 是节点 q 的邻居，那么节点 q 也必须是节点 p 的邻居。
    图是连通图，你可以从给定节点访问到所有节点。

    链接：https://leetcode-cn.com/problems/clone-graph
*/
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
// 逻辑要撕吧清楚，你的流程是什么，先处理什么，再处理什么：先 new 节点，下个循环处理 neighbor，
// 所以只要放到栈里了，就一定不会遗漏 neighbor 了啊，自己的逻辑保证了啊，怎么还转不过来，流程一定要理清楚，实在不行就画个流程图吧！
var cloneGraph = function(node) {
    if (!node) return node;

    let root = new Node(node.val);
    // 存储克隆过的节点
    let cloned = new Map();
    // 不能存 boolean，存映射关系
    cloned.set(node, root);
    // 存储访问过的节点
    // let visited = new Map();
    // visited.set(node, true);

    // 广度遍历栈
    let stack = [node];
    let p = 0;
    while (p < stack.length) {
        let cur = stack[p];
        // 在栈里的 一定 已经 copy 过了，下面和上面的逻辑能保证
        // let curCopy;
        // if (cloned.has(cur)) {
        //     curCopy = cloned.get(cur);
        // } else {
        //     curCopy = new Node(cur.val);
        //     cloned.set(cur, curCopy);
        // }
        let curCopy = cloned.get(cur);
        for (let neighbor of cur.neighbors) {
            let neighborCopy;
            if (cloned.has(neighbor)) {
                neighborCopy = cloned.get(neighbor);
            } else {
                stack.push(neighbor);
                neighborCopy = new Node(neighbor.val);
                cloned.set(neighbor, neighborCopy);
            }
            // 当前节点联系 neighbor
            curCopy.neighbors.push(neighborCopy);

            // 不需要 visited，cloned 就够了：如果节点没被 clone 过，就 clone 它然后放到 satck 里下次处理它的 neighbor，这样就**能**保证不遗漏 neighbor 了
            // // 访问完入栈，要判断下是否操作过了，因为是无向图，所以会反复放 neighbor
            // if (!visited.has(neighbor)) {
            //     stack.push(neighbor);
            // }
        }

        // visited.set(cur, true);
        p++;
    }

    return root;
};
