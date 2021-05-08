export class TV{
    channel: number = 0;
    on(){
        console.log('打开电视')
    }
    off(){
        console.log('关闭电视')
    }
    play(){
        this.channel = 12;
        console.log('播放体育频道')
    }
    // 频道+
    channelUp(){
        if (this.channel < 100) {
            this.channel ++;
            console.log('频道+,当前频道=',this.channel)
        }
    }
    // 频道-
    channelDown(){
        if (this.channel > 0) {
            this.channel --;
            console.log('频道-,当前频道=',this.channel)
        }
    }
}