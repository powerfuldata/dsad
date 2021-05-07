import {RemoteControll} from './RemoteControll'

// 测试 yarn run ts-node design-pattern/04_command/case2-ts/test.ts
function test(){
    const controll = new RemoteControll()

    controll.pressOn(0)
    controll.pressOn(1)
}
test()