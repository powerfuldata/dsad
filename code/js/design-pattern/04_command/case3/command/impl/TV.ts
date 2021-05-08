import {Command} from '../Command'
import {TV} from '../../receiver/TV'
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
        // this.receriver.on();
        this.receriver.play();
    }
}

export class ChannelUp implements Command{
    private receriver: TV;
    constructor(receriver: TV){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.channelUp();
    }
    undo(){
        console.log('ChannelUp-频道撤回')
        this.receriver.channelDown()
    }
}
export class ChannelDown implements Command{
    private receriver: TV;
    constructor(receriver: TV){
        this.receriver = receriver;
    }
    excute(){
        this.receriver.channelDown();
    }
    undo(){
        console.log('ChannelDown-频道撤回')
        this.receriver.channelUp()
    }
}

