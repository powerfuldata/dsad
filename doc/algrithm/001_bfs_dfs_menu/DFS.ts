
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

    // console.log(JSON.stringify(header.children))
    console.log('dfs=',count)
    return header.children
}
export default dfs;