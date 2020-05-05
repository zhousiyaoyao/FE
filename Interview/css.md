不知道的
!important表示覆盖其他声明，优先级最高，但最好不要用
Rem和em
Rem是根em，跟根元素相关联，1em等于16px, 浏览器默认值
项目开始，声明一个基础的字号大小，再用绝对值去描述大小 :root {font-size: 0.875em}
对font-size用rem，对border用px，padding，margin，border-radius用em，容器宽度百分比
媒体查询
@media，声明样式，在不同的屏幕尺寸下触发响应的样式，响应式的关键要素
Flex布局
Text-align和verticle-align只能用于行内元素，对块级元素的布局无效
css时代之前，排版都是通过table，所以可以使用align，valign
四种布局方式：标准文档流，浮动布局，定位布局，flex布局。
水平居中可以使用margin：0 auto
水平居中同时垂直可以用
.dad{ position: relative}  .son{ position: absolute;width: 100px; height: 100px; margin: auto; top,right,bottom,left:0}  或者
.dad{ position: relative}  .son{ width: 100px; height: 100px; position: absolute; top,left: 50%; margin-top: -50px; margin-left: -50px}
这样的写法缺点是缺少语义且不够灵活，我们需要一个属性就能实现子元素居中或者均匀分布，甚至可以随窗口缩放自动适应。于是有了flex
Flex首先要设置父容器display: flex, 然后设置justify-content: center实现水平居中，最后设置align-items: center实现垂直居中
基本概念，容器，外层父容器和内层子容器，轴，包括主轴和交叉轴。

Justify-content属性用于定义如何沿着主轴方向排列子容器，也就是左右

justify-content： flex-start起始端对齐 flex-end末尾段对齐 center居中对齐 space-around子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间隔的一半 space-between子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切
Align-items属性用于定义如何沿着交叉轴方向分配子容器的间距，也就是上下
子容器设置align-self，如果父也设置了align-items，以子元素为主
Flex-direction确定主轴的方向，交叉轴与主轴垂直，row表示一行，column表示上下
Flex-wrap换行，换顺序
Flex-basis子元素尺寸



flex-start 上对齐，end下对齐，center居中对齐，baseline基线对齐，stretch拉伸子容器