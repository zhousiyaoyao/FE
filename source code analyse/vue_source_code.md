# Diff 算法

### 原因
渲染真实DOM的开销很大，修改某个数据，可能会引起整棵树的重绘和重排，diff算法可以只更新修改的那一块

1. 根据DOM树生成虚拟DOM树，JS
2. 某个节点变化，会变成Vnode
3. Vnode和oldVnode对比
4. 调用patch函数，比较新旧节点，然后给真实DOM打补丁

<div>
    <p>123</p>
</div>
变成
var Vnode = {
    tag: 'div',
    Children: [
        {tag: 'p', text: '123'}
    ]
}

1. diff比较新旧节点，只会比较同层
2. 当数据发送改变，set方法调用Dep.notify通知所有watcher，订阅者就会调用patch给真实DOM打补丁
3. 判断isSameNode
4. 不是，新Vnode的换旧Vnode的，return Vnode
5. 是，分4种情况
6. 第一种：老节点有子节点，新节点没有，删除真实dom el的子节点
7. 第二种：老节点没有子节点，新节点有，将Vnode子节点真实化后添加到el
8. 第三种：都只有文本节点，且不相等，将el的文本节点设为vnode的
9. 第四种：都有子节点，执行updateChildren比较子节点

### patch函数
接受新旧两个节点作为参数，先判断sameVnode（key，标签，是否为注释节点，是否定义了data，input标签type是否相同）
不同的话，用新node换老node，获取老node的父元素，根据新vnode生成新元素，把新元素添加进老元素附近，删除老元素
相同的话，执行patchVnode，四种情况同上.

### updateChildren函数
新Vnode -> 子节点Vch -> new startIdx, new endIdx （ns，ne）
旧Vnode -> 子节点oldCh -> old startIdx, old endIdx （os，oe）
4个变量相互比较，4种比较都没有匹配，如果设置了key，就用key比较
比较过程变量会往中间靠拢，一旦startIdx > endIdx，表示两个子节点至少有一个遍历完了，算法结束

### 比较过程（两个指针都是往中间靠拢）
1. 旧头和新头对比，相同直接patchVnode，都+1
2. 旧尾和新尾对比，相同直接patchVnode，都-1
3. 旧头和新尾对比，相同直接patchVnode，旧头插到旧尾后面，旧头+1，新尾-1
4. 旧尾和新头对比，相同直接patchVnode，旧尾插到旧头后面，旧尾-1，新头+1
5. 如果以上都不符合，创建一个哈希表，key为旧的VNode，value为对应index序列，来找到与new node一致的旧节点index，如果找到且满足samenode，会把这个旧节点移到前面。如果找不到或者找到了也不是samenode，会创建一个新的dom节点，createElm
6. 遍历结束，如果新节点没有遍历完，按顺序加入到dom里去，addVnodes，如果老节点没有遍历完，直接删了，removeVnodes

### key的作用
如果存在key，且满足sameVnode，会对改节点进行复用，否则会创建新的节点

### 例子
没有key：
old:  a b c d
new:  b e d c
1. a和b对比，不同
2. d和c对比，不同
3. a和c对比，不同
4. d和b对比，不同
5. 创建一个b在前面
6. 同理创建一个e在前面
7. d匹配成功，d移到abc前面
8. c匹配成功，c移到ab前面
9. 删掉ab，最后结果b e d c (a b)

有key：
old:  a b c d
new:  b e d c
1. b匹配失败，但key找到了b，b移到acd前面
2. e匹配失败，且key没找到，创建e在b后面
3. d匹配成功，d移到ac前面
4. c匹配成功，c移到a前面，a删除
5. 结果是b e d c