# js：二叉树遍历-前序/中序/后续，使用递归和迭代两种方法

## 1.前序遍历
### 1.1 递归
```js
var preorderTraversal1 = function(root) {
    const res = [];
    function traverse(node){
        if (!node) return;
        res.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return res;
}
```
### 1.2 迭代
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root) {
    const stack = [], // 栈只存放left节点（根节点也认为是left）
    ret = [];
    let node = root;
    while(stack.length > 0 || node){
        while(node){
            stack.push(node);
            ret.push(node.val);
            node = node.left;
        }
        node = stack.pop();// 
        node = node.right;
    }
    return ret;
};
```

## 1.中序遍历
### 1.1 递归
```js
var inorderTraversal = function(root) {
    const res = [];
    function traverse (node){
        if (!node) return;
        traverse(node.left)
        res.push(node.val);
        traverse(node.right)
    }
    traverse(root);
    return res;
}
```
### 1.2 迭代
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
    const stack = [], ret = [];
    let node = root;
    while(stack.length > 0 || node){
        while(node){
            stack.push(node)
            node = node.left;
        }
        node = stack.pop();
        ret.push(node.val);
        node = node.right;
    }
    return ret;
};
```

## 1.后序遍历
### 1.1 递归
```js
var postorderTraversal1 = function(root) {
    const res = []
    function loop (node) {
        if (!node) return;
        loop(node.left);
        loop(node.right);
        res.push(node.val)
    }
    loop(root)
    return res;
}
```
### 1.2 迭代
后续遍历迭代写法不同于前序和中序，需要加一个pre变量来防止死循环
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal = function(root) {
    const stack = [], ret = [];
    let node  = root;
    let pre;
    while(stack.length > 0 || node){
        while(node){
            stack.push(node);
            node = node.left
        }
        node = stack.pop();
        if(!node.right || node.right === pre) {
            ret.push(node.val);
            pre = node;
            node = null
        } else {
            stack.push(node)
            node = node.right;
        }
    }
    return ret;
};
```