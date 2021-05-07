import {Client} from './Client'

// yarn run ts-node design-pattern/04_command/case3/test.ts
(() => {
    const client = new Client();
    console.log('电灯。。。。')
    client.run('lightOn')
    console.log('电视。。')

    client.run('tvPaly')
})()