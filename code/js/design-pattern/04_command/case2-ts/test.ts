import {Client} from './Client'
import * as Light from './ConcreteCommand/Light'
import * as VCD from './ConcreteCommand/VDC'

// 测试 yarn run ts-node design-pattern/04_command/case2-ts/test.ts
function test(){
    const client: Client = new Client();
    const vcdOn = new VCD.VCDPlay();
    client.setCommand(vcdOn)
    client.invoke()

    const vcdOff = new VCD.VCDClose();
    client.setCommand(vcdOff)
    client.invoke()
}
test()