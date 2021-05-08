export interface Command{
    // 执行
    excute: () => void;
    // 回退
    undo?: () => void;
}