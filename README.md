# tobe-cli 
一个可以创建通用模板的脚手架

# usage
`tb-v` 测试安装，查看版本信息

`tb create xxxxxxxxx[YourProjectName]` 创建模板



## 可选模板
#### common-vue3-template


  通用的vue3模板，集成了vue3, vite, Element-plus, axios, pinia，以及一些基础的代理配置和组件

#### back-manage-template

  通用的vue3后台模板，集成了vue3, vite, Element-plus, axios, pinia，以及一些基础的代理配置和组件，可以保存基础配置，tag标签，以及缓存页面等功能

## 新增模板功能
v0.0.9之前是将代码集成在cli中

现在是通过选择你想要创建的项目类型，远程拉取github的仓库，

仓库代码的升级与cli是分开的，后期可以增加多个模板，
