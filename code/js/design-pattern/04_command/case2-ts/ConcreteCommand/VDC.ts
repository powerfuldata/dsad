import {Command} from '../Command'

class VCD{
    select(){
        console.log('选择第一张光盘')
    }
    play(){
        console.log('VCD is Paly')
    }
    close(){
        console.log('VCD is closed')
    }
}
// 开
export class VCDPlay extends VCD implements Command{
    excute(): void{
        this.select();
        this.play();
    }
}
// 关
export class VCDClose extends VCD implements Command{
    excute(): void{
        this.close()
    }
}