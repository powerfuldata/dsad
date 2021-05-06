import {Command} from '../Command'

// 灯
class Light{
    on(){
        console.log('light is On')
    }
    off(){
        console.log('light is Off')
    }
}
// 开灯命令
export class LightOnCommand implements Command{
    private light: Light;

    constructor(light: Light){
        this.light = light;
    }
    excute(): void{
        this.light.on();
    }
}
// 关灯命令
export class LightOffCommand implements Command{
    private light: Light;

    constructor(light: Light){
        this.light = light;
    }
    excute(): void{
        this.light.off();
    }
}