
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


export default bfs;