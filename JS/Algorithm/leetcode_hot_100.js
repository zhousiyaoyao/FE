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

// 39
var combinationSum = function(candidates, target) {
    var helper = function(res, target, path, nums){
        if(target < 0){
            return
        }
        if(target === 0){
            res.push(path)
            return
        }
        for(var i = 0; i < nums.length; i++){
            helper(res, target-nums[i], path.concat([nums[i]]), nums.slice(i))
        }
    }
    var res = []
    helper(res, target, [], candidates)
    return res
};

// 206
var reverseList = function(head) {
    var cur = head
    var pre = null
    while(cur){
        var tmp = cur.next
        cur.next = pre
        pre = cur
        cur = tmp
    }
    return pre
};

// 114
var flatten = function(root) {
    if(!root){
        return null
    }
    var stack = []
    while(stack.length>0|| root.left || root.right){
        if(root.right){
            stack.push(root.right)
        }
        if(root.left){
            root.right = root.left
            root.left = null
        }else{
            root.right = stack.pop()
        }
        root = root.right
    }
};

// 48
var rotate = function(matrix) {
    matrix.reverse()
    for(var i = 0; i < matrix.length; i++){
        for(var j = i+1; j < matrix[0].length; j++){
            var temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
        }
    }
};

// 238
var productExceptSelf = function (nums) {
    let v = 1
    let result=[1]
    for (let i = 1; i < nums.length; i++) {
      v *= nums[i - 1]
      result[i] = v
    }
    v = 1
    for (let i = nums.length - 1; i > 0; i--) {
      v *= nums[i]
      result[i - 1] *= v
    }
    return result
  };

// 136
var singleNumber = function(nums) {
    for (let i = 0; i < nums.length; i++) {
      if (nums.lastIndexOf(nums[i]) === nums.indexOf(nums[i])) return nums[i];
    }
  };
  var singleNumber = function(nums) {
    nums = nums.sort();
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
    }
  };

// 64
var minPathSum = function(grid) {
    var row = grid.length
    var col = grid[0].length
    if(row === 0 || col === 0){
        return 0
    }
    var dp = new Array(row)
    for(var i = 0; i < row; i++){
        var temp = new Array(col)
        dp[i] = temp
    }
    dp[0][0] = grid[0][0]
    for(var i = 1; i < col; i++){
        dp[0][i] = dp[0][i-1] + grid[0][i]
    }
    for(var j = 1; j < row; j++){
        dp[j][0] = dp[j-1][0] + grid[j][0]
    }
    for(var i = 1; i < row; i++){
        for(var j = 1; j < col; j++){
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
        }
    }
    return dp[row-1][col-1]
};

// 96
var numTrees = function(n) {
    // dp[i]表示以1...i为节点组成的二叉搜索树的种类
    var dp = new Array(n+1).fill(0)
    dp[0] = 1
    dp[1] = 1
    for(var i = 2; i < n+1; i++){
        // j表示分别从1为根节点至i为根节点
        for(var j = 1; j < i + 1; j++){
            dp[i] += dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
};

// 105
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0 || inorder.length === 0){
        return null
    }
    var root = new TreeNode(preorder[0])
    var index = inorder.indexOf(preorder[0])
    root.left = buildTree(preorder.slice(1,index+1), inorder.slice(0,index))
    root.right = buildTree(preorder.slice(index+1), inorder.slice(index+1))
    return root
};

// 148
var sortList = function(head) {
    if(!head || !head.next){
        return head
    }
    var slow = head
    var fast = head.next
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    var mid = slow.next
    slow.next = null
    var left = sortList(head)
    var right = sortList(mid)
    var dummy = new ListNode(0)
    var h = dummy
    while(left && right){
        if(left.val < right.val){
            h.next = left
            left = left.next
        }else{
            h.next = right
            right = right.next
        }
        h = h.next
    }
    if(left){
        h.next = left
    }else{
        h.next = right
    }
    return dummy.next
};

// 406
var reconstructQueue = function(people) {
    people.sort((a,b) => {
        return a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]
    })
    var res = []
    for(var i = 0; i < people.length; i++){
        res.splice(people[i][1], 0, people[i])
    }
    return res
};

// 287
var findDuplicate = function(nums) {
    nums.sort((a,b) => a-b)
    for(var i = 0; i < nums.length -1; i++){
        if(nums[i] === nums[i+1]){
            return nums[i]
        }
    }
};

// 287
var findDuplicate = function(nums) {
    let intersect = getIntersect(nums);
    let ptr1 = nums[0];
    let ptr2 = intersect;
    while (ptr2 !== ptr1) {
        ptr1 = nums[ptr1];
        ptr2 = nums[ptr2];
    }

    return ptr2;
};
function getIntersect(nums) {
    let fast = nums[0];
    let slow = nums[0];

    do {
        slow = nums[slow];
        fast = nums[fast];
        fast = nums[fast];
    } while (fast !== slow);
    console.log(fast)
    return fast;
}
findDuplicate([1,3,4,2,2])

// 11 小的高度乘以j-i
var maxArea = function(height) {
    var i = 0
    var j = height.length - 1
    var maxArea = 0
    while(i < j){
        var left = height[i]
        var right = height[j]
        if(left < right){
            var area = left * (j - i)
            i++
        }else{
            var area = right * (j - i)
            j--
        }
        if(area > maxArea){
            maxArea = area
        }
    }
    return maxArea
};

// 169
var majorityElement = function(nums) {
    var count = 1
    var res = nums[0]
    for(var i = 1; i < nums.length; i++){
        if(count === 0){
            res = nums[i]
        }
        if(nums[i] === res){
            count++
        }else{
            count--
        }
    }
    return res
};

// 215
var findKthLargest = function(nums, k) {
    var i = 0
    var j = nums.length-1
    quicksort(i, j, nums)
    return nums[nums.length - k]
};
var quicksort = function(start, end, nums){
    var length = nums.length
    if(!Array.isArray(nums) || start >= end || length <= 1){
        return
    }
    var index = partition(start, end, nums)
    quicksort(start, index-1, nums)
    quicksort(index+1, end, nums)
}
var partition = function(left, right, nums){
    var pivot = nums[left]
    while(left < right){
        while(nums[right] >= pivot && left < right){
            right--
        }
        nums[left] = nums[right]
        while(nums[left] < pivot && left < right){
            left++
        }
        nums[right] = nums[left]
    }
    nums[left] = pivot
    return left
}

// 101
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

// 42 左边和右边中最大值小的一个，减去当前指针的面积
var trap = function(height) {
    var a = 0
    var b = height.length - 1
    var max_area = 0
    var leftmax = 0
    var rightmax = 0
    while(a<=b){
        leftmax = Math.max(leftmax, height[a])
        rightmax = Math.max(rightmax, height[b])
        if(leftmax < rightmax){
            max_area += leftmax - height[a]
            a++
        }else{
            max_area += rightmax - height[b]
            b--
        }
    }
    return max_area
};

// 53
var maxSubArray = function(nums) {
    var dp = new Array(nums.length - 1).fill(0)
    dp[0] = nums[0]
    for(var i = 1; i < nums.length; i++){
        dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    }
    return Math.max(...dp)
};

// 142
var detectCycle = function(head) {
    if(head === null){
        return null
    }
    var fast = head
    var slow = head
    var flag = false
    while(fast != null && fast.next != null){
        fast = fast.next.next
        slow = slow.next
        if(fast === slow){
            flag = true
            break
        }
    }
    if(flag){
        slow = head
        while(slow != fast){
            fast = fast.next
            slow = slow.next
        }
        return slow
    }else{
        return null
    }
};

// 394
var decodeString = function(s) {
    var stack = []
    var res = ''
    var multi = 0
    for(var i = 0; i < s.length; i++){
        if(/[0-9]/.test(s[i])){
            multi = multi * 10 + parseInt(s[i])
        }else if(s[i] === '['){
            stack.push({multi1:multi, res1: res})
            res = ""
            multi = 0
        }else if(s[i] === ']'){
            var value = stack.pop()
            var {multi1, res1} = value
            res = res1 + res.repeat(multi1)
        }else{
            res += s[i]
        }
    }
    return res
};

// 543
var diameterOfBinaryTree = function(root) {
    function helper(root){
        if(root === null){
            return 0
        }
        var left = helper(root.left)
        var right = helper(root.right)
        ans = Math.max(ans, left + right)
        return 1 + Math.max(left, right)
    }
    let ans = 0
    helper(root)
    return ans
};

// 70
var climbStairs = function(n) {
    var dp = new Array(n)
    dp[0] = 1
    dp[1] = 2
    for(var i = 2; i < n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n-1]
};

// 1
var twoSum = function(nums, target) {
    var d = {}
    for(var i = 0; i < nums.length; i++){
        var m = target - nums[i]
        if(m in d){
            return [d[m], i]
        }else{
            d[nums[i]] = i
        }
    }
};

// 141
var twoSum = function(nums, target) {
    var d = {}
    for(var i = 0; i < nums.length; i++){
        var m = target - nums[i]
        if(m in d){
            return [d[m], i]
        }else{
            d[nums[i]] = i
        }
    }
};

// 146
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.capacity = capacity
}

LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        // 存在即更新
        let temp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, temp)
        return temp
    }
    return -1
}

LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        // 存在即更新（删除后加入）
        this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
        // 不存在即加入
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
}

// 85 右边小-左边小乘以其高度
var maximalRectangle = function(matrix) {
    if(matrix.length === 0){
        return 0
    }
    var row = matrix.length
    var col = matrix[0].length
    var maxarea = 0
    var heights = new Array(col).fill(0)
    for(var i = 0; i < row; i++){
        for(var j = 0; j < col; j++){
            if(matrix[i][j] === '1'){
                heights[j] += 1
            }else{
                heights[j] = 0
            }
        }
        console.log(heights)
        maxarea = Math.max(maxarea, find_area(heights))
    }
    return maxarea
};
var find_area = function(heights){
    var arr = JSON.parse(JSON.stringify(heights))
    arr.push(0)
    arr.unshift(0)
    var stack = []
    var res = 0
    for(var i = 0; i < arr.length; i++){
        while(stack && arr[stack[stack.length - 1]] > arr[i]){
            var current = stack.pop()
            var right = i
            var left = stack[stack.length - 1]
            res = Math.max(res, (right - left - 1) * arr[current])
        }
        stack.push(i)
    }
    return res
}

// 139
var wordBreak = function(s, wordDict) {
    var n = s.length
    dp = new Array(n+1).fill(false)
    dp[0] = true
    var dic = new Set(wordDict)
    for(var i = 0; i < s.length; i++){
        for(var j = i+1; j <= s.length; j++){
            if(dp[i] && dic.has(s.substring(i,j))){
                dp[j] = true
            }
        }
    }
    return dp[n]
};