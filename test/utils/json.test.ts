import { expect } from 'chai'
import { jsonParse, jsonStringify } from '../../src/utils/json'

describe('utils/json.ts', () => {
  it('jsonParse()', () => {
    expect(jsonParse('{"name":"sample","version":"1.0.0"}')).to.deep.equal({ name: 'sample', version: '1.0.0' })
  })

  it('jsonStringify()', () => {
    expect(jsonStringify({ name: 'sample', version: '1.0.0' })).to.equal(
      `{\n  "name": "sample",\n  "version": "1.0.0"\n}`
    )
    expect(jsonStringify({ name: 'sample', version: '1.0.0' }, 4)).to.equal(
      `{\n    "name": "sample",\n    "version": "1.0.0"\n}`
    )
  })
})
