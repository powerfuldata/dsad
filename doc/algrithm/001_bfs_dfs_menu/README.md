**题目：**
数据库表中存着所有菜单，使用`select * from menu`,查找出的是一维数组列表，请把它生成一个菜单树形结构的json。

**举例**
原始数据
```json
[
    { "id": 20, "parentId": 0, "name": "一级菜单1" },
    { "id": 21, "parentId": 0, "name": "一级菜单2"  },
    { "id": 22, "parentId": 0, "name": "一级菜单3"  },
    { "id": 23, "parentId": 0, "name": "一级菜单4"  },
    { "id": 24, "parentId": 20, "name": "二级菜单"  },
    { "id": 25, "parentId": 20, "name": "二级菜单"  },
    { "id": 26, "parentId": 24, "name": "三级菜单"  },
    { "id": 27, "parentId": 24, "name": "三级菜单"  },
    { "id": 28, "parentId": 21, "name": "二级菜单"  },
    { "id": 29, "parentId": 21, "name": "二级菜单"  },
    { "id": 30, "parentId": 29, "name": "三级菜单"  },
    { "id": 31, "parentId": 30, "name": "四级菜单"  },
    { "id": 32, "parentId": 31, "name": "五级菜单"  }
]
```
预期输出结果(同级菜单在当前层级上的位置可以不同)：
```json
[
    { "id": 22, "parentId": 0, "name": "一级菜单3" },
    { "id": 23, "parentId": 0, "name": "一级菜单4" },
    { "id": 20, "parentId": 0, "name": "一级菜单1",
        "children": [
            { "id": 25, "parentId": 20, "name": "二级菜单" },
            { "id": 24, "parentId": 20, "name": "二级菜单",
                "children": [
                    { "id": 26, "parentId": 24, "name": "三级菜单" },
                    { "id": 27, "parentId": 24, "name": "三级菜单" }
                ]
            }
        ]
    },
    {
        "id": 21, "parentId": 0, "name": "一级菜单2",
        "children": [
            { "id": 28, "parentId": 21, "name": "二级菜单" },
            { "id": 29, "parentId": 21, "name": "二级菜单",
                "children": [
                    { "id": 30, "parentId": 29, "name": "三级菜单",
                        "children": [
                            { "id": 31, "parentId": 30, "name": "四级菜单",
                                "children": [
                                    { "id": 32, "parentId": 31, "name": "五级菜单" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```
**分析**
这是典型的一维数组转树形结构的问题。我们可以想上面的N叉树想象成二叉树，可以转化为二叉树的遍历问题。

第一时间能想到两种算法，`广度优先搜索算法(BSF)`和`深度优先搜索算法(DSF)`。

## `广度优先搜索算法(BSF)`
也可以认为是层级遍历算法，从树的跟节点开始一层层往下遍历，因此层级的特点比较突出。
```js
/**
 * 广度优先搜索
 * @param list json数据
 */
const bfs = (list: any[]): any[] => {
    const heads: any[] = [{ id: 0, children: [] }];// 创建一个头指针，heads[0].children就是最终结果
    const levels: any[][] = [heads];// 按层存储，每层都是一个数组
    let lv = 0;// 层级
    let count = 0;// 统计复杂度
    while (list.length > 0) {
        const level = levels[lv];
        // 遍历第j层，找该层第j个元素的children
        for (let j = 0; j < level.length; j++) {
            let i = 0;
            // 遍历原数据
            while (i < list.length) {
                count ++;
                if (list[i].parentId === level[j].id) {
                    if (!level[j].children) { level[j].children = []; }
                    level[j].children.push(list[i]);// 挂到父级节点下
                    if (!levels[lv + 1]) { levels.push([]); }
                    levels[lv + 1].push(list[i]);// 孩子属于下一层
                    list.splice(i, 1);// 移除
                } else {
                    i++; // 指针继续
                }
            }
        }
        lv++; // 层级
    }
    console.log('bfs=',count)
    console.log('lv=',lv)
    return levels[0][0].children;
}
```



## `深度优先搜索算法(DSF)`
是从跟节点开始，一直遍历到叶子节点结束。
```js
/**
 * 深度优先搜索
 * @param list json数据
 */
const dfs = (list: any[]): any[] => {
    let count = 0;// 统计复杂度
    /**
     * 递归方法
     * @param p     父级菜单
     * @param id    父级id
     */
    const loop = (p: any,id = 0) => {
        let i = 0;
        while(i < list.length) {
            count ++;
            const item = list[i];
            if (item.parentId === id) {
                if (!p.children) p.children = [];
                p.children.push(item)
                loop(item, item.id);
                list.splice(i,1);// 移除
            } else {
                i ++;
            }
        }
    }
    const header = {id: 0, children: []};// 创建头指针，header.children是结果
    loop(header, header.id);

    console.log(JSON.stringify(header.children))
    console.log('dfs=',count)
    return header.children
}
```

## 复杂度分析
时间复杂度计算原则按照最大复杂度计算。参考上面的例子，菜单层级为`lv`层，原始数据长度为`n`,
**BFS：**
时间复杂度：`o = (n/lv) ^ lv`

空间复杂度：`O2n`


**DFS:**

从根节点一直遍历到叶子节点，将结果树看做一个完美N叉树，节点总个数为`n`个，层数为`lv`,求叶子节点个数`c`。
```
根据公式`(c ^ lv) - 1 = n`,则 `c = lv √(n + 1)`(n+1的lv次方跟)
```
时间复杂度：o = `lv ^ (c * lv)` = `(n+1) ^ lv`

空间复杂度：`O1`



## 测试数据
- [示例数据-5级菜单](https://github.com/powerfuldata/data-structure/blob/master/src/algorithm/01_bfs_dfs_menu/test.json)

- [示例数据-2级菜单](https://github.com/powerfuldata/data-structure/blob/master/src/algorithm/01_bfs_dfs_menu/testJson.json)

- [示例数据-4级菜单](https://github.com/powerfuldata/data-structure/blob/master/src/algorithm/01_bfs_dfs_menu/testJson1.json)

