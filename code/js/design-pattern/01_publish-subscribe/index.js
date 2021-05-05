/**
 * 创建订阅-发布模式实例
 * create()方法创建出的实例是单例模式，每个命名空间都有一个独立的单例对象。
 */
const PSManager = (function () {
    var namespacesCache = {}
    var listenerMap = new Map();// key为消息类型
    /**
     * 发布消息
     * @param {string} type   消息类型
     * @param  {...any} args 消息内容
     */
    var publish = function(type, ...args){
        if (listenerMap.get(type)) {
            var listeners = listenerMap.get(type);
            listeners.forEach(callback => {// 订阅池里的所有事件全部触发
                callback && callback.apply(null, args)
            });
        }
    }
    /**
     * 订阅消息
     * @param {string} type     消息类型
     * @param {*} callback      收到消息后执行回调函数
     */
    var subscribe = function(type, callback){
        if (listenerMap.get(type)) {
            var listeners = listenerMap.get(type);
            listeners.push(callback)// 添加新的订阅
        } else {
            listenerMap.set(type, [callback])
        }
    }
    /**
     * 创建一个发布-订阅模式的实例
     * @param {*} namespace     命名空间，解决多个模块调用出现冲突,不传默认'_default'
     * @returns 实例
     */
    var create = function(namespace = '_default'){
        return namespacesCache[namespace] ? namespacesCache[namespace] : namespacesCache[namespace] = { publish, subscribe }
    }
    /**
     * 取消订阅
     * @param {string} type     消息类型
     * @param {Function} func   
     */
    var unsubscribe = function(type, func){
        if (listenerMap.get(type)){
            listenerMap.get(type) = listenerMap.get(type).filter(fn => fn !== func)
        }
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
        console.log(PSManager.create('order_list'))
        PSManager.create('order_list').publish('phone',1)
    }
    btns[1].onclick = function () {// 购买玩具
        PSManager.create('order_list').publish('toy',1)
    }
    btns[2].onclick = function () {// 购买鞋子
        PSManager.create('order_list').publish('shoes',1)
    }
    // 订阅消息
    PSManager.create('order_list').subscribe('phone',function(count){
        lies[0].innerText = State.add('phone', count).getTip('phone')[0];// 刷新通知栏
        spans[0].innerText = `总商品数：${State.sum()}`;// 刷新通知栏
        spans[1].innerText = State.getTip('phone')[1]// 刷新订单列表
    })
    PSManager.create('order_list').subscribe('toy',function(count){
        lies[1].innerText = State.add('toy', count).getTip('toy')[0];
        spans[0].innerText = `总商品数：${State.sum()}`;
        spans[1].innerText = State.getTip('toy')[1]
    })
    PSManager.create('order_list').subscribe('shoes',function(count){
        lies[2].innerText = State.add('shoes', count).getTip('shoes')[0];
        spans[0].innerText = `总商品数：${State.sum()}`;
        spans[1].innerText = State.getTip('shoes')[1]
    })
}

// cp design-pattern/01_publish-subscribe/index.js /usr/local/nginx/html





