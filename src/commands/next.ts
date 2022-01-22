import { Command, Interfaces } from '@oclif/core'

/**
 * nextコマンドの処理を定義する
 */
export default class Next extends Command {
  static description = 'Create a Next.js project template'

  static examples = ['$ chaka next my-app']

  static args: Interfaces.ArgInput = [
    {
      name: 'project',
      description: 'project name (i.e. directory name)',
      required: true,
    },
  ]

  async run(): Promise<void> {
    const { args } = await this.parse(Next)
  }
}
