import { expect, test } from '@oclif/test'
import { CLIError } from '@oclif/core/lib/parser/errors'

describe('[CMD] COMMON', () => {
  test
    .command([])
    .catch((error) => {
      expect(error instanceof CLIError).to.true
    })
    .it('コマンドが未入力')

  test
    .command(['abc'])
    .catch((error) => {
      expect(error instanceof CLIError).to.true
    })
    .it('存在しないコマンドを入力')

  /**
   * helpコマンドを実行してもエラーが出ないことを確認
   */
  test.stdout({ print: false }).command(['help']).it('helpコマンドを入力')
})
