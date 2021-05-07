import {Invoker} from './Invoker'
import * as LightCommand from './command/impl/Light';
import * as TVCommand from './command/impl/TV';
import {Light} from './receiver/Light'
import {TV} from './receiver/tv';
import {Command} from './command/Command'

export class Client{
    private switch: Map<string,Invoker> = new Map();
    constructor(){
        this.lightOn();
        this.lightOff();
        this.tvOn();
        this.tvOff();
        this.tvPaly();

    }
    private lightOn(){
        const receiver = new Light();
        const command = new LightCommand.LightOn(receiver)
        const invoker = new Invoker(command)
        if (!this.switch.has('lightOn')){
            this.switch.set('lightOn', invoker);
        }
    }
    private lightOff(){
        const receiver = new Light();
        const command = new LightCommand.LightOff(receiver)
        const invoker = new Invoker(command)
        if (!this.switch.has('lightOff')){
            this.switch.set('lightOff', invoker);
        }
    }
    private tvOn(){
        const receiver = new TV();
        const command = new TVCommand.TVOn(receiver)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvOn')){
            this.switch.set('tvOn', invoker);
        }
    }
    private tvOff(){
        const receiver = new TV();
        const command = new TVCommand.TVOff(receiver)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvOff')){
            this.switch.set('tvOff', invoker);
        }
    }
    private tvPaly(){
        const receiver = new TV();
        const command = new TVCommand.TVPlay(receiver)
        const invoker = new Invoker(command)
        if (!this.switch.has('tvPaly')){
            this.switch.set('tvPaly', invoker);
        }
    }
    // 执行
    public run(key: string){
        if (this.switch.get(key)){
            this.switch.get(key)!.action();
        }
    }
    
}