const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");
const util = require("util");
const { getRepoList, getTagList } = require("./http");
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
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, please refetch ...");
  }
}

// 生成项目方法
class GenProject {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.message = "Waiting repo template";
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo(params) {
    const repoList = await loading(getRepoList, "waiting fetch template");
    if (!repoList) return;
    // 过滤我们需要的模板名称
    const repos = repoList.map((item) => item.name);
    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    // 3）return 用户选择的名称
    return repo;
  }

  // 获取用户选择的版本
  // 1）基于 repo 结果，远程拉取对应的 tag 列表
  // 2）用户选择自己需要下载的 tag
  // 3）return 用户选择的 tag

  async getTag(repo) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await loading(getTagList, "waiting fetch tag", repo);
    if (!tags) return;

    // 过滤我们需要的 tag 名称
    const tagsList = tags.map((item) => item.name);

    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tagsList,
      message: "Place choose a tag to create project",
    });

    // 3）return 用户选择的 tag
    return tag;
  }

  // 核心创建逻辑
  async create() {
    // // 1）获取模板名称
    // const repo = await this.getRepo();
    // // 2) 获取 tag 名称
    // const tag = await this.getTag(repo);
    // console.log("选择的项目是：repo=" + repo + "，tag=" + tag);
    const res = await this.copyFiles(this.name);
    if (res) {
      // 4）模板使用提示
      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
      console.log("  npm install\r\n");
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
          const packagePath = path.join(this.targetDir, "/package.json"),
            homePagePath = path.join(this.targetDir, "/src/pages/home/index.vue");
          fs.readFile(packagePath, (err, file) => {
            ejs.renderFile(packagePath, options).then((data) => {
              fs.writeFileSync(packagePath, data);
            });
          });
          fs.readFile(homePagePath, (err, file) => {
            ejs.renderFile(homePagePath, options).then((data) => {
              fs.writeFileSync(homePagePath, data);
            });
          });
          resolve(true);
          spinner.stop(); // 停止
          spinner.succeed("Create succeed"); // 成功 ✔
        }
      });
    });
  }
}

module.exports = GenProject;
