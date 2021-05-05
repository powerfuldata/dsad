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
    console.log('record function');
}
// 切入
logic = logic.before(function(){
    console.log('before');// 切入前打印
}).after(function(){
    console.log('after');// 切入后打印
})

// 测试
logic();