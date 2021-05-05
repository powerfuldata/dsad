import bfs from './BFS'
import dfs from './DFS'
import list from './testJson1.json';


/**
 * test.json数据量最小
 * testJson.json 是两级菜单
 * testJson1.json 是五级菜单
 */
export const test = () => {
    bfs(JSON.parse(JSON.stringify(list)))
    dfs(JSON.parse(JSON.stringify(list)))
}

// 运行测试: yarn run ts-node src/algorithm/01_bfs_dfs_menu/index.ts 
test()