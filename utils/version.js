const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { getPackageInfo } = require("./file.js");
let packageData = JSON.parse(getPackageInfo());
let version = packageData.version;
function main() {
  const args = process.argv.slice(2);
  console.log(process.argv)
  function changeNum(argNum, idx) {
    if (parseInt(version.split(".")[idx]) >= args[1]) {
      throw new Error("version number must bigger than now!");
      return;
    } else return argNum || parseInt(version.split(".")[idx]) + 1;
  }
  if (args.length > 0) {
    if (args[0] === "major") {
      // 重大更新版本
      version = version.split(".").fill(0).fill(changeNum(args[1], 0), 0, 1).join(".");
    } else if (args[0] === "minor") {
      // 主要更新版本
      version = version.split(".").fill(0, 1).fill(changeNum(args[1], 1), 1, 2).join(".");
    } else {
      // 补丁更新版本
      version = version.split(".").fill(changeNum(args[1], 2), 2, 3).join(".");
    }
  } else {
    // 补丁更新版本
    version = version
      .split(".")
      .fill(parseInt(changeNum(null, 2)), 2, 3)
      .join(".");
  }
  packageData.version = version;
  packageData = JSON.stringify(packageData, null, 2);
  fs.writeFileSync(path.join(process.cwd(), "./package.json"), packageData);
  fs.writeFile(path.join(process.cwd(), "./package.json"), packageData, (err, file) => {
    if (err) {
      throw err;
    } else {
      console.log(chalk.green("Update version success!"));
      ;
    }
  });
}
try {
  main();
} catch (error) {
  console.log(chalk.red(error));
  console.error(error);
  process.exit(1);
}
