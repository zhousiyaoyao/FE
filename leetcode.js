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
