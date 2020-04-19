// var inputs = 'welcomebreakcommunication'
// var word1 = inputs.slice(0,7)
// var arr = inputs.slice(7,12)
// var word2 = inputs.slice(12)
// var s = arr.split("")
// for(var i = 0; i<s.length-1; i++){
//     s[i] += ' '
// }
// var s2 = arr.split("")
// for(var i = 0; i<s2.length-1; i++){
//     s2[i] += ' '
// }
// var i = 0
// var j = s.length-2
// console.log(word1 + ' ' + s.join('') + ' ' + word2)
// while(i<s.length-2){
//     s[j] = s[j].substr(0,s[j].length-1)
//     j--
//     console.log(word1 + ' ' + s.join('') + ' ' + word2)
//     s2[i] = s2[i].substr(0,s2[i].length-1)
//     i++
//     console.log(word1 + ' ' + s2.join('') + ' ' + word2)
// }
// console.log(word1 + ' ' + 'break' + ' ' + word2)

// var res = {er:'2',ew:'3'}
// var result = Object.keys(res).sort((a,b)=>res[b]-res[a])
// console.log(result.join(' '))

// 全排列
// let a = [1,2,3,4]
// function permute(a){
//     let res = []
//     dfs(a,[],res)
//     return res
// }
// function dfs(nums,path,res){
//     if(nums.length === 0){
//         res.push(path)
//     }
//     for(let i = 0; i < nums.length; i++){
//         dfs(nums.slice(0,i).concat(nums.slice(i+1)), path.concat([nums[i]]) , res)
//     }
// }
// let b = permute(a)
// console.log(b)
// var a = [1,2,3,4]
// var permute = function(nums) {
//     let results = [];
  
//     function permutations(current, remaining){
//       if(remaining.length <= 0){
//           results.push(current)
//       }
//       else {
//         for(let i = 0; i < remaining.length; i++) { // Loop through remaining elements
//           current.push(remaining[i]); // Insert the iTH element onto the end of current
//           permutations(current.slice(), remaining.slice(0, i).concat(remaining.slice(i+1))); // Recurse with inserted element removed
//           current.pop(); // Remove last inserted element for next iteration
//         }
//       }
//     };
  
//     permutations([], nums);
//     return results;
//   };
// var b = permute(a)
// console.log(b)


// for(var i = 0; i < 5; i++){
//     (function(i){
//         setTimeout(function(){
//             console.log(i)
//         }, i*1000);
//     })(i)
// }
// for(let i = 0; i < 5; i++){
//     setTimeout(function(){
//         console.log(i)
//         }, i*1000);
// }
// var lengg = function(s){
//     var dic = []
//     var tmp = 0
//     var max_len = 0
//     for(var i = 0; i < s.length; i++){
//         if(dic.indexOf(s[i]) === -1){
//             dic.push(s[i])
//             tmp += 1
//         }else {
//             var index = dic.indexOf(s[i])
//             dic = dic.slice(index+1)
//             dic.push(s[i])
//             tmp = dic.length
//         }
//         if(tmp > max_len){
//             max_len = tmp
//         }
//     }
//     console.log(max_len)
// }
// lengg("aabaab!bb")
// var twoSum = function(nums, target) {
//     var dic = []
//     for(let i of nums){
//         var m = target - i
//         if(dic.indexOf(m) !== -1){
//             return[m,i]
//         } else{
//             dic.push(i)
//         }
//     }
// };
// var a = twoSum([2,7,11,15],9)
// console.log(a)

// var spiralOrder = function(matrix) {
//     if(matrix.length === 0){
//         return []
//     }
//     var res = []
//     var l = 0
//     var r = matrix[0].length - 1
//     var t = 0
//     var b = matrix.length - 1
//     while(true){
//         for(let i = l; i <= r; i++){
//             res.push(matrix[t][i])
//         }
//         t += 1
//         if(t > b){
//             break
//         }
//         for(let i = t; i <= b; i++){
//             res.push(matrix[i][r])
//         }
//         r -= 1
//         if(l > r){
//             break
//         }
//         for(let i = r; i > l-1; i--){
//             res.push(matrix[b][i])
//         }
//         b -= 1
//         if(t > b){
//             break
//         }
//         for(let i = b; i > t - 1; i--){
//             res.push(matrix[i][l])
//         }
//         l += 1
//         if(l > r){
//             break
//         }
// //     }

// //     return res
// // };

// // var matrix = []
// // console.log(spiralOrder(matrix))
// function build(preorder, inorder){
//     if (!preorder.length || !inorder.length) return null
//     let root = preorder[0]; // 前序遍历的第一个元素为根节点
//     let node = new TreeNode(root); // 确定根节点

//     let i = inorder.indexOf(root); // 获取根节点在中序遍历中的位置(用于分割左右子树)

//     // 递归
//     node.left = build(preorder.slice(1, i + 1), inorder.slice(0, i));
//     node.right = build(preorder.slice(i + 1), inorder.slice(i + 1));
//     return node
// }

// var preorder = [3,9,20,15,7]
// var inorder = [9,3,15,20,7]
// console.log(build(preorder, inorder))

// var lastRemaining = function(n, m) {
//     var res = []
//     for(var i = 0; i < n; i++){
//         res.push(i)
//     }
//     while(true){
//         var index = m % res.length - 1
//         res.splice(index, 1)
//         if(res.length === 1){
//             break
//         }
//     }
//     return res[0]
// };


// var validWordAbbreviation = function(word, abbr) {
//     var wordLen = word.length;
//     var abbrLen = 0, num = 0;
//     var flag = 1;
//     debugger
//     [...abbr].forEach((value) => {
//         // 如果是字母
//         if (value >= 'a' && value <= 'z') {
//             abbrLen += num + 1;
//             num = 0;
//             if (abbrLen > wordLen || value != word[abbrLen-1]) {
//                 flag = 0;
//             }
//         }
//         // 如果是数字
//         else {
//             if (num == 0 && value == '0') {
//                 flag = 0;
//             }
//             num = num * 10 + (value - '0');
//         }
//     })
//     return flag && abbrLen + num == wordLen;
// };
// var s = "internationalization"
// var abbr = "i12iz4n"
// console.log(validWordAbbreviation(s, abbr))

// var a = [2,0]

// function find(heights){
    // heights.unshift(0)
    // heights.push(0)
    // var stack = []
    // var res = 0
    // for(var i = 0; i < heights.length; i++){
    //     while(stack && heights[stack[stack.length - 1]] > heights[i]){
    //         var temp = stack.pop()
    //         var right = i
    //         var left = stack[stack.length - 1]
    //         res = Math.max(res, (right - left -1) * heights[temp])
    //         console.log(res)
    //     }
    //     stack.push(i)
    // }
    // return res
// }
// console.log(find(a))

// 用stack来存索引，维护一个单调递增的栈，如果新元素比栈顶小，栈顶就是那个中心点，左边就是栈顶左边，右边就是现在的值，右-左
// [2,3,1,1,4]
// [3,2,1,0,4]
// let maxDistance = 0;
// const len = nums.length;
// for(let i = 0; i < len; i ++) {
//     if(nums[i] === 0 && maxDistance <= i) break;//如果当前位置值为0，且当前能到达的最远距离还小于等于这个位置，那么它已经走不到后面了，直接退出循环就好了
//     if(i + nums[i] > maxDistance) maxDistance = i + nums[i];
// }
// return maxDistance >= len- 1;

// var canJump = function(nums) {
//     var res = 0
//     for(var i = 0; i < nums.length; i++){
//         res = Math.max(res, nums[i] + i)
//     }
//     console.log(res)
//     return res >= nums.length-1
// };
// console.log(canJump([2,3,1,1,4]))

// var a = "aaaaaaa"
// var b = ["aaaa","aaa"]
// function sole(a,b){
//     if(a.length === 1){
//         if(b.indexOf(a) !== -1){
//             return true
//         }
//         return false
//     }
//     var length = a.length
//     for(var i = 0; i < length; i++){
//         var tmp = a.slice(0,i)
//         if (b.indexOf(tmp) !== -1){
//             a = a.substr(i)
//             i = 0
//         }
//     }
//     console.log(a)
// }
// sole(a,b)
// // sole(c,d)
// var wordBreak = function(s, wordDict) {
//     let dp = new Array(s.length+1).fill(false);
//     let set = new Set(wordDict);
//     dp[0] = true;
//     for(let i = 1; i <= s.length; i++) {
//         for(let j = 0; j < i; j++) {
//             if(dp[j] && set.has(s.substring(j,i))) {
//                 dp[i] = true;
//                 break;
//             }
//         }
//     }
//     return dp[s.length]
// };

// n=len(s)
// dp=[False]*(n+1)
// dp[0]=True
// for i in range(n):
//     for j in range(i+1,n+1):
//         if(dp[i] and (s[i:j] in wordDict)):
//             dp[j]=True
// return dp[-1]

// var rob = function(nums) {
//     var n = nums.length
//     var a = 0
//     var b = 0
//     for(var i = n-1; i >= 0; i--){
//         c = Math.max(a, nums[i] + b);
//         b = a
//         a = c
//     }
//     return c
// }
// console.log(rob([1,2,3,1]))

// var flatten = function(root) {
//     if(!root) return null
//     const stack = []
//     while(root.left || root.right || stack.length>0){
//         if(root.right) stack.push(root.right)
//         if(root.left){
//             root.right = root.left
//             root.left = null
//         }else{
//             root.right = stack.pop()
//         }
//         root = root.right
//     }
// };

// 有右子树，push右子树，有左子树，赋值到右子树，删掉左子树，没有左子树，等于pop，根节点移动

// var stack = []
// if(!root){
//     return null
// }
// while(root.left || root.right || stack){
//     if(root.right){
//         stack.push(root.right)
//     }
//     if(root.left){
//         root.right = root.left
//         root.left = null
//     }else{
//         root.right = stack.pop()
//     }
//     root = root.right
// }

// var rotate = function(matrix) {
//     matrix.reverse()
//     debugger
//     for(var i = 0; i < matrix.length; i++){
//         for(var j = i+1; j < matrix[0].length; j++){
//             var temp = matrix[i][j]
//             matrix[i][j] = matrix[j][i]
//             matrix[j][i] = temp
//         }
//     }
// };
// const toChineseNum = (num) => {
//     // TODO
//     let arr = num.toString().split('').reverse(),
//         newArr = [];
//     let dic = ['零','一','二','三','四','五','六','七','八','九'],
//         unit = ['','十','百','千','万','十','百','千'];
//     console.log(arr)
//     arr.forEach((item,index) => {
//       if(item == 0 ){
//          if(index == 4)newArr.unshift('万');
//          else if(index > 0 && newArr[0] != '零' && newArr[0] != '万'){
//            newArr.length && newArr.unshift('零');
//          }
//       }
//       else newArr.unshift(dic[item] + unit[index])
//     })
//     return newArr.join('')
//   }
// rotate([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
//   ])

// function reduces(arr, callback, initial) {
//     let i = 0;
//     let acc = initial === undefined ? arr[i++] : initial;
//     for (; i < arr.length; i++) {
//         acc = callback(acc, arr[i], i, arr);
//     }
//     return acc;
// }

// var a = [1,2,3]


// const toChineseNum = (num) => {
//     var arr = num.toString().split('').reverse()
//     console.log(arr)
//     var number = ['零','一','二','三','四','五','六','七','八','九']
//     var unit = ['','十','百','千','万','十','百','千'];
//     var res = []
//     arr.forEach((item, index) => {
//         if(item !== '0'){
//             var temp = number[item] + unit[index]
//             res.push(temp)
//         }else{
//             if(index > 0 && res[0] != '零' && res[0] != '万'){
//                 res.length && res.push('零');
//             }
//             if(index === 4){
//                 res.push('万')
//             }
//         }
//     })
//     return res.reverse().join('')
// }

// console.log(toChineseNum(120000))


// const safeGet = (data, path) => {
//     /* TODO */
//     var paths = path.split(".")
//     var result = data
//     while(paths.length){
//         var temp = paths.shift()
//         result = result[temp]
//         if(!result){
//             return undefined
//         }
//     }
//     return result
// }

// var data = { a: { b: { c: 'ScriptOJ' } } }

// console.log(safeGet(data, 'a.b.c')) // => scriptoj
// safeGet(data, 'a.b.c.d') // => 返回 undefined
// safeGet(data, 'a.b.c.d.e.f.g') // => 返回 undefined

// const partition3way = (arr) =>{
//     var start = 0
//     var end = arr.length - 1
//     var  i = 0 
//     var pivot = arr[0]
//     var swap = (a, i, j) => [a[i],a[j]] = [a[j],a[i]]
//     while(i <= end){
//         if(arr[i] < pivot){
//             swap(arr, start++, i++)
//         }
//         else if(arr[i] > pivot){
//             swap(arr, i, end--)
//         }else{
//             i++
//         }
//     }
// }
// const arr = [3, 1, 3, 6, 2, 3, 4, 5]
// partition3way(arr)
// console.log(arr)

function partition(arr){
    var start = 0
    var end = arr.length - 1
    var pivot = arr[0]
    while(start < end){
        while(arr[end] > pivot && start < end){
            end--
        }
        arr[start] = arr[end]
        while(arr[start] < pivot && start < end){
            start++
        }
        arr[end] = arr[start]
    }
    arr[start] = pivot
    return start
}

const arr = [3, 1, 6, 2, 4, 5]
partition(arr)
console.log(arr) // => [2, 1, 3, 6, 4, 5]