/**
 * 947. 移除最多的同行或同列石头
 * n 块石头放置在二维平面中的一些整数坐标点上。每个坐标点上最多只能有一块石头。
    如果一块石头的 同行或者同列 上有其他石头存在，那么就可以移除这块石头。
    给你一个长度为 n 的数组 stones ，其中 stones[i] = [xi, yi] 表示第 i 块石头的位置，返回 可以移除的石子 的最大数量。

    示例 1：
    输入：stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    输出：5
    解释：一种移除 5 块石头的方法如下所示：
    1. 移除石头 [2,2] ，因为它和 [2,1] 同行。
    2. 移除石头 [2,1] ，因为它和 [0,1] 同列。
    3. 移除石头 [1,2] ，因为它和 [1,0] 同行。
    4. 移除石头 [1,0] ，因为它和 [0,0] 同列。
    5. 移除石头 [0,1] ，因为它和 [0,0] 同行。
    石头 [0,0] 不能移除，因为它没有与另一块石头同行/列。
    
    示例 2：
    输入：stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
    输出：3
    解释：一种移除 3 块石头的方法如下所示：
    1. 移除石头 [2,2] ，因为它和 [2,0] 同行。
    2. 移除石头 [2,0] ，因为它和 [0,0] 同列。
    3. 移除石头 [0,2] ，因为它和 [0,0] 同行。
    石头 [0,0] 和 [1,1] 不能移除，因为它们没有与另一块石头同行/列。
    
    示例 3：
    输入：stones = [[0,0]]
    输出：0
    解释：[0,0] 是平面上唯一一块石头，所以不可以移除它。

    提示：
    1 <= stones.length <= 1000
    0 <= xi, yi <= 104
    不会有两块石头放在同一个坐标点上

    链接：https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column
*/
// TODO: 三刷！
/**
 * =============================
 * 二刷
*/
export var removeStones = function(stones) {
    let n = stones.length;
    let uf = new UnionFind(n);
    for (let i = 1; i < n; i++) {
        for (let j = i-1; j >= 0; j--) {
            if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
                uf.union(i, j);
            }
        }
    }
    return n - uf.unionCount;
}
class UnionFind {
    constructor(n) {
        this.parents = Array(n).fill(null).map((_, i) => i);
        this.unionCount = n;
    }
    findParent(x) {
        if (x !== this.parents[x]) {
            this.parents[x] = this.findParent(this.parents[x]);
        }
        // return x; // 傻啊，又不是写的 while ，x 没变啊，递归就是为了每一层都改变指向，压缩路径
        return this.parents[x];
    }
    union(x, y) {
        let px = this.findParent(x);
        let py = this.findParent(y);
        if (px !== py) {
            this.parents[py] = px;
            this.unionCount--;
        }
    }
}

/**
 * =============================
 * 一刷
*/
/**
 * @param {number[][]} stones
 * @return {number}
 */
// 1. 并查集：如下【并查集当然好】
// 2. 深度优先搜索：可以看看https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/yi-chu-zui-duo-de-tong-xing-huo-tong-lie-m50r/
export var removeStones = function(stones) {
    let uf = new UnionFind(stones);
    let len = stones.length;
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j < len; j++) {
            // 横坐标或者纵坐标相等时，都进行 合并
            if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
                uf.union(i, j);
            }
        }
    }

    return len - uf.unionComponentCount;
};
// 并查集模板
class UnionFind1 {
    constructor(stones) {
        // 因为并查集维护的是下标，所以用数组就行，不用 map
        // this.parents = new Map();
        this.parents = [];
        this.unionComponentCount = stones.length;
        // 初始化，每个人是自己的父亲
        // 并查集维护的是** 下标！！** 不是里面的元素
        stones.forEach((stone, i) => this.parents[i] = i);
    }

    find(x) {
        // 【压缩路径】。如果只做【压缩路径】，不做【按秩合并】,按秩合并在合并的时候秩不需要减，因为不影响，但是想起来回很乱：见最后一段解释https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/tu-jie-bing-cha-ji-by-yexiso-nbcz/
        if(x !== this.parents[x]) {
            this.parents[x] = this.find(this.parents[x]);
        }
        return this.parents[x];
    }

    union(x, y) {
        let fx = this.find(x);
        let fy = this.find(y);
        if (fx !== fy) {
            this.parents[fy] = fx;
            this.unionComponentCount--;
        }
    }
}
// 原始解题思路
class UnionFind11 {
    constructor(stones) {
        // 因为并查集维护的是下标，所以用数组就行，不用 map
        // this.parents = new Map();
        this.parents = [];
        this.unionComponentCount = stones.length;
        // 初始化，每个人是自己的父亲
        // 并查集维护的是** 下标！！** 不是里面的元素
        stones.forEach((stone, i) => this.parents[i] = i);

        // 【按秩合并】
        this.depths = Array(stones.length).fill(1);
    }

    find(x) {
        // 【压缩路径】。如果只做【压缩路径】，不做【按秩合并】,按秩合并在合并的时候秩不需要减，因为不影响，但是想起来回很乱：见最后一段解释https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/tu-jie-bing-cha-ji-by-yexiso-nbcz/
        if(x !== this.parents[x]) {
            this.parents[x] = this.find(this.parents[x]);
        }
        return this.parents[x];
    }

    union(x, y) {
        let fx = this.find(x);
        let fy = this.find(y);
        if (fx !== fy) {
            // 合并不是合并当前节点啊，是合 各自的根节点 啊啊啊啊！
            // this.parents[x] = y;
            // 【按秩合并】- 让短的集合指向长的集合
            if (this.depths[fx] > this.depths[fy]) {
                this.parents[fy] = fx;
                if (this.depths[fx] === this.depths[fy]) this.depths[fx] += 1;
            } else {
                this.parents[fx] = fy;
                if (this.depths[fx] === this.depths[fy]) this.depths[fy] += 1;
            }

            this.unionComponentCount--;
        }
    }
}
