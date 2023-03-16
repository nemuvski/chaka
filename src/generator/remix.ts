import { type GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * Remix.jsプロジェクトのテンプレートを生成する
 */
export class RemixTemplateGenerator extends TemplateGenerator {
  repositoryName = 'remixjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/remixjs-boilerplate'

  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
