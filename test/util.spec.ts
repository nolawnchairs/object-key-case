import { isKvObject } from '../src/util'

describe('utilities', () => {

  it('should detect KV object', () => {
    expect(isKvObject({})).toBe(true)
    expect(isKvObject({ foo: 'bar' })).toBe(true)
    expect(isKvObject({ foo: 'bar', baz: 'qux' })).toBe(true)
    expect(isKvObject({ foo: 'bar', baz: { qux: 'quux' } })).toBe(true)
    expect(isKvObject({ foo: 'bar', baz: ['qux', 'quux'] })).toBe(true)
    expect(isKvObject([])).toBe(false)
    expect(isKvObject([1, 2, 3])).toBe(false)
    expect(isKvObject([{}])).toBe(false)
    expect(isKvObject([{}, {}])).toBe(false)
    expect(isKvObject(42)).toBe(false)
    expect(isKvObject('foo')).toBe(false)
    expect(isKvObject(true)).toBe(false)
    expect(isKvObject(null)).toBe(false)
    expect(isKvObject(undefined)).toBe(false)
  })
})
