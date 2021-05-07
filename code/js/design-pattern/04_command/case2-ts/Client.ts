import {Command} from './Command'

export class Client {
    private receiver!: Command;

    setCommand(receiver: Command){
        this.receiver = receiver;
    }

    invoke(){
        this.receiver.excute()
    }
}