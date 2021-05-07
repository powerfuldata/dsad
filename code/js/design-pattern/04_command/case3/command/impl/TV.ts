import {Command} from '../Command'
import {TV} from '../../receiver/tv'
// 开
export class TVOn implements Command{
    private receriver: TV;
    constructor(receriver: TV){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.on();
    }
}
// 关
export class TVOff implements Command{
    private receriver: TV;
    constructor(receriver: TV){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.off();
    }
}
// 播放
export class TVPlay implements Command{
    private receriver: TV;
    constructor(receriver: TV){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.on();
        this.receriver.play();
    }
}