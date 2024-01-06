
# Object Key Case

Utilty package that converts all keys in an object to/from `camelCase` or `snake_case`.

## Motivation

It's an unwritten rule that all keys in a JavaScript object should be `camelCase`. However, there are times when you need to convert to/from `snake_case` for use with a database or API. This package provides a simple way to convert between the two.

## Installation

```bash
npm install @nolawnchairs/object-key-case
```

## Usage

The functional approach is to use the `convertKeyCase` function.

```typescript
import { convertKeyCase } from '@nolawnchairs/object-key-case'

// An API request returns an object with snake_case keys
const data = await fetch('https://example.com/api')
    .then((res) => res.json())
    .then((data) => convertKeyCase(data, 'camel'))
```

There is also the object-oriented approach using the `KeyConversionContext` class. This class when instantiated will retain state, which caches the conversion result for each key. This is beneficial when processing an array of multiple objects of the same shape, or many requests over time, as the regex-based conversion only needs to be computed once per key.

```typescript
import { KeyConversionContext } from '@nolawnchairs/object-key-case'

// Create a context for converting to camelCase
// All key conversions will be cached within this context
const context = new KeyConversionContext('camel')

// An API request returns an object with snake_case keys
const data = await fetch('https://example.com/api')
    .then((res) => res.json())
    .then((data) => context.convert(data))
```

Both `convertKeyCase` and `KeyConversionContext#convert` either accept an object with key value pairs or an array of the same. An error will be thrown if any other data type is provided. For convenience, all errors thrown by this package are instances of `ConversionException`. This is simply a subclass of `Error` that can be matched in a catch block using `instanceof`.

```typescript
import { convertKeyCase, KeyConversionException } from '@nolawnchairs/object-key-case'

try {
    convertKeyCase('not an object', 'camel')
} catch (e) {
    if (e instanceof KeyConversionException) {
        // Handle error
    }
}
```

The value arguments for `convertKeyCase` and `KeyConversionContext#convert` accept an `unknown` type, and an optional generic type `T` and will return `T | Array<T>`. The generic is applied to the result of the operation. If no type argument is provided, the return type will be `unknown | Array<unknown>`.

```typescript
import { convertKeyCase } from '@nolawnchairs/object-key-case'

interface User {
    id: number
    firstName: string
    lastName: string
}

const data = await fetch('https://example.com/api')
    .then((res) => res.json())
    .then((data) => convertKeyCase<User>(data, 'camel'))
    // data is now of type User or Array<User>
```

Note that no data validation is performed. If the input data is not of the expected shape, the result will be unpredictable.
