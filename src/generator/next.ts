import { type GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * Next.jsプロジェクトのテンプレートを生成する
 */
export class NextTemplateGenerator extends TemplateGenerator {
  repositoryName = 'nextjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/nextjs-boilerplate'

  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
