/**
 * 掐你徐遍历-迭代
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
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
// 前序遍历-递归
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