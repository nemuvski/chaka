const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function isExist(targetPath) {
  return fs.existsSync(targetPath);
}

function remove(targetPath) {
  rimraf(targetPath, () => {});
}

function changePackageJson(targetProjectPath, projectName) {
  const packageJsonPath = path.join(targetProjectPath, 'package.json');
  const rawData = fs.readFileSync(packageJsonPath, 'utf8');
  const jsonData = JSON.parse(rawData);

  // nameプロパティの内容を書き換え
  jsonData['name'] = projectName;

  fs.writeFileSync(packageJsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
}

module.exports = {
  isExist,
  remove,
  changePackageJson,
};
