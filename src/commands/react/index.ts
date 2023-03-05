import { Args, Command } from '@oclif/core'
import { existsSync } from '../../utils/fs'
import { decoRed } from '../../utils/log-decoration'
import { ReactTemplateGenerator } from '../../generator/react'
import { ArgInput } from '@oclif/core/lib/interfaces/parser'

/**
 * reactコマンドの処理を定義する
 */
export default class React extends Command {
  static description = 'Create a React.js project template'

  static examples = ['$ chaka react my-app']

  static args: ArgInput = {
    project: Args.string({
      description: 'project name (i.e. directory name)',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: { project },
    } = await this.parse(React)

    const generator = await ReactTemplateGenerator.build({
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
