const execa = require('execa');
const { REPOSITORY_LIST } = require("../constants");

function getRepositoryURL(libName) {
  if (libName === 'react') {
    return REPOSITORY_LIST.REACT;
  }

  if (libName === 'next') {
    return REPOSITORY_LIST.NEXT;
  }

  // 以上の条件に当てはまらなければエラーとする
  throw new Error('Failed to resolve the repository url');
}

async function cloneTemplate(projectName, branchName, libName) {
  let arguments = ['clone'];

  // reactがlibオプションに与えられている場合は、ブランチを指定する
  if (libName === 'react') {
    arguments = arguments.concat(['-b', branchName]);
  }

  arguments = arguments.concat([getRepositoryURL(libName), projectName]);

  const result = await execa('git', arguments);
  if (result.failed) {
    return Promise.reject(new Error('Failed to fetch a template'));
  }
}

module.exports = {
  cloneTemplate,
};
