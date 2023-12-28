# tobe-cli 
一个可以创建通用模板的脚手架

# usage

## 新增模板功能
在 template 中存放的是生成的模板，

如果有需要，可以在里面按照想要的方式进行功能的扩展，

建议功能升级后，自己在本地测试一下之后，再提交代码进行合并，最后可以尝试运行 版本升级的指令进行发布，

后续会将前端的包管理器搭建起来，然后就可以发布在私网中（如果发布不成功，请联系仓库管理员）
## 版本升级
`npm run release xxx`

版本升级，自动修改版本号，

eg: 0.0.1

npm run release: 自动升级 patch 补丁的版本号，+1  => 0.0.2 

npm run release xxx: 自动升级 patch 补丁的版本号，+1  => 0.0.2 

npm run release ==minor: 自动升级 minor 主要更新版本的版本号，+1  => 0.1.0  

npm run release ==major: 自动升级 major 重大更新版本的版本号，+1  => 1.0.0 

npm run release ==minor x: 自动升级 minor 主要更新版本的版本号，+x  => 0.x.0 

npm run release ==major x: 自动升级 major 重大更新版本的版本号，+x  => x.0.0 


