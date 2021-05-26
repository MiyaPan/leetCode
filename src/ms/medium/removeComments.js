/**
 * 722. 删除注释
 * https://leetcode-cn.com/problems/remove-comments/
 * 给一个 C++ 程序，删除程序中的注释。这个程序source是一个数组，其中source[i]表示第i行源码。 这表示每行源码由\n分隔。

    在 C++ 中有两种注释风格，行内注释和块注释。

    字符串// 表示行注释，表示//和其右侧的其余字符应该被忽略。

    字符串/* 表示一个块注释，它表示直到*\/的下一个（非重叠）出现的所有字符都应该被忽略。（阅读顺序为从左到右）非重叠是指，字符串/*\/并没有结束块注释，因为注释的结尾与开头相重叠。

    第一个有效注释优先于其他注释：如果字符串//出现在块注释中会被忽略。 同样，如果字符串/*出现在行或块注释中也会被忽略。

    如果一行在删除注释之后变为空字符串，那么不要输出该行。即，答案列表中的每个字符串都是非空的。

    样例中没有控制字符，单引号或双引号字符。比如，source = "string s = "/* Not a comment. *\/";" 不会出现在测试样例里。（此外，没有其他内容（如定义或宏）会干扰注释。）

    我们保证每一个块注释最终都会被闭合， 所以在行或块注释之外的/*总是开始新的注释。

    最后，隐式换行符可以通过块注释删除。 有关详细信息，请参阅下面的示例。

    从源代码中删除注释后，需要以相同的格式返回源代码。

    示例 1:

    输入: 
    source = ["/*Test program *\/",
              "int main()", 
              "{ ", 
              "  // variable declaration ", 
              "int a, b, c;", 
              "/* This is a test",
              "   multiline  ", 
              "   comment for ",
              "   testing *\/", 
              "a = b + c;", 
              "}"
            ]

    示例代码可以编排成这样:
    /*Test program *\/
    int main()
    { 
       // variable declaration 
    int a, b, c;
    /* This is a test
    multiline  
    comment for 
    testing *\/
    a = b + c;
    }

    输出: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]

    编排后:
    int main()
    { 
    
    int a, b, c;
    a = b + c;
    }

    解释: 
    第 1 行和第 6-9 行的字符串 /* 表示块注释。第 4 行的字符串 // 表示行注释。
    
    示例 2:
    输入: 
    source = ["a/*comment", "line", "more_comment*\/b"]
    输出: ["ab"]
    解释: 原始的 source 字符串是 "a/*comment\nline\nmore_comment*\/b", 其中我们用粗体显示了换行符。删除注释后，隐含的换行符被删除，留下字符串 "ab" 用换行符分隔成数组时就是 ["ab"].
    注意:

    source的长度范围为[1, 100].
    source[i]的长度范围为[0, 80].
    每个块注释都会被闭合。
    给定的源码中不会有单引号、双引号或其他控制字符。

    链接：https://leetcode-cn.com/problems/remove-comments
*/
/**
 * @param {string[]} source
 * @return {string[]}
 */
/**
 * =============================
 * 二刷
*/
// source = ["/*Test program *\/",
//               "int main()", 
//               "{ ", 
//               "  // variable declaration ", 
//               "int a, b, c;", 
//               "/* This is a test",
//               "   multiline  ", 
//               "   comment for ",
//               "   testing *\/", 
//               "a = b + c;", 
//               "}"
//             ]
export var removeComments = function(source) {
    let n = source.length;
    let ans = [];
    let inBlock = false;
    let temp = '';
    for (let i = 0; i < n; i++) {
        temp = inBlock ? temp : '';
        let cur = source[i];
        for (let j = 0; j < cur.length; j++) {
            if (inBlock && cur[j] === '*' && cur[j+1] === '/') {
                inBlock = false;
                // 向后调整一位
                // j++;
                // 得调整 2 位，不然会把结束的 / 计入
                j += 2;
            }

            if (inBlock) continue;

            // 这不能直接 break 呢，如果在块注释中要忽略才对，所以要把上面这行提到本行前面
            // if (cur[j] === '/' && cur[j+1] === '/') break;
            if (cur[j] === '/' && cur[j+1] === '/') break;

            if (cur[j] === '/' && cur[j+1] === '*') {
                inBlock = true;
                // 向后调整一位
                j++;
                continue;
            }
            
            if (j < cur.length) temp += cur[j];
        }
        // 块注释，跨行的要拼接到一起
        if (temp.length > 0 && !inBlock) ans.push(temp);
    }
    return ans;
}



















/**
 * =============================
 * 一刷
*/
// 有两个巨长的 case 没过，太难分析原因了，直接按官方思路写
export var removeComments1 = function(source) {
    if (source.length === 0) return [];

    let ans = [];
    let i = 0;

    while(i < source.length) {
        let item = source[i];
        const lineIdx = item.indexOf('//');
        const blockStartIdx = item.indexOf('/*');
        if (~lineIdx && (!~blockStartIdx || lineIdx < blockStartIdx)) {
            const str = item.substring(0, lineIdx);
            str && ans.push(str);
        } else if (~blockStartIdx) {
            let str = item.substring(0, blockStartIdx);
            const prei = i;
            while(!~item.indexOf('*/', i === prei ? blockStartIdx + 2 : 0)) {
                i++;
                item = source[i];
            }
            const blockEndIdx = item.indexOf('*/', i === prei ? blockStartIdx + 2 : 0);
            const nextLineIdx = item.indexOf('//', blockEndIdx + 2);
            if(nextLineIdx !== -1 && nextLineIdx > blockEndIdx) {
                str += item.substring(blockEndIdx + 2, nextLineIdx);
            } else {
                str += item.substring(blockEndIdx + 2);
            }
            str && ans.push(str);
        } else {
            ans.push(item);
        }
        i++;
    }

    return ans;
};

export var removeComments11 = function(source) {
    if (source.length === 0) return [];

    let ans = [];
    let isInComment = false;
    let temp = '';

    for(let i = 0; i < source.length; i++) {
        let item = source[i];
        // 这些会有覆盖，所以最好的办法就是每个字符串里的字符都遍历！！！是的，遍历，其实更简单，不然处理它仨的顺序就写的恨不清晰了！
        // const lineIdx = item.indexOf('//');
        // const blockStartIdx = item.indexOf('/*');
        // const blockEndIdx = item.indexOf('*/', i === prei ? blockStartIdx + 2 : 0);

        temp = !isInComment ? '' : temp;
        for (let j = 0; j < item.length; j++) {
            if (!isInComment && (j + 1 < item.length) && item[j] === '/' && item[j+1] === '/') {
                break;
            } else if (!isInComment && (j + 1 < item.length) && item[j] === '/' && item[j+1] === '*') {
                isInComment = true;
                // 用过的 * 就不能再用了
                j++;
            } else if (isInComment && (j + 1 < item.length) && item[j] === '*' && item[j+1] === '/') {
                isInComment = false;
                j++;
            } else if (!isInComment) {
                temp += item[j];
            }
        }

        // temp 保存了 [a/* cc, c */b] 的开头，所以这里要判断下是不是在注释中，因为 temp 的长度已经不能作为判断依据了
        if(!isInComment && temp) {
            ans.push(temp);
        }
    }

    return ans;
};
