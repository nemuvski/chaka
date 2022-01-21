const path = require('path');
const chalk = require('chalk');
const listr = require('listr');
const { cloneTemplate } = require('./utils/git');
const { isExist, remove, changePackageJson } = require('./utils/resource');

async function main(cwd, dirName, opts) {
  const targetProjectPath = path.join(cwd, dirName);
  const { tool, lib } = opts;

  console.info('Project Name:', chalk.green(dirName));

  if (isExist(targetProjectPath)) {
    console.error(chalk.bgRed(targetProjectPath), chalk.red('is already exists'));
    return;
  }

  const tasks = new listr([
    {
      title: 'Fetching a template',
      task: () => cloneTemplate(dirName, tool, lib),
    },
    {
      title: 'Initialize a project',
      task: () => {
        return new listr([
          {
            title: 'Cleaning',
            task: () => remove(path.join(targetProjectPath, '.git')),
          },
          {
            title: 'Rewrite package.json',
            task: () => changePackageJson(targetProjectPath, dirName),
          },
        ]);
      },
    },
  ]);

  try {
    await tasks.run();
  } catch (error) {
    console.error(error);
  }
}

module.exports = main;
