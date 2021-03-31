# js实现AOP，面向切面编程

面向切面编程(AOP)是java常用编程思想，它的作用是在某个函数上进行切割，可以在函数执行前/中/后添加其他逻辑代码。

AOP编程的好处是遵循单一原则，不会修改原函数内部的代码就可以改变原函数的逻辑。

js中实现AOP使用`protoType`原型链，例如下面代码
```js
/**
 * 切入方法前
 * @param {Function} fun 前置函数
 * @returns 
 */
Function.prototype.before = function(fun){
    var self = this;// 保存被拦截函数的this
    return function(){// 代理函数
        fun.apply(this,arguments);
        var agent = self.apply(this,arguments);// 返回代理函数
        return agent;
    }
}
/**
 * 切入方法后
 * @param {Function} fun 后置函数
 * @returns 
 */
Function.prototype.after = function(fun){
    var self = this;// 保存被拦截函数的this
    return function(){// 代理函数
        var agent = self.apply(this,arguments);// 返回代理函数
        fun.apply(this,arguments);
        return agent;
    }
}
// 业务代码
function logic(){
    console.log('业务代码');
}
// 切入
logic = logic.before(function(){
    console.log('切入前');
}).after(function(){
    console.log('切入后');
})

// 测试
logic();
```

上面方法通过返回一个代理函数的方式，巧妙的实现链式编程。

## 改进

如果不想污染`Function`的原型链，可以使用如下方法
```js
/**
 * 切入前
 * @param {Function} fn         业务底阿妈
 * @param {Function} beforeFn   前置函数
 * @returns 
 */
var before = function(fn, beforeFn){
    return function(){
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}
/**
 * 切入后
 * @param {Function} fn         业务底阿妈
 * @param {Function} beforeFn   后置函数
 * @returns 
 */
var after = function(fn, afterFn){
    return function(){
        var agent = fn.apply(this, arguments);
        afterFn.apply(this, arguments);
        return agent;
    }
}


var logic = function(){
    console.log('业务代码')
}
// 切入
logic = before(logic, function(){
    console.log('切入前代码')
})
logic = after(logic,function(){
    console.log('切入后')
})


logic();
```