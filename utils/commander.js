const { Command } = require("commander");
const { getPackageInfo } = require("./file.js");
const beforeCreate = require("./beforeCreate.js");
const GenProject = require("./genProject");
const chalk = require("chalk");
const figlet = require("figlet");
const path = require("path");

const packageData = JSON.parse(getPackageInfo());
const program = new Command();

program.name(packageData.name);
program.description(packageData.description);
program.version(
  packageData.version,
  "-v, --version",
  chalk.blue("output the current version")
);

// 定义基本的操作（操作的定义需要分开，因为调用action后，program的实例将不会继续传递）
program
  .command("create <projectName>")
  .description(chalk.green("create a new project"))
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", chalk.red("overwrite target directory if it exist"))
  .action(async (name, options) => {
    const res = await beforeCreate(name, options);
    if (res) {
      const targetDir = path.join(process.cwd(), name); // 需要创建的目录地址
      const genProject = new GenProject(name, targetDir);
      // 开始创建项目
      genProject.create();
    }
  });

program
  .command("update")
  .description(chalk.green(`update ${packageData.name} to latest`))
  .action((str, options) => {
    console.log("update tobe-cli");
  });

program
  .command("config [value]")
  .description(chalk.green("inspect and modify the config"))
  .option("-g, --get <path>", chalk.green("get value from option"))
  .option("-s, --set <path> <value>", chalk.green("set value from option"))
  .option("-d, --delete <path>", chalk.green("delete option from config"))
  .action((value, options) => {
    console.log(options);
  });

program
  // 监听 --help 执行
  .on("--help", () => {
    // 添加logo
    console.log(
      "\r\n" +
        figlet.textSync(packageData.name, {
          font: "Banner3-D",
          horizontalLayout: "fitted",
          verticalLayout: "fitted",
          width: 120,
          whitespaceBreak: true,
        })
    );

    // 新增说明信息
    console.log(`\r\nRun ${chalk.green(`tb <command> --help`)} for detailed usage of given command\r\n`);
  });

// 解析用户执行命令传入参数
module.exports = {
  program: () => program.parse(process.argv),
};
