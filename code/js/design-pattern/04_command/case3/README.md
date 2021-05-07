遥控器例子

参考文献：
- Head First设计模式
- [菜鸟数据-命令模式](https://www.runoob.com/design-pattern/command-pattern.html)
- [Client/Receiver/Invoker/Command之间的关系](https://www.cnblogs.com/java-my-life/archive/2012/06/01/2526972.html)

类模型
- Command接口:`excute()`, `undo()`
- `Concrete/`,具体命令，实现Command接口
- Client类: 客户
- Receiver类: 具体业务
- Invoker类: 命令传达人。只接收指令并执行，不用管具体指令是什么。`setCommand(command)`
