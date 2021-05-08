import {Client} from './Client'

// yarn run ts-node design-pattern/04_command/case3/test.ts
(() => {
    const client = new Client();

    client.run('tvOn');
    client.run('tvPaly');
    client.run('tvChannelUp');
    client.run('tvUndo');
    client.run('')
    client.run('tvChannelDown')
    client.run('tvUndo')
    client.run('tvUndo')
})()