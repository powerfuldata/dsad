// 主题
var Subject = (function () {
    var namespacesCache = {};// 命名空间
    var observerMap = new Map();// 观察者集合
    var registObserver = function (type, func) {
        observerMap.get(type) ? observerMap.get(type).push(func) : observerMap.set(type, [func])
    }
    /**
     * 取消观察者
     * @param {string} type 
     * @param {Function} func 观察者
     */
    var removeObserver = function (type, func) { 
        if (removeObserver.get(type)) {
            removeObserver.get(type) = removeObserver.get(type).filter(fn => fn !== func)
        } 
    }
    /**
     * 通知观察者
     * @param {string} type 
     */
    var notifyObservers = function (type, ...args) {
        if (observerMap.get(type)) {
            Array.prototype.forEach.apply(observerMap.get(type), [function(callback,i,ary){
                callback && callback.apply(null,args);// 执行回调
            }])
        }
    }
    /**
     * 创建主题
     * @param {string} namespace 
     * @returns 
     */
    var create = function(namespace = '_default'){
        return namespacesCache[namespace] ? namespacesCache[namespace] : namespacesCache[namespace] = {registObserver, removeObserver,notifyObservers}
    }
    return { create }

})()

// 状态管理器，存储商品数量、单价，总消费价格等信息
var State = function(){
    var state = {
        phone: [8000,0,0], toy: [200,0,0], shoes: [400,0,0]
    }
    return {
        add:function(key,count){// 添加一个商品
            state[key] === undefined ? state[key][1] = 0 : state[key][1] += count;
            return this;
        },
        getCount: function(key){// 某类商品数量
            return state[key] === undefined ? 0 : state[key][1]
        },
        getPrice: function(key){// 商品总价 = 数量 * 单价
            return state[key] === undefined ? 0 : state[key][1] * state[key][0];
        },
        sum: function(){// 总商品数
            return Object.keys(state).reduce((ret, key) => ret += state[key][1], 0);
        },
        getTip: function(key){// 提示语
            switch(key){
                case 'phone':
                    return [`手机${this.getCount(key)}部，总计${this.getPrice(key)}元`, '您刚购买了1部手机'];
                case 'toy':
                    return [`玩具${this.getCount(key)}个，总计${this.getPrice(key)}元`, '您刚购买了1个玩具']
                case 'shoes':
                    return [`鞋子${this.getCount(key)}双，总计${this.getPrice(key)}元`, '您刚购买了1双鞋子']
                default:
                    return [];
            }
        }
    }
}()
// 具体业务代码
window.onload = function () {
    var btns = document.getElementsByTagName('button')
    var spans = document.getElementsByTagName('span')
    var lies = document.getElementsByTagName('li')
    // 发布消息
    btns[0].onclick = function () {// 购买手机
        Subject.create('order_list').notifyObservers('phone',1)
    }
    btns[1].onclick = function () {// 购买玩具
        Subject.create('order_list').notifyObservers('toy',1)
    }
    btns[2].onclick = function () {// 购买鞋子
        Subject.create('order_list').notifyObservers('shoes',1)
    }
    // 订阅消息
    Subject.create('order_list').registObserver('phone',function(count){
        lies[0].innerText = State.add('phone', count).getTip('phone')[0];// 刷新通知栏
        spans[0].innerText = `总商品数：${State.sum()}`;// 刷新通知栏
        spans[1].innerText = State.getTip('phone')[1]// 刷新订单列表
    })
    Subject.create('order_list').registObserver('toy',function(count){
        lies[1].innerText = State.add('toy', count).getTip('toy')[0];
        spans[0].innerText = `总商品数：${State.sum()}`;
        spans[1].innerText = State.getTip('toy')[1]
    })
    Subject.create('order_list').registObserver('shoes',function(count){
        lies[2].innerText = State.add('shoes', count).getTip('shoes')[0];
        spans[0].innerText = `总商品数：${State.sum()}`;
        spans[1].innerText = State.getTip('shoes')[1]
    })
}

// cp design-pattern/01_publish-subscribe/index.js /usr/local/nginx/html





