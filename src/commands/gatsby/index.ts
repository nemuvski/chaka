import { Args, Command } from '@oclif/core'
import { existsSync } from '../../utils/fs'
import { decoRed } from '../../utils/log-decoration'
import { GatsbyTemplateGenerator } from '../../generator/gatsby'
import type { ArgInput } from '@oclif/core/lib/interfaces/parser'

/**
 * gatsbyコマンドの処理を定義する
 */
export default class Gatsby extends Command {
  static description = 'Create a Gatsby.js project template'

  static examples = ['$ chaka gatsby my-app']

  static args: ArgInput = {
    project: Args.string({
      description: 'project name (i.e. directory name)',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {
      args: { project },
    } = await this.parse(Gatsby)

    const generator = await GatsbyTemplateGenerator.build({
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
