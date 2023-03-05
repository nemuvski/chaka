import { GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * React.jsプロジェクトのテンプレートを生成する
 */
export class ReactTemplateGenerator extends TemplateGenerator {
  repositoryName = 'reactjs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/reactjs-boilerplate'

  // eslint-disable-next-line no-useless-constructor
  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
