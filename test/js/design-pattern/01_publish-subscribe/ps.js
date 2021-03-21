// 创建订阅-发布模式实例
const PSManager = (function () {
    var namespacesCache = {}
    var publish = function(key, ...args){}
    var subscribe = function(key, callback){}
    var create = function(namespace){
        return namespacesCache[namespace] ? namespacesCache[namespace] : namespacesCache[namespace] = {
            publish, subscribe
        }
    }
    return {
        publish, subscribe, create
    }

})();



