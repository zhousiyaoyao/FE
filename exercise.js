var a = [
    {id: 4, parent_id: null},
    {id: 7, parent_id: 4},
    {id: 2, parent_id: 4},
    {id: 1, parent_id: 7},
    {id: 3, parent_id: 7}
]
function listToTreeWithLevel(list, parent, level) {
    var out = []
    for (var node of list) {  
            if (node.parent_id == parent) {
                node.level = level;
                var children = listToTreeWithLevel(list, node.id, level + 1)
                debugger
                if (children.length) {
                    node.children = children
                }
                out.push(node)
            }
    }
    return out
}

console.log(listToTreeWithLevel(a,null, 0))

// var arr = [{id: 4, pid: '-1'},{id: 7, pid: '4'},{id: 2, pid: '4'},{id: 1, pid: '7'},{id: 3, pid: '7'},{id: 8, pid: '1'}]
// function listToTree(list) {
//     var map = {}, node, tree= [], i;
//     for (i = 0; i < list.length; i ++) {
//         map[list[i].id] = list[i]; 
//         list[i].children = []; 
//     }
//     for (i = 0; i < list.length; i += 1) {
//         node = list[i];
//         if (node.pid !== '-1') {
//             map[node.pid].children.push(node);
//         } else {
//             tree.push(node);
//         }
//     }
//     return tree;
// }

// console.log(listToTree(arr))