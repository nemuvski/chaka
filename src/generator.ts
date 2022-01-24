import * as path from 'node:path'
import * as tmp from 'tmp-promise'
import AdmZip from 'adm-zip'
import { cli } from 'cli-ux'
import { DirectoryResult } from 'tmp-promise'
import { DownloaderHelper } from 'node-downloader-helper'
import { File } from './constant'
import { readFile, writeFile, copy, mkdir, existsSync, rm } from './utils/fs'
import { jsonParse, jsonStringify } from './utils/json'
import { decoBlue, decoGreen, decoUnderscore } from './utils/log-decoration'

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
 * TemplateGeneratorのbuildメソッドの引数
 */
type GeneratorBuildArgs = Omit<GeneratorConstructorArgs, 'tmpDir'>

/**
 * TemplateGeneratorの基底クラス
 */
abstract class TemplateGenerator {
  abstract repositoryName: string
  abstract repositoryUrl: string

  protected tmpDir: DirectoryResult
  protected project: string
  protected repositoryBranch: string | undefined = 'main'

  constructor({ tmpDir, project, repositoryBranch }: GeneratorConstructorArgs) {
    this.tmpDir = tmpDir
    this.project = project
    if (repositoryBranch) {
      this.repositoryBranch = repositoryBranch
    }
  }

  /**
   * TemplateGeneratorのインスタンスを生成し、返却する
   *
   * @param args generatorの作成に必要な引数
   * @returns Promise<T> TemplateGeneratorのインスタンス
   */
  static async build<T = TemplateGenerator>(
    this: { new (args: GeneratorConstructorArgs): T },
    args: GeneratorBuildArgs
  ): Promise<T> {
    const tmpDir = await tmp.dir()
    return new this({ tmpDir, ...args })
  }

  /**
   * プロジェクトテンプレートのダウンロードと初期化
   *
   * @returns Promise<void>
   */
  async run() {
    cli.action.start('Download template')
    await this.downloadTemplate()
    cli.action.stop(decoGreen('done'))

    cli.action.start('Initialize project')
    await this.extractZipFrom()
    await this.changePackageJson()
    cli.action.stop(decoGreen('done'))

    this.sayFarewell()
  }

  /**
   * プロジェクトテンプレートの配置先（プロジェクトディレクトリ）のパスを返却する
   *
   * @returns string プロジェクトテンプレートの配置先のパス
   */
  getProjectPath(): string {
    return path.join(process.cwd(), this.project)
  }

  /**
   * 一時ファイルの削除
   *
   * @returns Promise<void>
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
   *
   * @returns Promise<void>
   */
  async errorProcess() {
    if (existsSync(this.getProjectPath())) {
      await rm(this.getProjectPath(), { recursive: true, force: true })
    }
  }

  /**
   * コマンド終了時に簡単な案内を出力する
   *
   * @returns void
   * @protected
   */
  protected sayFarewell() {
    cli.log()
    cli.log(`Created project in ${decoGreen(this.getProjectPath())}`)
    cli.log()
    cli.log('Now run:')
    cli.log()
    cli.log(`    cd ${decoBlue(this.project)}`)
    cli.log()
    cli.log()
    cli.log(`  ${decoUnderscore('Install dependencies using your fav package manager')}`)
    cli.log()
    cli.log('    yarn install')
    cli.log('    npm install')
    cli.log()
    cli.log()
    cli.log('Have fun coding 🔥')
    cli.log()
  }

  /**
   * プロジェクトディレクトリ中のpackage.jsonのパスを返却する
   *
   * @returns string package.jsonのパス
   * @protected
   */
  protected getPackageJsonPath(): string {
    return path.join(this.getProjectPath(), 'package.json')
  }

  /**
   * zip解凍した時に生成されるディレクトリのパスを返却する
   *
   * @returns string zip解凍した時に生成されるディレクトリのパス
   * @protected
   */
  protected getUnzippedDirectoryPath(): string {
    return path.join(this.tmpDir.path, `${this.repositoryName}-${this.repositoryBranch}`)
  }

  /**
   * 一時保存したzipファイルのパスを返却する
   *
   * @returns string 一時保存したzipファイルのパス
   * @protected
   */
  protected getTempZipFilePath(): string {
    return path.join(this.tmpDir.path, `${File.zipName}${File.zipExtension}`)
  }

  /**
   * プロジェクトテンプレートのzipファイルをダウンロードし、一時ディレクトリに保存する
   *
   * @returns Promise<void>
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
   * @returns Promise<void>
   * @protected
   */
  protected async extractZipFrom() {
    const zip = new AdmZip(this.getTempZipFilePath())
    zip.extractAllTo(this.tmpDir.path)

    // コピー前にプロジェクトディレクトリを生成する（パーミッションは755とする）
    await mkdir(this.getProjectPath(), { mode: 0o755 })

    const copyExcludedFilePaths = new Set(
      File.copyExcludedFiles.map((filename) => path.join(this.getUnzippedDirectoryPath(), filename))
    )
    await copy(this.getUnzippedDirectoryPath(), this.getProjectPath(), {
      recursive: true,
      overwrite: false,
      filter: (src) => !copyExcludedFilePaths.has(src),
    })
  }

  /**
   * プロジェクトディレクトリ中のpackage.jsonの書き換え
   *
   * @param encoding エンコード
   * @returns Promise<void>
   * @protected
   */
  protected async changePackageJson(encoding: BufferEncoding = 'utf8') {
    const packageJsonPath = this.getPackageJsonPath()
    const rawData = await readFile(packageJsonPath, { encoding })
    const jsonData = jsonParse<PackageJson>(rawData)

    // 以下、プロパティの書き換え
    jsonData.name = this.project

    await writeFile(packageJsonPath, jsonStringify<PackageJson>(jsonData), { encoding })
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
