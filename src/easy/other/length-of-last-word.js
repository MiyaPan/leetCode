/**
import { searchInsert } from './search-insert';
 * 58. 最后一个单词的长度
 * 给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。
 * 如果不存在最后一个单词，请返回 0 。
 * 说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。
 * 
 * 示例:
 * 
 * 输入: "Hello World"
 * 输出: 5
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/length-of-last-word
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 打败 83.96%
export const lengthOfLastWord = (s) => {
    const arr = s.trim().split(' ');
    if (arr.length === 0) {
        return 0;
    }

    return arr[arr.length - 1].length;
}

// 93.96%
export const lengthOfLastWord1 = (s) => {
    let count = 0;
    let preCount = 0;
    for (let i =0; i< s.length; i++) {
        if (s[i] === ' ') {
            preCount = count === 0 ? preCount : count;
            count = 0;
        } else {
            count++;
        }
    }
    if (count === 0) {
        return preCount;
    } else {
        return count;
    }
}

// 正则
/**
 * const reg = /(\w+)+/g;
 * const matchs1 = reg.exec(str);
 *      exec 返回 ["apple", "apple", index: 0, input: "apple da ", groups: undefined]，
 *          返回第一个，要用 while(match = reg.exec(s) !== null) 循环取
 *      matchs1[0] 是匹配的全部字符串，后续项都是捕获括号的
 * const matchs2 = str.match(reg);
 *      match 返回 ["apple", "da"]
 *          1. match 和 exec 的区别：exec 在指定 g 的时候会更新 reg.lastIndex【test也会，就是reg对象的属性都可，str的都不会】，可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配），
 *          2. g 状态下多次执行 exec 时，每次都从新的 lastIndex 开始重新查找，而相比之下， String.prototype.match() 只会返回匹配到的结果。
 *          3. 如果不包含 g 标志，str.match() 将返回与 RegExp.exec(). 相同的结果：["apple", "apple", index: 0, input: "apple da ", groups: undefined]
 *          4. 如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组！！捕获括号无作用
 *              所以 ["apple", "da"] 并不是捕获来的，是match 自带的，所有匹配项而已。
 *              reg = /\w+/g 用 match 返回的也一样，即不能拿到匹配值里的指定项(捕获)
 *          总之：match 返回就 2 中：
 *              1. 用g标志，返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
                2. 未用g标志，仅返回第一个完整匹配及其相关的捕获组（Array）。 
                    在这种情况下，返回的项目与 exec 一样，也能有捕获。但只返回第一个匹配到的。所以没法全局遍历
            即，match 的 g 和 捕获括号是不会同时起作用的。

 * const matchs3 = [...str.matchAll(reg)];
 *          1. matchAll 必须指定 g，
 *          2. 一个包含所有匹配正则表达式的结果及分组捕获组的迭代器，可以用[...]和Array.from()展开，不然就要用 for(match of matchs){}迭代器遍历。
 *          3. matchAll的亮点作用就是全局捕获，而不用 exec 那样 while循环，也不会和 match一样在用 g 时没法拿到捕获信息。【当 match 和捕获括号一起用是，捕获会被忽略】
 *          4. matchAll 内部复制了 reg，导致 lastIndex 不会正常更新
 * 
 * 如果只是为了判断是否匹配（true或 false），可以使用 RegExp.test() 方法【返回 true或false】，或者 String.search() 方法【返回index或 -1】。
 * 
*/

// 46.85%，正则不一定快
export const lengthOfLastWord2 = (s) => {
    // 为什么 new RegExp不对，因为 new RegExp里要转义！
    /**
     * 类似地，如果您正在编写正则表达式文字并且需要匹配斜杠（'/'），那么需要转义它（否则，斜杠是正则终止符）。 
     * 例如，要搜索字符串“/ example /”后跟一个或多个字母字符，您需要使用/\/example\/[a-z]+/i——每个斜杠
     * 之前使用反斜杠使它们成为普通字符。要匹配文本符号反斜杠，您需要转义反斜杠。 例如，要匹配字符串“C:\”，其
     * 中“C”可以是任何字母，您将使用/[A-Z]:\\/ —— 第一个反斜杠转义后面的那个反斜杠，因此表达式搜索单个普通字
     * 符反斜杠。如果将RegExp构造函数与字符串文字一起使用，请记住反斜杠是字符串文字中的转义，因此要在正则表达式
     * 中使用它，您需要在字符串文字级别转义它。 /a\*b/ 和new RegExp("a\\*b")创建的表达式是相同的，搜索“a”后跟文字“*”后跟“b”。
     * 
     * 如果你想将字符串传递给 RegExp 构造函数，不要忘记在字符串字面量中反斜杠是转义字符。所以为了在模式中添加
     * 一个反斜杠，你需要在字符串字面量中转义它。/[a-z]\s/i 和 new RegExp("[a-z]\\s", "i") 创建了相同的
     * 正则表达式：一个用于搜索后面紧跟着空白字符（\s 可看后文）并且在 a-z 范围内的任意字符的表达式。为了通过字
     * 符串字面量给 RegExp 构造函数创建包含反斜杠的表达式，你需要在字符串级别和正则表达式级别都对它进行转义。
     * 例如 /[a-z]:\\/i 和 new RegExp("[a-z]:\\\\","i") 会创建相同的表达式，即匹配类似 "C:\" 字符串。
    */
    // const reg = new RegExp('(\\w+)+', 'g');
    const reg = /(\w+)+/g;
    const matchs = s.match(reg);
    // match 和 exec 没匹配到返回 null，matchAll 没匹配到返回 []
    return matchs ? matchs[matchs.length - 1].length : 0;
}
