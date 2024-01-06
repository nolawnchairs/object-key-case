import {
  isCamelCase,
  isKvObject,
  isSnakeCase,
  toCamel,
  toSnake,
} from './util'

export type Case = 'camel' | 'snake'

export class KeyConversionException extends Error { }

export class KeyConversionContext {
  readonly keyCache = new Map<string, string>()
  readonly targetCase: Case

  /**
   * @param {Case} targetCase - The target case to convert to
   * @memberof ConversionContext
   *
   * @throws {KeyConversionException} If the target case is not "camel" or "snake"
   */
  constructor(targetCase: Case) {
    if (targetCase !== 'camel' && targetCase !== 'snake') {
      throw new KeyConversionException('Invalid target case. Must be "camel" or "snake"')
    }
    this.targetCase = targetCase
  }

  /**
   * Converts the keys of an object or array of objects with keys of the
   * specified case.
   *
   * @param {unknown} value - The object or array of objects to convert
   * @template T - The type of the object or array of objects
   * @return {*}  {T | Array<T>}
   * @memberof ConversionContext
   * @throws {KeyConversionException} If the object is not an object or array of key-value objects
   */
  convert<T = unknown>(value: unknown): T | Array<T> {
    // Short-curcuit if the value is null, undefined or not an object type
    if (!value || (value && typeof value !== 'object')) {
      throw new KeyConversionException('Invalid object or array')
    }
    // Short-curcuit if the value is an array of objects but the first object is not a key-value object
    if (Array.isArray(value) && !isKvObject(value[0])) {
      throw new KeyConversionException('Array contains invalid object')
    }
    // Short-curcuit if the value is an object but not a key-value object
    if (!isKvObject(value)) {
      throw new KeyConversionException('Invalid object')
    }

    if (Array.isArray(value)) {
      return (value as Record<string, unknown>[]).map(obj => convertObject(this, obj)) as Array<T>
    }
    return convertObject(this, value) as T
  }
}

/**
 * Converts the keys of an object or array of objects with keys of the
 * specified case.
 *
 * @export
 * @param {unknown} value - The object or array of objects to convert
 * @param {Case} targetCase - The target case to convert to
 */
export function convertKeyCase<T = unknown>(value: unknown, targetCase: Case): T | Array<T> {
  return new KeyConversionContext(targetCase).convert(value)
}

/**
 * Converts the key case of an object.
 *
 * @export
 * @param {KeyConversionContext} context - The conversion context
 * @param {Record<string, unknown>} object - The object to convert
 */
export function convertObject(context: KeyConversionContext, object: Record<string, unknown>) {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(object)) {
    if (!context.keyCache.has(key)) {
      const convertedKey = convertKey(context, key)
      context.keyCache.set(key, convertedKey)
      result[convertedKey] = convertValue(context, value)
    } else {
      result[context.keyCache.get(key)!] = convertValue(context, value)
    }
  }
  return result
}

/**
 * Converts the case of a key.
 *
 * @param {KeyConversionContext} context
 * @param {string} key
 * @return {*}  {string}
 */
function convertKey(context: KeyConversionContext, key: string): string {
  switch (context.targetCase) {
    case 'camel':
      return isCamelCase(key) ? key : toCamel(key)
    case 'snake':
      return isSnakeCase(key) ? key : toSnake(key)
  }
}

/**
 * Converts the case of a value if it is an object or array of objects.
 *
 * @param {KeyConversionContext} context
 * @param {unknown} value
 * @return {*}  {unknown}
 */
function convertValue(context: KeyConversionContext, value: unknown): unknown {
  if (isKvObject(value)) {
    return convertObject(context, value)
  }
  if (Array.isArray(value)) {
    return value.map(v => convertValue(context, v))
  }
  return value
}
