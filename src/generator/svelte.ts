import { type GeneratorConstructorArgs, TemplateGenerator } from './base'

/**
 * Svelte.jsプロジェクトのテンプレートを生成する
 */
export class SvelteTemplateGenerator extends TemplateGenerator {
  repositoryName = 'sveltejs-boilerplate'
  repositoryUrl = 'https://github.com/nemuvski/sveltejs-boilerplate'

  constructor(args: GeneratorConstructorArgs) {
    super(args)
  }
}
