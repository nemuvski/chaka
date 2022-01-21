#!/usr/bin/env node

const { Command, Option } = require('commander');
const packageJson = require('../package.json');
const main = require('../scripts/main');
const { CLI } = require('../scripts/constants');

async function run() {
  const program = new Command();
  program
    .version(packageJson.version, '-v, --version')
    .argument('<project-name>', 'project name (i.e. directory name)')
    .addOption(
      new Option('-l, --lib <lib-name>', 'lib name').choices(CLI.LIB.CHOICES).default(CLI.LIB.DEFAULT)
    )
    .addOption(
      new Option('-t, --tool <tool-name>', 'tool name').choices(CLI.TOOL.CHOICES).default(CLI.TOOL.DEFAULT)
    );
  program.parse(process.argv);

  // argumentsの確認 (問題があれば中断する)
  if (program.args.length !== 1) {
    program.help();
  }

  const dirName = program.args[0];
  await main(process.cwd(), dirName, program.opts());
}

run();
