# fis3-wp
wp是基于fis3纯前端解决方案

* 采用less作为css处理器
* 采用amd模块化开发方案
* 采用npm管理第三方依赖

阅读本文档前，建议先阅读[fis3的文档](http://fis.baidu.com/fis3/docs/beginning/intro.html)，很多涉及到fis3的内容都没有提及，请查看相应的文档。


## 使用

### 全局安装vm

``` shell
$ npm install fis3-wp -g
```

### release模式
* 默认的dev模式，用于本地调试，会编译velocity，模拟转发url。

	``` shell
	$ fis3-wp release
	```
* prod模式，用于生产环境上线，会添加md5戳，打包，合成精灵图，压缩。

	``` shell
	$ fis3-wp release prod
	```
