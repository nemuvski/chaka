import { Command, Flags, Interfaces } from '@oclif/core'
import { existsSync } from '../utils/fs'
import { decoRed } from '../utils/log-decoration'
import { ReactTemplateGenerator } from '../generator'

/**
 * reactコマンドの処理を定義する
 */
export default class React extends Command {
  static description = 'Create a React.js project template'

  static examples = ['$ chaka react my-app', '$ chaka react my-app -t vite', '$ chaka react my-app --tool=vite']

  static flags = {
    tool: Flags.string({
      char: 't',
      description: 'build tool name',
      options: ['vite', 'webpack'],
      default: 'vite',
      multiple: false,
      required: false,
    }),
  }

  static args: Interfaces.ArgInput = [
    {
      name: 'project',
      description: 'project name (i.e. directory name)',
      required: true,
    },
  ]

  async run() {
    const {
      args: { project },
      flags: { tool },
    } = await this.parse(React)

    const generator = await ReactTemplateGenerator.build({
      project,
      repositoryBranch: tool,
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
