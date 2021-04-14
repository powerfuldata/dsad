/**
 * 中序遍历-迭代
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
// 中序遍历-递归
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