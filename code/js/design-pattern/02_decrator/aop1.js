var before = function(fn, beforeFn){
    return function(){
        beforeFn.apply(this,arguments)
        return fn.apply(this,arguments)
    }
}

var test1 = function(){
    console.log(1)
}
var test2 = function(){
    console.log(2)
}

var agent = before(test1,test2);

var aop = before(agent, function(){
    console.log('before')
})
aop()