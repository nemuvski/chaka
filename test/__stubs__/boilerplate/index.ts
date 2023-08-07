import AdmZip from 'adm-zip'
import * as path from 'node:path'

const basePath = path.resolve(__dirname)

/**
 * @param zipFolderNameInArchive zipファイル内のフォルダ名
 * @see {import('../../../src/generator/base').TemplateGenerator.getUnzippedDirectoryPath()} フォルダ名を揃えること
 */
function reactjsZip(zipFolderNameInArchive: string = 'reactjs-boilerplate-main') {
  const zip = new AdmZip()
  zip.addLocalFolder(path.join(basePath, 'reactjs'), zipFolderNameInArchive)
  return zip
}

/**
 * @param zipFolderNameInArchive zipファイル内のフォルダ名
 * @see {import('../../../src/generator/base').TemplateGenerator.getUnzippedDirectoryPath()} フォルダ名を揃えること
 */
function nextjsZip(zipFolderNameInArchive: string = 'nextjs-boilerplate-main') {
  const zip = new AdmZip()
  zip.addLocalFolder(path.join(basePath, 'nextjs'), zipFolderNameInArchive)
  return zip
}

/**
 * @param zipFolderNameInArchive zipファイル内のフォルダ名
 * @see {import('../../../src/generator/base').TemplateGenerator.getUnzippedDirectoryPath()} フォルダ名を揃えること
 */
function remixjsZip(zipFolderNameInArchive: string = 'remixjs-boilerplate-main') {
  const zip = new AdmZip()
  zip.addLocalFolder(path.join(basePath, 'remixjs'), zipFolderNameInArchive)
  return zip
}

/**
 * @param zipFolderNameInArchive zipファイル内のフォルダ名
 * @see {import('../../../src/generator/base').TemplateGenerator.getUnzippedDirectoryPath()} フォルダ名を揃えること
 */
function gatsbyjsZip(zipFolderNameInArchive: string = 'gatsbyjs-boilerplate-main') {
  const zip = new AdmZip()
  zip.addLocalFolder(path.join(basePath, 'gatsbyjs'), zipFolderNameInArchive)
  return zip
}

/**
 * @param zipFolderNameInArchive zipファイル内のフォルダ名
 * @see {import('../../../src/generator/base').TemplateGenerator.getUnzippedDirectoryPath()} フォルダ名を揃えること
 */
function sveltejsZip(zipFolderNameInArchive: string = 'sveltejs-boilerplate-main') {
  const zip = new AdmZip()
  zip.addLocalFolder(path.join(basePath, 'sveltejs'), zipFolderNameInArchive)
  return zip
}

export { reactjsZip, nextjsZip, remixjsZip, gatsbyjsZip, sveltejsZip }
