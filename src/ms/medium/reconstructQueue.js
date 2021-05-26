/**
 * 406. 根据身高重建队列
 * 假设有打乱顺序的一群人站成一个队列，数组 people 表示队列中一些人的属性（不一定按顺序）。每个 people[i] = [hi, ki] 表示第 i 个人的身高为 hi ，
 * 前面 正好 有 ki 个身高大于或等于 hi 的人。
    请你重新构造并返回输入数组 people 所表示的队列。返回的队列应该格式化为数组 queue ，
    其中 queue[j] = [hj, kj] 是队列中第 j 个人的属性（queue[0] 是排在队列前面的人）。

    示例 1：
    输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
    输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
    解释：
    编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
    编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
    编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
    编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
    编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
    编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
    因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。

    解释：输入是无序的，是期望的结果，比如 [6, 1] 是期望排完后，身高为 6 的人前面只有一个比他高的，并不是按照身高排序哟
    
    示例 2：
    输入：people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
    输出：[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]

    提示：
    1 <= people.length <= 2000
    0 <= hi <= 106
    0 <= ki < people.length
    题目数据确保队列可以被重建

    链接：https://leetcode-cn.com/problems/queue-reconstruction-by-height
*/
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
/**
 * =============================
 * 二刷
*/
// 哇哦，这次不是从高度考虑的，是从人数考虑的，厉害了，两次都是自己，还想的不一样，，，，，
export var reconstructQueue = function(people) {
    let n = people.length;
    people.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    let i = 0;
    while (i < n) {
        let {count, tarLoc} = countBigger(people, i);
        if (count > people[i][1]) {
            let temp = people[i];
            move(people, tarLoc, i);
            people[tarLoc] = temp;
            // 这里可以不回溯，因为答案保证一定能创建，而我们找到的 tarLoc 是最大的 idx，也就是再向后一个都不行，
            // 也就是 tarLoc 后面的不存在往前挪，挪到 i 前面的情况
            // i = tarLoc + 1;
        }
        // else {
        //     i++;
        // }
        i++;
    }
    return people;
}
function move(people, start, end) {
    for (let i = end; i > start; i--) {
        people[i] = people[i-1];
    }
}
function countBigger(people, idx) {
    let count = 0;
    let shouldBe = people[idx][1];
    let tarLoc = 0;
    for (let i = 0; i < idx; i++) {
        if (people[i][0] >= people[idx][0]) {
            count++;
        }
        if (count === shouldBe) {
            tarLoc = i + 1;
        }
    }
    return {count, tarLoc};
}


















/**
 * =============================
 * 一刷
*/
// 一次过，不过效率不高；和答案二思路差不多
export var reconstructQueue = function(people) {
    // 按 高度 排序， 高度低的人往前挪是不会影响前面的人的，因为只统计比自己高的
    people.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return b[0] - a[0];
    });

    // let i = 0;
    // while (i < people.length) {
        // 因为按照从高到低排序了，后面的不影响前面的，所以直接插入就行了，不用回溯的
        // if (isValid(people, i)) {
        //     i++;
        // } else {
        //     const replacedIdx = move(people, i);
        //     i = replacedIdx+1;
        // }
    //     if (!isValid(people, i)) {
    //         move(people, i);
    //     }
    //     i++;
    // }

    // 再简单点，其实上面的排序一到，所有的都通了
    // 因为已经从高到低了，所以 i 元素向前插入的时候不影响 i 原位置前面的所有元素，并且，i 前面的都比他大的，所以可以直接移动到 ki 的地方哦
    // for (let i = 0; i < people.length; i++) {
    //     let tar = people.splice(i, 1)[0];
    //     people.splice(tar[1], 0, tar);
    // }

    // 干嘛操作原数组，还得从里面先删，再插入，直接 new 个新数组，只插入好了，省多少操作
    let ans = [];
    for (let i = 0; i < people.length; i++) {
        ans.splice(people[i][1], 0, people[i]);
    }
    return ans;
};

function move(people, i) {
    // splice 返回删除元素组成的数组，即使一个也是数组
    let tar = people.splice(i, 1)[0];
    let count = 0;
    for(let j = 0; j < i; j++) {
        if (people[j][0] >= tar[0]) {
            count++;
            if (count === tar[1] + 1) {
                people.splice(j, 0, tar);
                return j;
            }
        }
    }
}

function isValid(people, i) {
    let tar = people[i];
    let count = 0;
    for(let j = 0; j < i; j++) {
        if (people[j][0] >= tar[0]) {
            count++;
        }
    }
    return count <= tar[1];
}
