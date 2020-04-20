// 78
var subsets = function(nums) {
    var dfs = function(nums, res, path,index){
        res.push(path)
        for(var i = index; i < nums.length; i++){
            dfs(nums, res, path.concat([nums[i]]), i+1)
        }
    }
    var res = []
    dfs(nums, res, [],0)
    return res      
};

// 617
var mergeTrees = function(t1, t2) {
    if(t1===null){
        return t2
    }
    if(t2===null){
        return t1
    }
    var t3 = new TreeNode(t1.val + t2.val)
    t3.left = mergeTrees(t1.left, t2.left)
    t3.right = mergeTrees(t1.right, t2.right)
    return t3
};

// 22
var generateParenthesis = function(n) {
    var helper = function(res, left, right, path){
        if(left === 0 && right ===0){
            res.push(path)
        }
        if(left < 0 || right < 0|| left > right){
            return
        }
        helper(res, left-1,right,path+'(')
        helper(res, left,right-1,path+')')
    }
    var res = []
    helper(res, n, n, "")
    return res
};

// 338
var countBits = function(num) {
    var dp = [0]
    for(var i = 1; i <= num; i++){
        if(i % 2 === 1){
            dp[i] = dp[i-1] + 1
        }else{
            dp[i] = dp[i/2]
        }
    }
    return dp
};

// 226
var invertTree = function(root) {
    if(root === null){
        return null
    }
    var tmp = root.left
    root.left = root.right
    root.right = tmp
    root.left = invertTree(root.left)
    root.right = invertTree(root.right)
    return root
};

// 46
var permute = function(nums) {
    var backtrack = function(res, path, nums){
        if(nums.length === 0){
            res.push(path)
        }
        for(var i = 0; i < nums.length; i++){
            backtrack(res, path.concat([nums[i]]), nums.slice(0,i).concat(nums.slice(i+1,nums.length)))
        }

    }
    var res = []
    backtrack(res,[],nums)
    return res
};

// 104
var maxDepth = function(root) {
    if(root === null){
        return 0
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};

// 94
var inorderTraversal2 = function(root) {
    var inorder = function(res, root){
        if(root !== null){
            if(root.left){
                inorder(res,root.left)
            }
            res.push(root.val)
            if(root.right){
                inorder(res,root.right)
            }
        }
    }
    var res = []
    inorder(res, root)
    return res
};

var inorderTraversal = function(root) {
    const printArr = []
    if (!root) return printArr
    const stack = []
    stack.push({
      color: 'white',
      node: root
    })
  
    while (stack.length > 0) {
      const pickValue = stack.pop()
      const { color, node } = pickValue
      if (color === 'gray') {
        printArr.push(node.val)
      } else {
        node.right && stack.push({ color: 'white', node: node.right })
        stack.push({ color: 'gray', node })
        node.left && stack.push({ color: 'white', node: node.left })
      }
    }
  
    return printArr
  }
  