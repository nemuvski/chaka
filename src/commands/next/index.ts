import { Args, Command } from '@oclif/core'
import { existsSync } from '../../utils/fs'
import { decoRed } from '../../utils/log-decoration'
import { NextTemplateGenerator } from '../../generator/next'
import type { ArgInput } from '@oclif/core/lib/interfaces/parser'

/**
 * nextコマンドの処理を定義する
 */
export default class Next extends Command {
  static description = 'Create a Next.js project template'

  static examples = ['$ chaka next my-app']

  static args: ArgInput = {
    project: Args.string({
      description: 'project name (i.e. directory name)',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: { project },
    } = await this.parse(Next)

    const generator = await NextTemplateGenerator.build({
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
