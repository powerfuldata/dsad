var te11 = (function(){
    var obj = {a:1,b:2}
    var create = function(key){
        return obj[key] ? obj[key] : obj[key] = 0
    }
    var geto = function(){
        return obj
    }
    return {create,geto}
})()
console.log(te11.create('zhang'))
console.log(te11.geto())