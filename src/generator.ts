import * as path from 'path'
import * as AdmZip from 'adm-zip'
import { cli } from 'cli-ux'
import { DirectoryResult } from 'tmp-promise'
import { DownloaderHelper } from 'node-downloader-helper'
import { File } from './constant'
import { readFile, writeFile, copy, mkdir, existsSync, rm } from './utils/fs'
import { jsonParse, jsonStringify } from './utils/json'

/**
 * package.jsonのオブジェクトの型
 *
 * ※処理中で扱うプロパティのみ定義する
 */
interface PackageJson {
  name: string
}

/**
 * TemplateGeneratorのコンストラクタの引数
 */
interface GeneratorConstructorArgs {
  tmpDir: DirectoryResult
  project: string
  repositoryBranch?: string
}

/**
 * TemplateGeneratorの基底クラス
 */
abstract class TemplateGenerator {
  abstract repositoryName: string
  abstract repositoryUrl: string

  protected tmpDir: DirectoryResult
  protected project: string
  protected repositoryBranch: string | undefined = 'main'

  constructor({ project, tmpDir, repositoryBranch }: GeneratorConstructorArgs) {
    this.project = project
    this.tmpDir = tmpDir
    if (repositoryBranch) {
      this.repositoryBranch = repositoryBranch
    }
  }

  /**
   * プロジェクトテンプレートのダウンロードと初期化
   */
  async run() {
    cli.action.start('Download template')
    await this.downloadTemplate()
    cli.action.stop('done')

    cli.action.start('Initialize project')
    await this.extractZipFrom()
    await this.changePackageJson()
    cli.action.stop('done')
  }

  /**
   * プロジェクトテンプレートの配置先（プロジェクトディレクトリ）のパスを返却する
   *
   * @returns {string} プロジェクトテンプレートの配置先のパス
   */
  getProjectPath(): string {
    return path.join(process.cwd(), this.project)
  }

  /**
   * 一時ファイルの削除
   */
  async postProcess() {
    if (existsSync(this.getTempZipFilePath())) {
      await rm(this.getTempZipFilePath())
    }
    if (existsSync(this.getUnzippedDirectoryPath())) {
      await rm(this.getUnzippedDirectoryPath(), { recursive: true, force: true })
    }
    await this.tmpDir.cleanup()
  }

  /**
   * エラー時の処理
   */
  async errorProcess() {
    if (existsSync(this.getProjectPath())) {
      await rm(this.getProjectPath(), { recursive: true, force: true })
    }
  }

  /**
   * プロジェクトディレクトリ中のpackage.jsonのパスを返却する
   *
   * @returns {string} package.jsonのパス
   * @protected
   */
  protected getPackageJsonPath(): string {
    return path.join(this.getProjectPath(), 'package.json')
  }

  /**
   * zip解凍した時に生成されるディレクトリのパスを返却する
   *
   * @returns {string} zip解凍した時に生成されるディレクトリのパス
   * @protected
   */
  protected getUnzippedDirectoryPath(): string {
    return path.join(this.tmpDir.path, `${this.repositoryName}-${this.repositoryBranch}`)
  }

  /**
   * 一時保存したzipファイルのパスを返却する
   *
   * @returns {string} 一時保存したzipファイルのパス
   * @protected
   */
  protected getTempZipFilePath(): string {
    return path.join(this.tmpDir.path, `${File.zipName}${File.zipExtension}`)
  }

  /**
   * プロジェクトテンプレートのzipファイルをダウンロードし、一時ディレクトリに保存する
   *
   * @protected
   */
  protected async downloadTemplate() {
    const url = `${this.repositoryUrl}/archive/${this.repositoryBranch}${File.zipExtension}`
    const downloader = new DownloaderHelper(url, this.tmpDir.path, {
      retry: false,
      fileName: { name: File.zipName },
      removeOnStop: true,
      removeOnFail: true,
    })
    await downloader.start()
  }

  /**
   * プロジェクトテンプレートのzipファイルを解凍し、プロジェクトディレクトにコピーする
   *
   * @protected
   */
  protected async extractZipFrom() {
    const zip = new AdmZip(this.getTempZipFilePath())
    zip.extractAllTo(this.tmpDir.path)

    // コピー前にプロジェクトディレクトリを生成する（パーミッションは755とする）
    await mkdir(this.getProjectPath(), { mode: 0o755 })

    const copyExcludedFilePaths = File.copyExcludedFiles.map((filename) =>
      path.join(this.getUnzippedDirectoryPath(), filename)
    )
    await copy(this.getUnzippedDirectoryPath(), this.getProjectPath(), {
      recursive: true,
      overwrite: false,
      filter: (src) => !copyExcludedFilePaths.includes(src),
    })
  }

  /**
   * プロジェクトディレクトリ中のpackage.jsonの書き換え
   *
   * @param encoding エンコード
   * @protected
   */
  protected async changePackageJson(encoding: BufferEncoding = 'utf8') {
    const packageJsonPath = this.getPackageJsonPath()
    const rawData = await readFile(packageJsonPath, { encoding })
    const jsonData = jsonParse<PackageJson>(rawData)

    // 以下、プロパティの書き換え
    jsonData.name = this.project

    await writeFile(packageJsonPath, jsonStringify(jsonData), { encoding })
  }
}

/**
 * React.jsプロジェクトのテンプレートを生成する
 */
export class ReactTemplateGenerator extends TemplateGenerator {
  repositoryName = 'reactjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/reactjs-boilerplate'
}

/**
 * Next.jsプロジェクトのテンプレートを生成する
 */
export class NextTemplateGenerator extends TemplateGenerator {
  repositoryName = 'nextjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/nextjs-boilerplate'
}
