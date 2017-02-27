# fis3-wp
wp是基于fis3纯前端解决方案

* 采用less作为css处理器
* 采用amd模块化开发方案
* 采用npm管理第三方依赖

阅读本文档前，建议先阅读[fis3的文档](http://fis.baidu.com/fis3/docs/beginning/intro.html)，很多涉及到fis3的内容都没有提及，请查看相应的文档。


## Contents

```
.
|____common					//公共文件
| |____static				//静态文件（不符合amd规范的js资源或其他静态资源）
| | |____tj.js
| |____components			//与业务无关的组件
| | |____main.html
| | |____main.js
| |____widgets				//与业务相关的组件
| | |____main.html
| | |____main.js
|
|____src					//源码
| |____test1				//具有独立功能的一组页面（例：账号管理）
| | |____hello.html
| | |____modules			//模块包
| | | |____common
| | | | |____common.html
| | | | |____img
| | | | | |____share.jpg
| | | | |____module1.js
| | | | |____style.less
| | | |____banner
| | | | |____banner.js
| | |____static				//静态文件（不符合amd规范的js资源或其他静态资源）
| | | |____base.less
|
|____mock					//模拟请求转发
| |____getMood.json
| |____server.conf			//请求转发配置目录
|
|
|____fis-conf.js			//项目配置文件
|____manifest.json			//打包信息
|____package.json			
|____README.md				
.
```

## Usages

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
