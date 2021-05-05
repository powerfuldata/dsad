// jquery $.each()原理

function each (obj,callback){
    for(var i = 0; i < obj.length; i ++){
        if (callback.call(obj, i, obj[i])){
            break;
        }
    }
}

var ary = [4,5,6,7,8]
each(ary,function(i,v) {
    console.log(`i=${i}, v=${v}`)
    if (i >= 2) {
        return false
    }
})