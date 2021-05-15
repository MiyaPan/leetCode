/**
 * 721. 账户合并
 * 给定一个列表 accounts，每个元素 accounts[i] 是一个字符串列表，其中第一个元素 accounts[i][0] 是 名称 (name)，
 * 其余元素是 emails 表示该账户的邮箱地址。
    现在，我们想合并这些账户。如果两个账户都有一些共同的邮箱地址，则两个账户必定属于同一个人。请注意，
    即使两个账户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。一个人最初可以拥有任意数量的账户，但其所有账户都具有相同的名称。

    合并账户后，按以下格式返回账户：每个账户的第一个元素是名称，其余元素是按字符 ASCII 顺序排列的邮箱地址。账户本身可以以任意顺序返回。

    示例 1：
    输入：
    accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"],
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
    输出：
    [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
    解释：
    第一个和第三个 John 是同一个人，因为他们有共同的邮箱地址 "johnsmith@mail.com"。 
    第二个 John 和 Mary 是不同的人，因为他们的邮箱地址没有被其他帐户使用。
    可以以任何顺序返回这些列表，例如答案 [['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
    ['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']] 也是正确的。

    提示：
    accounts的长度将在[1，1000]的范围内。
    accounts[i]的长度将在[1，10]的范围内。
    accounts[i][j]的长度将在[1，30]的范围内。

    链接：https://leetcode-cn.com/problems/accounts-merge
*/
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
// TODO: 三刷！
/**
 * =============================
 * 二刷
*/
export var accountsMerge = function(accounts) {
    // accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"],
    //     ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
    let n = accounts.length;
    let uf = new UnionFind(n);
    for (let i = 1; i < n; i++) {
        for (let j = i-1; j >=0; j--) {
            if (isCross(accounts, i ,j)) {
                uf.union(i, j);
            }
        }
    }

    return merge(uf, accounts);
}
function merge(uf, accounts) {
    let ans = [];
    let map = {};
    let n = accounts.length;
    for (let i = 0; i < n; i++) {
        let parent = uf.findParent(i);
        if (map[parent]) {
            for (let j = 1; j < accounts[i].length; j++) {
                map[parent].add(accounts[i][j]);
            }
        } else {
            map[parent] = new Set(accounts[i].slice(1));
        }
    }
    Object.keys(map).forEach(key => {
        ans.push([accounts[key][0], ...[...map[key]].sort()]);
    });
    return ans;
}
function isCross(accounts, i ,j) {
    let leni = accounts[i].length;
    for (let t = 1; t < leni; t++) {
        if (accounts[j].includes(accounts[i][t])) {
            return true;
        }
    }
    return false;
}
class UnionFind {
    constructor(n) {
        this.parents = Array(n).fill(null).map((_,i) => i);
    }
    findParent(x) {
        if (x !== this.parents[x]) {
            this.parents[x] = this.findParent(this.parents[x]);
        }
        return this.parents[x];
    }
    union(x, y) {
        let px = this.findParent(x);
        let py = this.findParent(y);
        if (px !== py) {
            this.parents[py] = px;
        }
    }
}

/**
 * =============================
 * 一刷
*/
// 并查集详解：https://blog.csdn.net/liujian20150808/article/details/50848646
// 并查集不一定要以每个数组元素为一项目，也可以以每个元素的元素为项进行合并，看以什么方便且能解决问题
// 这个题，union email 比 union account 要快一些
export var accountsMerge1 = function(accounts) {
    let len = accounts.length;
    let uf = new UnionFind(len);
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j < len; j++) {
            if (isCrossed(accounts, i, j)) {
                uf.union(i,j);
            }
        }
    }
    return merge(uf.parents, accounts, uf);
};

function merge1 (parents, accounts, uf) {
    let ans = [];
    for (let i = 0; i < parents.length; i++) {
        // 【关键点】union 最后确实能成连通图，但是可能路径长度不是 1 ，比如 test case 1，所以在 merge 过程中要再手动找下 root 是谁，而不能直接去拿 parent
        // 原因是：联通构建过程中，不可能所有节点都被做了【路径压缩】连接到了 root 上，有些节点后来进来的，没被别人再 union 了，就没有 find 了，就没有压缩了
        // let parent = parents[i];
        let root = uf.find(parents[i]);
        if (!ans[root]) ans[root] = [];

        let account = accounts[i];
        for(let j = 1; j < account.length; j++) {
            if (!ans[root].includes(account[j])) {
                ans[root].push(account[j]);
            }
        }
    }

    ans.forEach((account, i) => {
        account.sort();
        account.unshift(accounts[parents[i]][0]);
    });

    return ans.filter(item => !!item);
}

function isCrossed(accounts, i, j) {
    for (let t = 1; t < accounts[j].length; t++) {
        if (accounts[i].includes(accounts[j][t])) return true;
    }
    return false;
}

class UnionFind1 {
    constructor(n) {
        this.parents = Array(n).fill(0).map((_, i) => i);
    }

    find(x) {
        if (x !== this.parents[x]) {
            this.parents[x] = this.find(this.parents[x]);
        }
        return this.parents[x];
    }

    union (x, y) {
        let px = this.find(x);
        let py = this.find(y);
        if (px !== py) {
            this.parents[px] = py;
        }
    }
}