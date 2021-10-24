const execa = require('execa');

const templateRepository = 'https://github.com/nemuvski/reactjs-boilerplate.git';

async function cloneTemplate(projectName) {
  const result = await execa('git', ['clone', templateRepository, projectName]);
  if (result.failed) {
    return Promise.reject(new Error('Failed to clone template'));
  }
}

module.exports = {
  cloneTemplate,
};
