const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");
const util = require("util");
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise

// 异步下载等待方法
async function loading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();
  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed("Get repo data success!");
    return true;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, please refetch ...");
    return false;
  }
}

const repos = [
  {name: '通用模板 ===> common-vue3-template', value: 'common-vue3-template'},
  {name: '后台管理模板 ===> back-manage-template', value: 'back-manage-template'}
]

// 生成项目方法
class GenProject {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.message = "Waiting repo template";
    // 改造 download-git-repo 支持 promise
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  // 1）用户选择自己新下载的模板名称
  // 2）return 用户选择的名称

  async getRepo(params) {
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });
    // 3）return 用户选择的名称
    return repo;
  }

  // 下载远程模板
  async download(repo, tag){
    // 1）拼接下载地址
    const requestUrl = `ChaseWindYoungs/${repo}`;
    // 2）调用下载方法
    const res = await loading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
    return res
  }

  // 核心创建逻辑
  async create() {
    // 1）获取想要的模板类型
    const repo = await this.getRepo();
    let name = repos.find(i => i.value === repo).name
    console.log(`您选择的项目是: ${name}`);
    // 3）下载模板到模板目录
    const res = await this.download(repo)
    // 4）模板使用提示
    if(res) {
      console.log(`\r\n  Successfully created project ${chalk.cyan(this.name)}`);
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
      console.log("  npm install");
      console.log("  npm run dev\r\n");
    }
  }
  async copyFiles() {
    // 自定义文本信息
    const message = "Create project files ...";
    // 初始化
    const spinner = ora(message);
    let options = { name: this.name };
    return new Promise((resolve, reject) => {
      // 生成文件的目录
      const templatetUrl = path.join(__dirname, "../", "template");
      // 复制目录
      fs.cp(templatetUrl, this.targetDir, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
          reject(false);
        } else {
          const ejsPaths =[
            '/package.json',
            '/index.html',
            '/src/pages/home/index.vue',
          ]
          ejsPaths.forEach(i => {
            let _path = path.join(this.targetDir, i)
            fs.readFile(_path, (err, file) => {
              ejs.renderFile(_path, options).then((data) => {
                fs.writeFileSync(_path, data);
              });
            });
          })
          resolve(true);
          spinner.stop(); // 停止
          spinner.succeed("Create succeed"); // 成功 ✔
        }
      });
    });
  }
}

module.exports = GenProject;
