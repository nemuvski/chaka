import { expect, test } from '@oclif/test'
import { RequiredArgsError } from '@oclif/core/lib/parser/errors'
import path from 'node:path'
import { GITHUB_HOST, MOCK_RESPONSE_HEADERS, PACKAGEJSON_FILENAME, TMP_FILE_DIRNAME } from '../__constants'
import * as fs from '../../src/utils/fs'
import tmpPromise from 'tmp-promise'
import { stubDir, stubTmpdir } from '../__stubs__/tmp-promise'
import { sveltejsZip } from '../__stubs__/boilerplate'
import { jsonParse } from '../../src/utils/json'

describe('[CMD] svelte', () => {
  describe('Missing project name', () => {
    test
      .command(['svelte'])
      .catch((error) => {
        expect(error instanceof RequiredArgsError).to.true
      })
      .it('project nameが未入力')
  })

  describe('Checking flow', () => {
    const fakeName = '__testing__sveltejs__'

    const generatedDirPath = path.resolve(process.cwd(), fakeName)
    const tmpPath = path.resolve(__dirname, '..', TMP_FILE_DIRNAME, fakeName)

    beforeEach(async () => {
      if (fs.existsSync(tmpPath)) {
        await fs.rm(tmpPath, { recursive: true, force: true })
        await fs.mkdir(tmpPath, { recursive: true })
      } else {
        await fs.mkdir(tmpPath, { recursive: true })
      }
    })

    afterEach(async () => {
      if (fs.existsSync(tmpPath)) {
        await fs.rm(tmpPath, { recursive: true, force: true })
      }
      // 生成されたディレクトリを削除
      if (fs.existsSync(generatedDirPath)) {
        await fs.rm(generatedDirPath, { recursive: true, force: true })
      }
    })

    test
      .stdout()
      .stderr()
      .stub(tmpPromise, 'tmpdir', stubTmpdir(tmpPath))
      .stub(tmpPromise, 'dir', stubDir(tmpPath))
      .nock(GITHUB_HOST, (api) => {
        api
          .get('/nemuvski/sveltejs-boilerplate/archive/main.zip')
          .reply(200, sveltejsZip().toBuffer(), MOCK_RESPONSE_HEADERS)
      })
      .command(['svelte', fakeName])
      .it('プロジェクトのディレクトリを作成し、package.jsonの情報が書き換わる', async () => {
        const packageJsonPath = path.join(generatedDirPath, PACKAGEJSON_FILENAME)
        expect(fs.existsSync(packageJsonPath)).to.true
        const rawData = await fs.readFile(packageJsonPath, { encoding: 'utf-8' })
        const jsonData = jsonParse<{ name: string }>(rawData)
        expect(jsonData.name).to.equal(fakeName)
      })
  })
})
