
export function toCamel(key: string): string {
  const camelCase = key.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
  return camelCase.charAt(0).toLowerCase() + camelCase.slice(1)
}

export function toSnake(key: string): string {
  return key.replace(/([A-Z])/g, ($1) => {
    return `_${$1.toLowerCase()}`
  }).replace(/^_/, '')
}

export function isCamelCase(str: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(str)
}

export function isSnakeCase(str: string): boolean {
  return /^[a-z][a-z0-9_]*$/.test(str)
}

export function isKvObject(obj: unknown): obj is Record<string, unknown> {
  return !!obj && typeof obj === 'object'
    && !(obj instanceof Date)
    && !Array.isArray(obj)
    && Object.getOwnPropertyNames(obj).every(key => typeof key === 'string')
}
