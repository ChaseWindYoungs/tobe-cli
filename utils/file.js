const path = require("path");
const fs = require("fs");

function getPackageInfo() {
  // const packPath = process.cwd();
  const packPath = path.join(__dirname, '../');
  const pName = 'package.json'

  var data = fs.readFileSync(path.join(packPath, pName), 'utf-8');
  return data
}

module.exports = {
  getPackageInfo
}