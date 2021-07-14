# js 基础

## 知识

### 箭头函数和普通函数的区别 - 4 个没有，1 个不能
1. 没有 this。它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。
2. 没有 arguments。【其实也是不能 new 的原因，因为构造函数无法传参了，当然决定行因素还是箭头函数没有 this ！】
3. 没有 prototype。
6. 没有 yield 属性，不能作为生成器Generator使用不能用
5. 不能用 new 调用。原因：1. new 的时候需要调用 apply 改变构造函数的 this 到新的空对象；2. 而箭头函数的 this 不能更改，即不能调用 apply，会报错
4. call/apply/bind无法改变箭头函数中this的指向

### new 的时候做了什么
1. 创建空对象；
2. 空对象的__proto__ 指向 fn 的prototype; 
3. fn.apply(空对象)；
4. return 值】

模拟：
```js
function new() {
    // 1. 
    let obj = {};
    // new 的第一个参数就是 constructor
    let [constructor, ...args] = [...arguments];
    // 2.
    obj.__proto__ = constructor.prototype;
    // 3.
    let result = constructor.apply(obj, args);
    // 4.
    return result;
}
```

## 打包

### webpack 和 rollup 的区别

Use webpack for apps, and Rollup for libraries 成为了众多开发者的共识。（vue，react都是用的rollup）

webpack 特点：
    - 代码分割：有两种**组织模块依赖**的方式 - 同步和异步。异步作为分割点，形成新的块。在优化了依赖树后，每一个异步模块都作为一个新的文件被打包。
    - Loader: webpack 本身只能处理 js 模块，但是通过 Loader 转换器能将各种类型的文件转换成 js 模块，这样，任何资源都成了 webpack 可以处理的模块了。
    - 智能解析: webpack 有一个解析库，几乎可以解析任何三方库，无论他们是 commonjs、amd 还是普通 js。甚至在加载依赖的时候允许动态引用 require("./templates/" + name + ".jade")。
    - 生态：有丰富的插件系统满足各种需求，还可以自定义。

rollup 特点：
    - Tree-shaking: Rollup通过对代码的静态分析，分析出冗余代码，在最终的打包文件中将这些冗余代码删除掉，进一步缩小代码体积
    - ES6 模块打包支持: rollup 不需要 babel 将 import 转换成 commonjs 或 require 形式就可以处理，极大利用了 ES6 的优势。

总：
Webpack对于代码分割和静态资源导入有着“先天优势”，并且支持热模块替换(HMR)，而Rollup并不支持，所以当项目需要用到以上，则可以考虑选择Webpack。
Rollup对于代码的Tree-shaking和ES6模块有着算法优势上的支持，若你项目只需要打包出一个简单的bundle包，并是基于ES6模块开发的，可以考虑使用Rollup。

其实Webpack从2.0开始支持Tree-shaking，并在使用babel-loader的情况下支持了es6 module的打包了，实际上，Rollup已经在渐渐地失去了当初的优势了。但是它并没有被抛弃，反而因其简单的API、使用方式被许多库开发者青睐，如React、Vue等，都是使用Rollup作为构建工具的。而Webpack目前在中大型项目中使用得非常广泛。
最后，用一句话概括就是：在开发应用时使用 Webpack，开发库时使用 Rollup。
————————————————
原文链接：https://blog.csdn.net/wangyiyungw/article/details/84955909

## 手写

1. call

```js
Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') throw new TypeError('not a function');

    let fn = this;

    context.fn = fn;

    let result = context.fn(...args);

    delete context.fn;
    return result;
}
```

2. apply

```js
Function.prototype.apply = function (context, args) {
    if (typeof this !== 'function') throw new TypeError('not a function');

    let fn = this;

    context.fn = fn;

    let result = context.fn(...args);

    delete context.fn;
    return result;
}
```

3. bind

```js
Function.prototype.bind = function (context, ...bindArgs) {
    if (typeof this !== 'function') throw new TypeError('not a function');

    let fn = this;

    return function F(...args) {
        // bind 之后的函数也可以被 new 调用，需要处理这种情况
        // new 的时候 this 指向新的对象，所以可以判断
        // 被 new 调用应该：
        if (this instanceof F) {
            return new fn(...bindArgs, ...args)
        } else {
            context.fn = fn;
            let result = context.fn(...bindArgs, ...args);
            delete context.fn;
            return result;
        }
    };
}
```

4. 防抖和节流

```js
// 时间结束等待 wait 时间后执行的版本
function debounce(fn, wait) {
    let timer;
    return function() {
        const _this = this;
        const args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, wait);
    }
}

// 1. 希望立即执行，执行完接下来的 wait 时间内都不执行，超过时间才继续执行
// 2. 函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，
// 因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，
// 所以我们只在 immediate 为 true 的时候返回函数的执行结果。
function debounce(fn, wait, immediately) {
    let timer;
    let result;
    // 这里不能使用箭头函数，不然 this 依然会指向 Windows对象
    // 使用rest参数，获取函数的多余参数
    const debounced = function(...args) {
        // 下面 setTimeout 用了箭头函数，所以不用保存 this 了
        // const _this = this;

        // 不管怎样，进来函数，都先清空上一个 timer,清空并不会置 timer 为 null，timer 还是上一个的数字
        timer && clearTimeout(timer);
        if (immediately) {
            let now = !timer;
            setTimeout(() => {
                timer = null;
            }, wait);

            if (now) {
                result = fn.apply(this, args);
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        }
        return result;
    }

    debounced.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };

    return debounced;
}

// 时间戳方式
function throttle(fn, wait) {
    let pre = 0;
    return function(...args) {
        let now = new Date().getTime();
        if (now - pre > wait) {
            fn.apply(this, args);
            pre = now;
        }
    }
}
// 定时器方式
function throttle(fn, wait) {
    let timer;
    return function(...args) {
        if (!timer) {
            timer = setInterval(() => {
                fn.apply(this, args);
                clearInterval(timer);
                timer = null;
            }, wait);
        }
    }
}

// 要一个默认有头有尾的！就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！，可以配置去掉头尾的
function throttle(fn, wait, options = {leading: true, trailing: true}) {
    let timer;
    let pre = 0;
    const throttled = function(...args) {
        let {leading, trailing} = options;

        let now = new Date().getTime();
        // if (leading === false) {
        if (pre === 0 && leading === false) {
            pre = now;
        }

        // 第二个判断是防止修改系统时间导致 now 是历史时刻
        if (now - pre > wait || now < pre) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, args);
            pre = now;
        } else {
            if (!timer && trailing !== false) {
                // timer = setInterval(() => {
                timer = setTimeout(() => {
                    // 每一轮操作结束时执行 timeout，这个时候为了下一轮操作进来时 pre 能被正常设置，需要根据 options 参数复位 pre
                    // // 若设定了开始边界不执行选项，上次执行时间始终为0
                    pre = leading === false ? 0 : new Date().getTime();
                    fn.apply(this, args);
                    clearTimeout(timer);
                    timer = null;
                }, wait - (now - pre));
                // 应该只等待剩余时间
                // }, wait);
            }
        }
    }
    return throttled;
}
```

5. 函数柯里化

前提知识：fn 的参数长度可以通过 fn.length 获得

柯里化之前函数能接受多少个参数，柯里化之后还是多少，并不是变化的参数个数

```js
function curry(fn) {
    return function nest(...args) {
        if (args.length >= fn.length) {
            // fn.apply(null, ...args);
            // return fn.apply(null, ...args);
            // apply 是数组，复习的个啥啊
            return fn.apply(null, args);
        } else {
            return function(arg) {
                return nest(...args, arg);
            }
        }
    }
}

function addNum(a, b, c) {
    return a + b + c;
}

let f = curry(addNum);

f(1)(2)(3)
```

6. 发布订阅模式

```js
class Watch {
    constructor(id, cb) {
        this.id = id;
        this.cb = cb;
    }
    update() {
        console.log(`${this.id}被调用了`);
        this.cb();
    }
}
class Dep {
    constructor() {
        this.deps = [];
    }
    add(watcher) {
        this.deps.push(watcher);
    }
    notify() {
        this.deps.forEach(watcher => watcher.update());
    }
}

const w1 = new Watch(1, () => {console.log('我是1')})
const w2 = new Watch(2, () => {console.log('我是2')})
const w3 = new Watch(3, () => {console.log('我是3')})

let dep = new Dep();
dep.add(w1);
dep.add(w2);
dep.add(w3);

dep.notify();
```
