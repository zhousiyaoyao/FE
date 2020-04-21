// 代码的顺序和真实顺序相反
// 右，根，左
var inorderTraversal = function(root) {
    var res = []
    var stack = []
    if (!root) return res
    stack.push({color: 'white', node: root})
    while(stack.length > 0){
        var value = stack.pop()
        var { color, node } = value
        if(color === 'gray'){
            res.push(node.val)
        }else{
            if(node.right){
                stack.push({ color: 'white', node: node.right })
            }
            stack.push({ color: 'gray', node})
            if(node.left){
                stack.push({ color: 'white', node: node.left })
            }
        }
    }
    return res
};

// 根，右，左
var PostTraversal = function(root) {
    var res = []
    var stack = []
    if (!root) return res
    stack.push({color: 'white', node: root})
    while(stack.length > 0){
        var value = stack.pop()
        var { color, node } = value
        if(color === 'gray'){
            res.push(node.val)
        }else{
            stack.push({ color: 'gray', node})
            if(node.left){
                stack.push({ color: 'white', node: node.left })
            }
            if(node.right){
                stack.push({ color: 'white', node: node.right })
            }
        }
    }
    return res
};

// 右，左，根
var preorderTraversal = function(root) {
    var res = []
    var stack = []
    if (!root) return res
    stack.push({color: 'white', node: root})
    while(stack.length > 0){
        var value = stack.pop()
        var { color, node } = value
        if(color === 'gray'){
            res.push(node.val)
        }else{
            if(node.right){
                stack.push({ color: 'white', node: node.right })
            }
            if(node.left){
                stack.push({ color: 'white', node: node.left })
            }
            stack.push({ color: 'gray', node})
        }
    }
    return res
};

// 层序
var levelOrder = function(root) {
    if(!root) return []
    var queue = [root]
    var res = []
    var level = 0
    while(queue.length){
        res[level] = []
        let num = queue.length
        while(num--){
            var tmp = queue.shift()
            res[level].push(tmp.val)
            if(tmp.left) queue.push(tmp.left)
            if(tmp.right) queue.push(tmp.right)
        }
        level++
    }
    return res
};