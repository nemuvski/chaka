import { Args, Command } from '@oclif/core'
import { existsSync } from '../../utils/fs'
import { decoRed } from '../../utils/log-decoration'
import { RemixTemplateGenerator } from '../../generator/remix'
import type { ArgInput } from '@oclif/core/lib/interfaces/parser'

/**
 * remixコマンドの処理を定義する
 */
export default class Remix extends Command {
  static description = 'Create a remix.js project template'

  static examples = ['$ chaka remix my-app']

  static args: ArgInput = {
    project: Args.string({
      description: 'project name (i.e. directory name)',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: { project },
    } = await this.parse(Remix)

    const generator = await RemixTemplateGenerator.build({
      project,
    })

    if (existsSync(generator.getProjectPath())) {
      this.error(`${decoRed(generator.getProjectPath())} is already exists`)
    }

    try {
      await generator.run()
    } catch (error) {
      await generator.errorProcess()
      this.error(decoRed(error as Error))
    } finally {
      await generator.postProcess()
    }
  }
}
