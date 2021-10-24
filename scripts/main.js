const path = require('path');
const chalk = require('chalk');
const listr = require('listr');
const { cloneTemplate } = require('./git');
const { isExist, remove, changePackageJson } = require('./resource');

async function main(cwd, opts) {
  const { name } = opts;
  const targetProjectPath = path.join(cwd, name);

  console.info('Project Name:', chalk.green(name));

  if (isExist(targetProjectPath)) {
    console.error(chalk.bgRed(targetProjectPath), chalk.red('is already exists'));
    return;
  }

  const tasks = new listr([
    {
      title: 'Clone template',
      task: () => cloneTemplate(name),
    },
    {
      title: 'Initialize project',
      task: () => {
        return new listr([
          {
            title: 'Cleaning',
            task: () => remove(path.join(targetProjectPath, '.git')),
          },
          {
            title: 'Rewrite package.json',
            task: () => changePackageJson(targetProjectPath, name),
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
