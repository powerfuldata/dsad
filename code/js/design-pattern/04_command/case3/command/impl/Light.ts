import {Command} from '../Command'
import {Light} from '../../receiver/Light'
// 开灯
export class LightOn implements Command{
    private receriver: Light;
    constructor(receriver: Light){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.on();
    }
}
// 关灯
export class LightOff implements Command{
    private receriver: Light;
    constructor(receriver: Light){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.off();
    }
}