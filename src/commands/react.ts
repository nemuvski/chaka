import { Command, Flags, Interfaces } from '@oclif/core'
import { ReactCommand } from '../constant'

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
      options: ReactCommand.options.tool.choices,
      default: ReactCommand.options.tool.default,
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

  async run(): Promise<void> {
    const { args, flags } = await this.parse(React)
  }
}
