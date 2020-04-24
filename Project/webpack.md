# 构造流程
1. 初始化参数，从配置文件读取合并参数
2. 开始编译，用参数初始化complier对象，加载插件，执行run方法进行编译
3. 根据配置中entry找到所有入口文件
4. 从入口文件出发，调用所有配置的loader对模块进行编译，找到改模块依赖的模块，再递归处理
5. 用loader翻译完所有的文件，得到了最终内容和对应的依赖关系
6. 根据入口和模块的关系，组装成一个个包含多个模块的chunk，每个chunk转化为单独文件加入输出列表，再写入文件系统
7. 

# 工具
### speed-measure-webpack-plugin
测量构建过程中，每个loader和plugin的执行时长

# 优化
### 缓存
cache-loader，把loader的编译结果写入硬盘缓存，再次构建如果文件没有发送变化，会直接拉取缓存
``use: ['cache-loader', ...loaders]``

### 多核
happypack，多进程编译，将任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。

### 抽离
对于一些不常变更的静态依赖，比如我们项目中常见的 React 全家桶，亦或是用到的一些工具库，比如 moment.js 等等，我们不希望这些依赖被集成进每一次构建逻辑中，因为它们真的太少时候会被变更了，所以每次的构建的输入输出都应该是相同的。因此，我们会设法将这些静态依赖从每一次的构建逻辑中抽离出去，以提升我们每次构建的构建效率。
1. webpack-dll-plugin，在首次构建时候就将这些静态依赖单独打包，后续只需要引用这个早就被打好的静态依赖包即可，有点类似“预编译”的概念
2. external，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN 的方式，去引用它们
3. 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 CommonsChunkPlugin 插件

### 拆分
将单个 entry 剥离出来维护一个独立的构建流程，并在一个容器内执行，待构建完成后，将生成文件打进指定目录
webpack 会将一个 entry 视为一个 chunk，并在最后生成文件时，将 chunk 单独生成一个文件

### Tree shaking
标记没有引用过的模块，压缩时把他们从最终的bundle中去掉，只适用于ES6模块，禁用babel-loader

### 图片压缩
image-webpack-loader

# 常用插件
基于事件流架构，Tapable，扩展webpack的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
1. define-plugin
2. ignore-plugin
3. html-webpack-plugin
4. web-pack-plugin
5. uglifyjs-webpack-plugin
6. terser-webpack-plugin
7. webpack-parallel-plugin
8. mini-css-extract-plugin
9. serviceworker-webpack-plugin
10. clean-webpack-plugin
11. ModuleConcatenationPlugin
12. speed-measure-webpack-plugin
13. webpack-bundle-analyzer

# 常见loader
本质是函数，把接受的资源转化成js
1. raw-loader
2. file-loader
3. url-loader
4. source-map-loader：是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map
5. svg-inline-loader
6. image-loader
7. json-loader
8. babel-loader
9. handlebars-loader
10. ts-loader
11. awesome-typescript-loader
12. sass-loader
13. css-loader
14. style-loader
15. postcss-loader
16. eslint-loader
17. tslint-loader
18. mocha-loader
19. coverjs-loader
20. vue-loader
21. i18n-loader
22. cache-loader
