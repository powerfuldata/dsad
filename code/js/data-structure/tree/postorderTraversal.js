/**
 * 后续遍历-迭代
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
// 递归
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