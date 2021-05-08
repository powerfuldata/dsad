import {Invoker} from './Invoker'
import * as LightCommand from './command/impl/Light';
import * as TVCommand from './command/impl/TV';
import {Light} from './receiver/Light'
import {TV} from './receiver/TV';

export class Client{
    private switch: Map<string,Invoker> = new Map();
    private tv: TV;
    private light: Light;
    private undo: string = '';
    constructor(){
        this.tv = new TV();
        this.light = new Light()
        this.lightOn();
        this.lightOff();
        this.tvOn();
        this.tvOff();
        this.tvPaly();
        this.tvChannelUp();
        this.tvChannelDown();

    }
    // 开灯
    private lightOn(){
        const command = new LightCommand.LightOn(this.light)
        const invoker = new Invoker(command)
        if (!this.switch.has('lightOn')){
            this.switch.set('lightOn', invoker);
        }
    }
    // 关灯
    private lightOff(){
        const command = new LightCommand.LightOff(this.light)
        const invoker = new Invoker(command)
        if (!this.switch.has('lightOff')){
            this.switch.set('lightOff', invoker);
        }
    }
    // 开电视
    private tvOn(){
        const command = new TVCommand.TVOn(this.tv)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvOn')){
            this.switch.set('tvOn', invoker);
        }
    }
    private tvOff(){
        const receiver = new TV();
        const command = new TVCommand.TVOff(this.tv)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvOff')){
            this.switch.set('tvOff', invoker);
        }
    }
    // 关电视
    private tvPaly(){
        const command = new TVCommand.TVPlay(this.tv)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvPaly')){
            this.switch.set('tvPaly', invoker);
        }
    }
    // 电视频道+
    private tvChannelUp(){
        const command = new TVCommand.ChannelUp(this.tv)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvChannelUp')){
            this.switch.set('tvChannelUp', invoker);
        }
    }
    // 电视频道-
    private tvChannelDown(){
        const command = new TVCommand.ChannelDown(this.tv)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvChannelDown')){
            this.switch.set('tvChannelDown', invoker);
        }
    }
    
    // 执行
    public run(key: string){
        switch (key) {
            case 'tvUndo':
                this.switch.get(this.undo)?.undo();
                break;
            default:
                this.switch.get(key)?.action();
                this.undo = key;
                break;
        }
        
    }
    
}