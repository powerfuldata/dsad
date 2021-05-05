/**
 * 切入前
 * @param {Function} fn 
 * @param {Function} beforeFn 
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
 * @param {Function} fn 
 * @param {Function} beforeFn 
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