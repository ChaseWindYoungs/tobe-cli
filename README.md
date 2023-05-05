# tobe-cli 
一个可以创建通用模板的脚手架

# usage

`npm run release xxx`

版本升级，自动修改版本号，

eg: 0.0.1

npm run release: 自动升级 patch 补丁的版本号，+1  => 0.0.2 

npm run release xxx: 自动升级 patch 补丁的版本号，+1  => 0.0.2 

npm run release minor: 自动升级 minor 主要更新版本的版本号，+1  => 0.1.0  

npm run release major: 自动升级 major 重大更新版本的版本号，+1  => 1.0.0 

npm run release minor x: 自动升级 minor 主要更新版本的版本号，+x  => 0.x.0 

npm run release major x: 自动升级 major 重大更新版本的版本号，+x  => x.0.0 
