import {Command} from './command/Command'

export class Invoker{
    private command!: Command;
    constructor(command: Command){
        this.setCommand(command);
    }
    // 设置命令
    private setCommand(command: Command){
        this.command = command;
    }
    // 执行命令
    action(){
        this.command.excute();
    }    
}