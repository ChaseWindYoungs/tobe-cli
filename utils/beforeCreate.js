const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");

// 初始化
const spinner = ora("Removeing ...");

const inquirerOptions = [
  {
    name: "action",
    type: "list",
    message: "Target directory already exists Pick an action:",
    choices: [
      {
        name: "Overwrite",
        value: "overwrite",
      },
      {
        name: "Cancel",
        value: false,
      },
    ],
  },
];

module.exports = async function (name, options) {
  const cwd = process.cwd(); // 当前命令行选择的目录

  const targetDir = path.join(cwd, name); // 需要创建的目录地址

  // 目录是否已经存在？
  if (fs.existsSync(targetDir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetDir);
      return true;
    } else {
      let { action } = await inquirer.prompt(inquirerOptions); // 询问用户是否确定要覆盖
      if (!action) {
        return false;
      } else if (action === "overwrite") {
        spinner.start(); // 开始加载动画
        // 移除已存在的目录
        await fs.remove(targetDir);
        spinner.stop(); // 停止
        spinner.succeed(chalk.green(" Remove succeed")); // 成功 ✔
        return true;
      }
    }
  } else { 
    return true;
  }
};
