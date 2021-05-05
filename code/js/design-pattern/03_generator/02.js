// 比较两个js是否完全一样
// 方法一，加原型，Array.prototype.compare
const fn1 = function(){
    Array.prototype.compare = function(arr){
        if (this.length !== arr.length) return false;
        for(var i in this){
            if (this[i] !== arr[i]) return false;
        }
        return true
    }
    
    var arr1 = [1,3,4,5]
    var arr2 = [1,3,4,5]
    var arr3 = [4,5,6,7]
    
    console.log('arr1 === arr2,',arr1.compare(arr2))
    console.log('arr1 === arr3,',arr1.compare(arr3))
    console.log('arr2 === arr3,',arr2.compare(arr3))
}



