import { expect, test } from '@oclif/test'
import { RequiredArgsError } from '@oclif/core/lib/parser/errors'

describe('[CMD] svelte', () => {
  test
    .command(['svelte'])
    .catch((error) => {
      expect(error instanceof RequiredArgsError).to.true
    })
    .it('project nameが未入力')
})
