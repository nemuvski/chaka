import { expect, test } from '@oclif/test'
import { RequiredArgsError } from '@oclif/core/lib/parser/errors'

describe('[CMD] react', () => {
  test
    .command(['react'])
    .catch((error) => {
      expect(error instanceof RequiredArgsError).to.true
    })
    .it('project nameが未入力')
})
