import {Command} from './Command'

export class Client{
    private command!: Command;

    setCommand(command: Command){
        this.command = command;
    }

    invoke(){
        this.command.excute()
    }
}