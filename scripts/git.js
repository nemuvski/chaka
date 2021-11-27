const execa = require('execa');
const { TEMPLATE_REPOSITORY } = require('./constants')

async function cloneTemplate(projectName, branchName) {
  const result = await execa('git', ['clone', '-b', branchName, TEMPLATE_REPOSITORY, projectName]);
  if (result.failed) {
    return Promise.reject(new Error('Failed to fetch template'));
  }
}

module.exports = {
  cloneTemplate,
};
