import { GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * Next.jsプロジェクトのテンプレートを生成する
 */
export class NextTemplateGenerator extends TemplateGenerator {
  repositoryName = 'nextjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/nextjs-boilerplate'

  // eslint-disable-next-line no-useless-constructor
  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
