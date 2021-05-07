import {Client} from './Client'
import {Command} from './Command'
import * as Light from './receiver/Light'
import * as VCD from './receiver/VDC'

// 遥控器实例
export class RemoteControll{
    private onList: Client[] = [];// 开
    private offList: Client[] = [];// 关

    constructor(){
        this.init()
    }
    private addOn(client: Client){
        this.onList.push(client)
    }
    private addOff(client: Client){
        this.offList.push(client)
    }
    private init(){
        let client = new Client();
        client.setCommand(new Light.LightOnCommand(new Light.Light()))
        this.addOn(client)

        client = new Client();
        client.setCommand(new Light.LightOffCommand(new Light.Light()))
        this.addOff(client)

        client = new Client();
        client.setCommand(new VCD.VCDPlay())
        this.addOn(client)

        client = new Client();
        client.setCommand(new VCD.VCDClose())
        this.addOff(client)
    }
    // 开
    pressOn(index: number){
        this.onList[index].invoke()
    }
    // 关
    pressOff(index: number){
        this.offList[index].invoke()
    }
}