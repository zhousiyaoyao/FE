Jest是facebook的，特点内置常用测试工具，自带断言，测试覆盖率工具，快照测试，比对UI代码生成的快照文件，实现对react框架的自动测试。而且是并行执行，只执行发生变化的文件对应测试。
1. expert(hello()).toBe(‘Hello world’), toBe是一句断言。
2. beforeAll，beforeEach，afterAll，afterEach
3. Describe把几个用例归为一组
4. 测试异步代码，对于异步回调，向其传入并执行done函数，jest会等done结束,对于promise异步，直接在then回调中进行断言，如果error要加入assertions
对于async/await异步，只要在await后进行断言
5. mock函数使用的情况：一个模块的方法内常常会去调用另一个模块的方法，在单元测试中，我们可能并不需要关心内部调用的方法的执行过程和结果，只想知道它是否被正确调用即可，甚至会指定该函数的返回值。mock函数的三个特性：捕获函数调用情况，设置函数返回值，改变函数的内部实现
6. jest模拟HTTP请求，我们要避免在测试中实际进行API的调用，因为调用的资源可能在运行测试的环境中不可用，测试很慢，操作昂贵，写入DB需要清理。jest的做法：回溯到使用XMLHttpRequest对象的正确模拟，拦截对它的调用并伪造行为
7. Axios-mock-adapter, 用来mock request。



