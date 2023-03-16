import { type GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * React.jsプロジェクトのテンプレートを生成する
 */
export class ReactTemplateGenerator extends TemplateGenerator {
  repositoryName = 'reactjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/reactjs-boilerplate'

  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
