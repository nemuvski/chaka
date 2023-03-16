import { type GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * Gatsby.jsプロジェクトのテンプレートを生成する
 */
export class GatsbyTemplateGenerator extends TemplateGenerator {
  repositoryName = 'gatsbyjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/gatsbyjs-boilerplate'

  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
