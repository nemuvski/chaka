#!/usr/bin/env node

const { Command } = require('commander');
const main = require('../scripts/main')

async function run() {
  const program = new Command();
  program
    .requiredOption('-n, --name <project-name>', 'project name');
  program.parse(process.argv)

  await main(process.cwd(), program.opts());
}

run();
