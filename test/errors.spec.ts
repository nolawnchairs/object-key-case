
import { KeyConversionContext, KeyConversionException } from '../src/convert'

describe('errors', () => {

  it('should throw an error if the target case is invalid', () => {
    // @ts-ignore
    expect(() => new KeyConversionContext('invalid')).toThrow(KeyConversionException)
  })

  it('should throw an error if the object is not an object or array', () => {
    // @ts-ignore
    expect(() => new KeyConversionContext('camel').convert('invalid')).toThrow(KeyConversionException)
  })
})
