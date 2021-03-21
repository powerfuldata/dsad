var countCache2 = function(){
    var state = {// 单价/数量
        phone: [8000,0], toy: [200,0], shoes: [400,0]
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
                    return [`手机${this.getCount(key)}部，总计${this.getPrice(key)}元`, '您刚购买了1个手机'];
                case 'toy':
                    return [`玩具${this.getCount(key)}个，总计${this.getPrice(key)}元`, '您刚购买了1个玩具']
                case 'phone':
                    return [`鞋子${this.getCount(key)}双，总计${this.getPrice(key)}元`, '您刚购买了1双鞋子']
                default:
                    return [];
            }
        }
    }
}()

countCache2.add('phone',3)
console.log(countCache2.getTip('phone'))