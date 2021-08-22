/**
 * 设计一个循环队列
 * @题目 https://leetcode-cn.com/leetbook/read/queue-stack/kzlb5/
 * @循环队列概念 https://leetcode-cn.com/leetbook/read/queue-stack/kzlb5/
 */
/**
 * 构造函数
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.queue = [];
    this.queue.length = k;
    this.head = 0;// 头
    this.tail = -1;// 尾
    this.length = 0;
};

/** 
 * 插入队列
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {

    if (this.length >= this.queue.length) return false;
    this.tail = this.tail === this.queue.length - 1 ? 0 : this.tail + 1;// 改变tail
    this.queue[this.tail] = value;
    this.length++;
    console.log(`queue=${this.queue}, head=${this.head}, tail=${this.tail}, length=${this.length}, `,)
    if (this.length === this.queue.length) console.log('队列满了')
    console.log('-------')
    return true;
};

/**
 * 移出队列
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
    if (this.length <= 0) return false;
    this.queue[this.head] = undefined;
    this.head = this.head === this.queue.length - 1 ? 0 : this.head + 1;// 改变head
    this.length--;
    console.log(`queue=${this.queue}, head=${this.head}, tail=${this.tail}, length=${this.length}, `)
    if (this.length === 0) console.log('队列已清空')
    console.log('-------')
    return true;
};

/**
 * 获取队首元素
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
    if (this.length <= 0) return -1;
    return this.queue[this.head];
};

/**
 * 队尾元素
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
    if (this.length <= 0) return -1;
    return this.queue[this.tail];
};

/**
 * 检查循环队列是否为空
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
    console.log('isEmpty=', this.length === 0)
    return this.length === 0;
};

/**
 * 检查循环队列是否已满
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
    console.log('isFull=', this.length === this.queue.length)
    return this.length === this.queue.length;
};


// Your MyCircularQueue object will be instantiated and called as such:
var obj = new MyCircularQueue(5)
var param_1 = obj.enQueue(5)
var param_11 = obj.enQueue(13)
var param_12 = obj.enQueue(8)
var param_13 = obj.enQueue(2)
var param_14 = obj.enQueue(10)
var param_2 = obj.deQueue()
var param_21 = obj.deQueue()
var param_3 = obj.enQueue(23)
var param_31 = obj.enQueue(6)
var param_21 = obj.deQueue()
var param_21 = obj.deQueue()
var param_21 = obj.deQueue()
var param_21 = obj.deQueue()
var param_21 = obj.deQueue()
// var param_3 = obj.Front()
// var param_4 = obj.Rear()
// var param_5 = obj.isEmpty()
// var param_6 = obj.isFull()
