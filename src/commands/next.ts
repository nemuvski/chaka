import * as tmp from 'tmp-promise'
import { Command, Interfaces } from '@oclif/core'
import { existsSync } from '../utils/fs'
import { decoRed } from '../utils/log-decoration'
import { NextTemplateGenerator } from '../generator'

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

  async run() {
    const {
      args: { project },
    } = await this.parse(Next)

    const tmpDir = await tmp.dir()
    const generator = new NextTemplateGenerator({
      tmpDir,
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
