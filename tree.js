function TreeNode(val){
    this.val = val
    this.left = null
    this.right = null
}
function arrConvert2BST(arr){
    var len = arr.length
    if(len <= 0){
        return null;
    }
    return BST(arr)
}

function BST(arr){
    if(arr.length <= 0){
        return null
    }else{
        var mid = Math.floor((arr.length)/2);
        var root = new TreeNode(arr[mid],null,null)
        console.log(mid)
        var left = arr.slice(0,mid)
        var right = arr.slice(mid+1)
        root.left = BST(left)
        root.right = BST(right)
        return root
    }
}

function inOrder(node){
    if(!(node===null)){
        inOrder(node.left)
        console.log(node)
        inOrder(node.right)
    }
}

function findLongesUniquePath(root,sum){
    if(root === null){
        return []
    }
    var res = []
    var path = []
    self.dfs(root, sum, path, res)
    return res
}

function dfs(root, sum, path, res){
    if(root.left === null && root.right === null && sum == root.val){
        path.push(root.val)                                                                                                                              
        res.push(path)
    }
    if(root.left){
        dfs(root.left, sum-root.val, path.concat([root.val]), res)
    }
    if(root.right){
        dfs(root.right, sum-root.val, path.concat([root.val]), res)
    }
}

var nodes = [1,2,3,4,5,6]
var root = arrConvert2BST(nodes)
inOrder(root)
console.log(findLongesUniquePath(root,15))

