#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-n, --name <project-name>', 'project name');
program.parse(process.argv)

const { name } = program.opts();

console.info('Project Name:', chalk.green(name))

console.info(chalk.yellow('Now under construction. 🚧'));
