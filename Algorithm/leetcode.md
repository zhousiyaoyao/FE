# 目录
* [78子集](#78子集)
* [617合并二叉树](#617合并二叉树)
* [22括号生成](#22括号生成)
* [338比特位计数](#338比特位计数)
* [226翻转二叉树](#226翻转二叉树)
* [46全排列](#46全排列)
* [104二叉树深度](#104二叉树深度)
* [94二叉树中序遍历](#94二叉树中序遍历)
* [39组合总和](#39组合总和)
* [206反转链表](#206反转链表)
* [114二叉树展开为链表](#114二叉树展开为链表)
* [48旋转图像](#48旋转图像)
* [238除自身以外数组的乘积](#238除自身以外数组的乘积)
* [136只出现一次的数字](#136只出现一次的数字)
* [64最小路径和](#64最小路径和)
* [96不同的二叉搜索树](#96不同的二叉搜索树)
* [105从前序与中序遍历序列构造二叉树](#105从前序与中序遍历序列构造二叉树)
* [148排序链表](#148排序链表)
* [406根据身高重建队列](#406根据身高重建队列)
* [287寻找重复数](#287寻找重复数)
* [11盛最多水的容器](#11盛最多水的容器)
* [169多数元素](#169多数元素)
* [215数组中的第K个最大元素](#215数组中的第K个最大元素)
* [101对称二叉树](#101对称二叉树)
* [42接雨水](#42接雨水)
* [53最大子序和](#53最大子序和)
* [142环形链表二](#142环形链表二)
* [394字符串解码](#394字符串解码)
* [543二叉树的直径](#543二叉树的直径)
* [70爬楼梯](#70爬楼梯)
* [1两数之和](#1两数之和)
* [141环形链表](#141环形链表)
* [146LRU缓存机制](#146LRU缓存机制)
* [85最大矩形](#85最大矩形)
* [139单词拆分](#139单词拆分)
* [198打家劫舍](#198打家劫舍)
* [494目标和](#494目标和)
* [438找到字符串中所有字母异位词](#438找到字符串中所有字母异位词)
* [56合并区间](#56合并区间)
* [234回文链表](#234回文链表)
* [20有效的括号](#20有效的括号)
* [124二叉树中最大路径和](#124二叉树中最大路径和)
* [55跳跃游戏](#55跳跃游戏)
* [34在排序数组中查找元素的第一个和最后一个位置](#34在排序数组中查找元素的第一个和最后一个位置)
* [84柱状图中最大的矩形](#84柱状图中最大的矩形)
* [322零钱兑换](#322零钱兑换)
* [19删除链表的倒数第N个节点](#删除链表的倒数第N个节点)
* [2删除链表的倒数第N个节点](#删除链表的倒数第N个节点)
* [33搜索旋转排序数组](#33搜索旋转排序数组)
* [76最小覆盖子串](#76最小覆盖子串)
* [581最短无序连续子数组](#581最短无序连续子数组)
* [3无重复字符的最长子串](#3无重复字符的最长子串)
* [31下一个排列](#31下一个排列)
* [5最长回文子串](#5最长回文子串)
* [15三数之和](#15三数之和)
### 78子集
问题：求一个数组的所有子集，包括空集。
题解：回溯，关键点在于，for循环的时候，把i+1传给index，这样下一次递归，会从下一个元素开始。且终止条件在for循环里面
[1,2,3] =>
空
1
   1，2  
      1，2，3
   1，3
2
   2，3
3
```javascript
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
```
### 617合并二叉树
问题：合并两个二叉树，都有节点的节点值相加，没有的加上节点
题解：碰到二叉树题，基本就是递归，先写终止条件，再算题目要求，左一下右一下再return
```javascript
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
```
### 22括号生成
问题：给一个数n，生成n对有效的括号合集
题解：回溯，传入左括号和右括号个数，每次加括号对应个数减1，终止条件为左括号和右括号为0，不合规的情况要判断
```javascript
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
```
### 338比特位计数
题目：给一个num，求0-num的数字包括多少个二进制1的数组
题解：奇数的1的个数为前一个数加1，偶数的1的个数为n/2的那个数的1的个数
```javascript
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

```
### 226翻转二叉树
题目：如题，Max Howell翻车现场
题解：root的左右互换，然后左一下右一下，root为null就return
```javascript
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
```
### 46全排列
题目：求一个数组的全排列
题解：回溯，for循环，每次原始数组要删除当前的元素，删完之后再push
```javascript
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
```
### 104二叉树深度
题目：如题
题解：递归
```javascript
var maxDepth = function(root) {
    if(root === null){
        return 0
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
```
### 94二叉树中序遍历
题目：如题
题解：三色球法BFS, 白色表示未遍历，灰色表示已经遍历，同样stack先放入根元素，while栈，灰色就打印，白色加入栈（左中右看情况）
```javascript
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
```
### 39组合总和
题目：candidates = [2,3,6,7], target = 7， 输出加起来为7的数组，可以重复
题解：回溯, for循环，每次i都是从0开始，且数组要截取i之后，
```javascript
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
```
### 206反转链表
题目：如题
题解：暂存cur的下一个节点，cur指向创建的pre，pre往前一个，cur往前一个，循环
```javascript
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
```
### 114二叉树展开为链表
题目：如题
题解：while一个空stack，如果有右边，把右边先存到栈里，如果有左边，把左边复制到右边，左边剪枝，没有左边，就把右边pop出来，根节点往右边移动一格循环
```javascript
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
```

### 48旋转图像
题目：把二维数组顺时针旋转90度
题解：先把数组reverse，再对角线对称一下
```javascript
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
```

### 238除自身以外数组的乘积
题目：[1,2,3,4] => [24,12,8,6]
题解：先在原数组上，求出前面元素的总乘积，[1,1,2,6]，再从右到左，求后面元素的总乘积,[24,12,4,1],再和前面数组对应项相乘
```javascript
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
```

### 136只出现一次的数字
题目：找到只出现一次的数字
题解：js trick, lastindexof和indexof对比，相同表示只有一个
```javascript
var singleNumber = function(nums) {
    for (let i = 0; i < nums.length; i++) {
      if (nums.lastIndexOf(nums[i]) === nums.indexOf(nums[i])) return nums[i];
    }
  };
```

### 64最小路径和
题目：二维数组从左上到右下
题解：二维dp，第一row和第一colum先算出总和，里面遍历求最小值
```javascript
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
```

### 96不同的二叉搜索树
题目：给个整数，问有多少种二叉搜索树
题解：dp一维数组，外层循环i表示根节点，内层循环j-1表示j左边，i-j表示j右边，相乘求和表示当前n的所有情况
```javascript
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
```

### 105从前序与中序遍历序列构造二叉树
题目：如题
题解：递归，根节点取前序的第一个，求根节点在中序的位置index，开始左一下右一下，中序数组index左边为左子树，右边为右子树，前序数组1到index为左子树，index右边为右子树
```javascript
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
```

### 148排序链表
题目：把一个链表从小到大排序
题解：归并排序（稳定），先快慢指针，找到链表中点，然后左右递归，得到左右两个已经排序好的链表，new一个新头节点。比较两段链表节点大小，连其中小的那一个。nlogn
```javascript
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
```

### 406根据身高重建队列
题目：[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]] =》 [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
题解：根据第一个数身高从大到小排序，身高相同的话根据第二个数前面的人数从小到大排序，然后根据第二个数前面的人数依次插入到空数组。
```javascript
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
```

### 287寻找重复数
题目：如题
题解：参考快慢指针，intersect为交点，快指针走2步，慢指针走一步得到。然后慢指针和交点往前走，一次一步，相遇就是出口
```javascript
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

    return fast;
}
```

### 11盛最多水的容器
题目：[1,8,6,2,5,4,8,3,7] =》 49
题解：二分法，面积等于左右两边矮的高度乘以坐标的差
```javascript
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
```

### 169多数元素
题目：找到数组的众数
题解：摩尔投票法，一开始有1票，从第二个开始遍历，如果第二个等于第一个，count加一，否则减1，为0时，候选人变成当前元素，最后返回候选人
```javascript
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
```

### 215数组中的第K个最大元素
题目：如题
题解：快速排序
```javascript
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
```
### 101对称二叉树 
题目：对称返回true，否则false
题解：递归，判断左节点右节点，左节点的左右儿子和右节点的右左儿子是否相等
```javascript
var isSymmetric = function(root) {
    if(root === null){
        return true
    }
    return helper(root.right, root.left)
};
var helper = function(t1, t2){
    if(t1 === null && t2 === null){
        return true
    }
    if(t1 === null || t2 === null){
        return false
    }
    return t1.val === t2.val && helper(t1.right,t2.left) && helper(t1.left, t2.right)
}
```

### 42接雨水
题目：[0,1,0,2,1,0,1,3,2,1,2,1] =》 6
题解：二分法，当左边的最高点小于右变最高点时，左边最高减去当前高度为此位置的雨水，反之右边最高减去当前位置的雨水
```javascript
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
```

### 53最大子序和
题目：找到最大子序列数组的最大值
题解：一维dp，每次求舍弃之前和加上之前，哪个更大，然后求最大值
```javascript
var maxSubArray = function(nums) {
    var dp = new Array(nums.length - 1).fill(0)
    dp[0] = nums[0]
    for(var i = 1; i < nums.length; i++){
        dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    }
    return Math.max(...dp)
};
```

### 142环形链表二
题目：找到成环的那个位置
题解：先快慢指针，快2步慢1步找到中点，然后慢指针指到原点，再一次一步相遇的就是环入口
```javascript
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
```

### 394字符串解码
题目：s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
题解：搞个栈放对象，res存括号里的字符串，multi表示这个数的大小，每次遇到数字，multi变，遇到字母，直接res加，遇到左括号，把当前multi和res入栈，然后multi和res初始化，遇到右括号，pop出来，res乘以multi加上res1
```javascript
var decodeString = function(s) {
    var stack = []
    var res = ''
    var multi = 0
    for(var i = 0; i < s.length; i++){
        if(/[0-9]/.test(s[i])){
            multi = multi * 10 + parseInt(s[i])
        }else if(s[i] === '['){
            stack.push({multi1: multi, res1: res})
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
```

### 543二叉树的直径
题目：求二叉树结点的最
题解：左子树最大深度加上右子树最大深度的最大值
```javascript
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
```

### 70爬楼梯
题目：如题
题解：动态规划
```javascript
var climbStairs = function(n) {
    var dp = new Array(n)
    dp[0] = 1
    dp[1] = 2
    for(var i = 2; i < n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n-1]
};
```

### 1两数之和
题目：如题
题解：哈希表
```javascript
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
```

### 141环形链表
题目：看一个链表有没有环
题解：快慢指针
```javascript
var hasCycle = function(head) {
    var fast = head
    var slow = head
    while(fast != null && fast.next != null){
        fast = fast.next.next
        slow = slow.next
        if( fast === slow){
            return true
        }
    }
    return false
};
```

### 146LRU缓存机制
题目：如题
题解：用map，get先删再set然后return，put有的话先删，没有的话或者超过最大值，移除最近没用的next()，再set
```javascript
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
```

### 85最大矩形
题目：二进制矩阵中最大矩形
题解：每一行求当前的高度数组，然后求其最大值，使用最小栈法，维护一个栈，为单调自增，当前遍历元素大于栈头元素时，入栈，小于的时候弹出得到当前index，所以left为现在的栈头，right为当前的index，right-left-1乘以当前高度为此时面积
```javascript
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
```

### 139单词拆分
题目：s = "applepenapple", wordDict = ["apple", "pen"] 返回true
题解：如注释
```javascript
var wordBreak = function(s, wordDict) {
    // dp[i]表示0-i之间的字符串是否可以被拆分并满足题设条件存在于wordDict中
    let dp = new Array(s.length).fill(false);
    let set = new Set(wordDict);
    for (let i = 0; i < s.length; i++) {
        // 检查0-i之间的字符串是否直接存在于wordDict中
        if (set.has(s.substring(0, i+1))) {
            dp[i] = true;
            continue;
        }
        // 这一步是为了检查。假如s.substring(0,i)不直接存在于wordDict中
        // 那么判断拆分之后是否存在于wordDict中
        for (let j = 0; j < i; j++) {
            if (dp[j] && set.has(s.substring(j+1, i+1))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length-1]
};
```

### 198打家劫舍
题目：[1,2,3,1] => 4
题解：
```javascript
var rob = function(nums) {
    const len = nums.length;
    if(len == 0)
        return 0;
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for(let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1]);
    }
    return dp[len];
};
```

### 494目标和
题目：nums: [1, 1, 1, 1, 1], S: 3
题解：回溯法
```javascript
var findTargetSumWays = function(nums, S) {
    return helper(nums, 0, S)
};
function helper(nums, start, target){
    if(start === nums.length){
        return target === 0 ? 1 : 0
    }
    return helper(nums, start+1, target + nums[start])
    + helper(nums, start+1, target - nums[start])
}
```

### 438找到字符串中所有字母异位词
题目：s: "cbaebabacd" p: "abc" =》[0,6]
题解：滑动窗口法,自己领会
```javascript
var findAnagrams = function(s, p) {
    var res = []
    var left = 0, right = 0;
    var window = {}
    var needle = {}
    for(var i = 0; i < p.length; i++){
        needle[p[i]] ? needle[p[i]]++ : needle[p[i]] = 1
    }
    var match = 0
    var needle_length = Object.keys(needle).length
    while(right < s.length){
        var c1 = s[right]
        if(c1 in needle){
            window[c1] ? window[c1]++ : window[c1] = 1
            if(window[c1] === needle[c1]){
                match++
            }
        }
        right++
        while(match === needle_length){
            if(right - left === p.length){
                res.push(left)
            }
            var c2 = s[left]
            if(c2 in needle){
                window[c2]--
                if(window[c2] < needle[c2]){
                    match--
                }
            }
            left++
        }
    }
    return res
};
```

### 56合并区间
题目：[[1,3],[2,6],[8,10],[15,18]] => [[1,6],[8,10],[15,18]]
题解：先按照第一个数排序，res加入第一个数组，从第二个数组开始遍历，如果res最后一个数组的第二个数大于当前遍历数组的第一个数，合并，res数组的最后一个数变成两个数组中，最后一位大的那个。否则就直接加入res
```javascript
var merge = function(intervals) {
    if(intervals.length === 0){
        return []
    }
    intervals.sort((a,b) => {
        return a[0] - b[0]
    })
    var res = [intervals[0]]
    for(var i = 1; i < intervals.length; i++){
        if(res[res.length-1][1] >= intervals[i][0]){
            res[res.length-1][1] = Math.max(res[res.length-1][1], intervals[i][1])
        }else{
            res.push(intervals[i])
        }
    }
    return res
};
```

### 234回文链表
题目：1->2->2->1 => true
题解：先快慢指针找中点，然后反转第一段链表，偶数情况直接对比，奇数情况pre往前一个，再对比
```javascript
var isPalindrome = function(head) {
    if(!head || head.next === null){
        return true
    }
    var dummy = new ListNode(0)
    dummy.next = head
    var fast = dummy
    var slow = dummy
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    var head2 = slow.next
    slow.next = null
    var cur = head
    var pre = null
    while(cur){
        var temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    if(!fast){
        pre = pre.next
    }
    while(pre){
        if(pre.val !== head2.val){
            return false
        }
        pre = pre.next
        head2 = head2.next
    }
    return true
};
```

### 20有效的括号
题目："()[]{}" = 》 true
题解：维护一个dic，一个栈，遍历s，如果当前元素是左，进栈，是右，出栈，如果对应括号不同，false，如果stack为空，说明可以
```javascript
var isValid = function(s) {
    if(s.length === 1){
        return false
    }
	var dic = {'(':')', '{':'}', '[': ']'}
	var left = Object.keys(dic)
	var right = Object.values(dic)
	var stack = []
    for(var i = 0; i < s.length; i++){
        if(left.indexOf(s[i]) !== -1){
            stack.push(s[i])
        }
        if(right.indexOf(s[i]) !== -1){
            var temp = stack.pop()
            if(dic[temp] !== s[i]){
                return false
            }
        }
    }
	if(stack.length !== 0){
		return false
	}else{
		return true
	}
};
```

### 124二叉树中最大路径和
题目：[-10,9,20,null,null,15,7] =》 42
题解：res初始化为负无穷，因为存在负数，left递归left求左边最大枝，right递归right求右边最大枝，res为left+right+node.value的最大值，
```javascript
var maxPathSum = function(root) {
    var res = -Infinity
    var helper = function(node){
        if(node === null){
            return 0
        }
        var left = Math.max(0, helper(node.left))
        var right = Math.max(0, helper(node.right))
        res = Math.max(res, left + right + node.val)
        return Math.max(left, right) + node.val
    }
    helper(root)
    return res
};
```

### 55跳跃游戏
题目：[3,2,1,0,4] => false
题解：贪心算法，求能跳出的最远值，不小于nums的长度就可以。当当前值为0且res不大于当前index，表示不能往后跳了，直接出去判断
```javascript
var canJump = function(nums) {
    var res = 0
    for(var i = 0; i < nums.length; i++){
        if(nums[i] === 0 && res <= i){
            break
        }
        res = Math.max(res, nums[i] + i)
    }
    return res >= nums.length-1
};
```

### 34在排序数组中查找元素的第一个和最后一个位置
题目：如题
题解：两次二分法，一次左分界版，一次右分界版
```javascript
var searchRange = function(nums, target) {
    var res = [-1, -1]
    var left = 0
    var right = nums.length
    var flag = false
    while(left < right){
        var mid = left + Math.floor((right - left) / 2)
        if(nums[mid] === target){
            right = mid
            flag = true
        }else if(nums[mid] < target){
            left = mid + 1
        }else if(nums[mid] > target){
            right = mid
        }
    }
    if(flag){
        res[0] = left
    }
    var left2 = 0
    var right2 = nums.length
    var flag2 = false
    while(left2 < right2){
        var mid2 = left2 + Math.floor((right2 - left2) / 2)
        if(nums[mid2] === target){
            left2 = mid2 + 1
            flag2 = true
        }else if(nums[mid2] < target){
            left2 = mid2 + 1
        }else if(nums[mid2] > target){
            right2 = mid2
        }
    }
    if(flag2){
        res[1] = left2 - 1
    }
    return res
};
```

### 84柱状图中最大的矩形
题目：如题
题解：单调栈法
```javascript
var largestRectangleArea = function(heights) {
    var res = 0
    heights.push(0)
    heights.unshift(0)
    var stack = []
    for(var i = 0; i < heights.length; i++){
        while(stack && heights[stack[stack.length-1]] > heights[i]){
            var temp = stack.pop()
            var right = i
            var left = stack[stack.length - 1]
            res = Math.max(res, (right - left - 1) * heights[temp])
        }
        stack.push(i)
    }
    return res
};
```

### 322零钱兑换
```javascript
var coinChange = function(coins, amount) {
    var dp = new Array(amount+1).fill(amount+1)
    dp[0] = 0
    for(var i = 0; i < dp.length; i++){
        for(var j = 0; j < coins.length; j++){
            if(i - coins[j] < 0){
                continue
            }
            dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
        }
    }
    return (dp[amount] === amount + 1) ? -1 : dp[amount];
};
```

### 19删除链表的倒数第N个节点
```javascript
var removeNthFromEnd = function(head, n) {
    var dummy = new ListNode(0)
    dummy.next = head
    var fast = dummy
    var slow = dummy
    for(var i = 0; i < n+1; i++){
        fast = fast.next
    }
    while(fast !== null && fast !==null){
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummy.next
};
```

### 2删除链表的倒数第N个节点
```javascript
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0)
    var head = dummy
    var n = 0
    while(l1 || l2){
        var val1
        var val2
        if(l1){
            val1 = l1.val
            l1 = l1.next
        }else{
            val1 = 0
        }
        if(l2){
            val2 = l2.val
            l2 = l2.next
        }else{
            val2 = 0
        }
        var sum = val1 + val2 + n
        var temp = new ListNode(sum % 10)
        head.next = temp
        head = head.next
        n = parseInt(sum/10)
    }
    if(n > 0){
        head.next = new ListNode(n)
    }
    return dummy.next
};
```

### 33搜索旋转排序数组
```javascript
var search = function(nums, target) {
    var l = 0
	var r = nums.length - 1
    while(l <= r){
        var mid = Math.floor((r + l)/2)
        if(nums[mid] === target){
            return mid
        }else if(nums[l] <= nums[mid]){
            if(nums[l] <= target && target <= nums[mid]){
                r = mid - 1
            }else{
                l = mid + 1
            }
        }else{
            if(nums[mid] <= target && target <= nums[r]){
                l = mid + 1
            }else{
                r = mid - 1
            }
        }
	}
    return -1
};
```

### 76最小覆盖子串
```javascript
var minWindow = function(s, t) {
    var left = 0
    var right = 0
    var min_len = Infinity
    var window = {}
    var needle = {}
    var match = 0
    var start = 0
    for(var i = 0; i < t.length; i++){
        needle[t[i]] ? needle[t[i]]++ : needle[t[i]] = 1
    }
    while (right < s.length){
        if (s[right] in needle){
            window[s[right]] ? window[s[right]]++ : window[s[right]] = 1
            if(window[s[right]] === needle[s[right]]){
                match++
            }
        }
        right++
        while(match === Object.keys(needle).length){
            if (right - left < min_len){
                start = left
                min_len = right - left
            }
            if (s[left] in needle){
                window[s[left]]--
                if(window[s[left]] < needle[s[left]]){
                    match --
                }
            }
            left++
        }
    }
    return min_len === Infinity ? "" : s.substr(start, min_len)
};
```

### 581最短无序连续子数组
```javascript
var findUnsortedSubarray = function(nums) {
    var arr = [...nums]
    nums.sort((a,b) => {
        return a - b
    })
    var left = 0, i = 0
    var right = nums.length - 1, j = nums.length - 1
    while(i < nums.length){
        if(nums[i] !== arr[i]){
            left = i
            break
        }
        i++
    }
    while(j > 0){
        if(nums[j] !== arr[j]){
            right = j
            break
        }
        j--
    }
    return i === nums.length ? 0 : right - left + 1
};
```

### 3无重复字符的最长子串
```javascript
var lengthOfLongestSubstring = function(s) {
    var left = 0
    var right = 0
    var window = {}
    var res = 0
    while (right < s.length){
        var c1 = s[right]
        window[c1] ? window[c1]++ : window[c1] = 1
        right++
        while(window[c1] > 1){
            var c2 = s[left]
            window[c2]--
            left++
        }
        res = Math.max(res, right - left)
    }
    return res
};
```

### 31下一个排列
```javascript
var nextPermutation = function(nums) {
    var i = nums.length - 1
    var j = nums.length - 1
    while(i > 0 && nums[i-1] >= nums[i]){
        i--
    }
    if(i === 0){
        nums.reverse()
        return nums
    }
    var k = i - 1
    while(nums[j] <= nums[k]){
        j--
    }
    var temp = nums[k]
    nums[k] = nums[j]
    nums[j] = temp
    var left = k + 1
    var right = nums.length - 1
    while(left < right){
        var tmp = nums[left]
        nums[left] = nums[right]
        nums[right] = tmp
        left++
        right--
    }
};
```

### 5最长回文子串
```javascript
var longestPalindrome = function(s) {
    var helper = function(s, start, end){
        while(start >= 0 && end < s.length && s[start] === s[end]){
            start--
            end++
        }
        return s.slice(start+1,end)
    }
    var res = ''
    if(s.length === 1){
        return s
    }
    for(var i = 0; i < s.length-1; i++){
        var temp = helper(s, i, i)
        if(res.length < temp.length){
            res = temp
        }
        var temp = helper(s, i, i+1)
        if(res.length < temp.length){
            res = temp
        }
    }
    return res
};
```

### 15三数之和

```javascript
var threeSum = function(nums) {
    var n = nums.length
    var res = []
    if(nums.length === 0 || n<3){
        return []
    }
    nums.sort((a,b) => (a-b))
    for(var i = 0; i < n; i++){
        if(nums[i]>0)
            return res
        if(i>0 && nums[i]==nums[i-1])
            continue
        var L = i+1
        var R = n-1
        while(L<R){
        if(nums[i]+nums[L]+nums[R]==0){
            res.push([nums[i],nums[L],nums[R]])
            while(L<R && nums[L]==nums[L+1])
                L=L+1
            while(L<R && nums[R]==nums[R-1])
                R=R-1
            L=L+1
            R=R-1
        }else if(nums[i]+nums[L]+nums[R]>0)
            R=R-1
        else{
            L=L+1
        }
        }
    }
    return res
};
```