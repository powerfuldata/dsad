# 循环队列

循环队列相比于普通的队列，利用率更高。一个固定长度的队列，采用头指针和尾指针分别表示队列的开始和结束位置，通过`入队`和`出对`操作控制指针。

下面演示出入队列时，head 和 tail 的位置变化

```js
1.定义循环队列，长度5
   queue : ___  ___  ____  ____  ____
    / \
 head  tail
2.入队列(5)
   queue :   5  ___  ____  ____  ____
            / \
        head  tail
3.入队列(13)
   queue :   5  13   ____  ____  ____
            /     \
           head   tail
4.入队列(8)
   queue :   5  13   8  ____  ____
            /         \
          head          tail
5.入队列(2)
   queue :   5  13   8  2     ____
            /            \
        head              tail
6.入队列（10,队列已满）
   queue :   5  13   8  2     10
            /                   \
          head                  tail
7.出队列
   queue：  __  13   8  2     10
                /              \
              head              tail
8.出队列
   queue： __   __   8  2     10
                    /           \
                   head         tail
9.入队列(23)
   queue： 23   __   8  2     10
           /          \
          tail         head
10.入队列(6)
   queue： 23   6    8  2     10
               /      \
              tail    head
```

## js 实现一个循环队列

```js
/**
 * 构造函数
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.queue = [];
  this.queue.length = k;
  this.head = 0; // 头
  this.tail = -1; // 尾
  this.length = 0;
};

/**
 * 插入队列
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  if (this.length >= this.queue.length) return false;
  this.tail = this.tail === this.queue.length - 1 ? 0 : this.tail + 1; // 改变tail
  this.queue[this.tail] = value;
  this.length++;
  console.log(
    `queue=${this.queue}, head=${this.head}, tail=${this.tail}, length=${this.length}, `
  );
  if (this.length === this.queue.length) console.log("队列满了");
  console.log("-------");
  return true;
};

/**
 * 移出队列
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  if (this.length <= 0) return false;
  this.queue[this.head] = undefined;
  this.head = this.head === this.queue.length - 1 ? 0 : this.head + 1; // 改变head
  this.length--;
  console.log(
    `queue=${this.queue}, head=${this.head}, tail=${this.tail}, length=${this.length}, `
  );
  if (this.length === 0) console.log("队列已清空");
  console.log("-------");
  return true;
};

/**
 * 获取队首元素
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if (this.length <= 0) return -1;
  return this.queue[this.head];
};

/**
 * 队尾元素
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if (this.length <= 0) return -1;
  return this.queue[this.tail];
};

/**
 * 检查循环队列是否为空
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  console.log("isEmpty=", this.length === 0);
  return this.length === 0;
};

/**
 * 检查循环队列是否已满
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  console.log("isFull=", this.length === this.queue.length);
  return this.length === this.queue.length;
};
```

## 测试

```js
var obj = new MyCircularQueue(5);
var param_1 = obj.enQueue(5);
var param_11 = obj.enQueue(13);
var param_12 = obj.enQueue(8);
var param_13 = obj.enQueue(2);
var param_14 = obj.enQueue(10);
var param_2 = obj.deQueue();
var param_21 = obj.deQueue();
var param_3 = obj.enQueue(23);
var param_31 = obj.enQueue(6);
var param_21 = obj.deQueue();
var param_21 = obj.deQueue();
var param_21 = obj.deQueue();
var param_21 = obj.deQueue();
var param_21 = obj.deQueue();

// 输出结果
/**
 queue=5,,,,, head=0, tail=0, length=1, 
-------
queue=5,13,,,, head=0, tail=1, length=2, 
-------
queue=5,13,8,,, head=0, tail=2, length=3, 
-------
queue=5,13,8,2,, head=0, tail=3, length=4, 
-------
queue=5,13,8,2,10, head=0, tail=4, length=5, 
队列满了
-------
queue=,13,8,2,10, head=1, tail=4, length=4, 
-------
queue=,,8,2,10, head=2, tail=4, length=3, 
-------
queue=23,,8,2,10, head=2, tail=0, length=4, 
-------
queue=23,6,8,2,10, head=2, tail=1, length=5, 
队列满了
-------
queue=23,6,,2,10, head=3, tail=1, length=4, 
-------
queue=23,6,,,10, head=4, tail=1, length=3, 
-------
queue=23,6,,,, head=0, tail=1, length=2, 
-------
queue=,6,,,, head=1, tail=1, length=1, 
-------
queue=,,,,, head=2, tail=1, length=0, 
队列已清空
-------
*/
```
# 参考文献

[leetcode-设计循环队列](https://leetcode-cn.com/leetbook/read/queue-stack/kzlb5/)
