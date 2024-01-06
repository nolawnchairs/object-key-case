import { isCamelCase, isSnakeCase, toCamel, toSnake } from '../src/util'

describe('case conversion/detection', () => {

  it('should detect camelCase', () => {
    expect(isCamelCase('camel')).toBe(true)
    expect(isCamelCase('camelCase')).toBe(true)
    expect(isCamelCase('isCamelCase')).toBe(true)
    expect(isCamelCase('camel_case')).toBe(false)
    expect(isCamelCase('CamelCase')).toBe(false)
  })

  it('should detect snake_case', () => {
    expect(isSnakeCase('snake')).toBe(true)
    expect(isSnakeCase('snake_case')).toBe(true)
    expect(isSnakeCase('is_snake_case')).toBe(true)
    expect(isSnakeCase('snakeCase')).toBe(false)
    expect(isSnakeCase('SnakeCase')).toBe(false)
  })

  it('should convert to camelCase', () => {
    expect(toCamel('camel')).toBe('camel')
    expect(toCamel('camelCase')).toBe('camelCase')
    expect(toCamel('isCamelCase')).toBe('isCamelCase')
    expect(toCamel('camel_case')).toBe('camelCase')
    expect(toCamel('is_camel_case')).toBe('isCamelCase')
    expect(toCamel('CamelCase')).toBe('camelCase')
  })

  it('should convert to snake_case', () => {
    expect(toSnake('snake')).toBe('snake')
    expect(toSnake('snake_case')).toBe('snake_case')
    expect(toSnake('is_snake_case')).toBe('is_snake_case')
    expect(toSnake('snakeCase')).toBe('snake_case')
    expect(toSnake('isSnakeCase')).toBe('is_snake_case')
    expect(toSnake('SnakeCase')).toBe('snake_case')
  })
})
