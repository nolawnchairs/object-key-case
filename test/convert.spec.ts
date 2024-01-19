
import { KeyConversionContext, convertObject } from '../src/convert'

describe('case covnersion', () => {

  it('should convert single level to camelCase', () => {
    const result = convertObject(new KeyConversionContext('camel'), {
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likes_count': 42,
      'comments_count': 3,
    })
    expect(result).toEqual({
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likesCount': 42,
      'commentsCount': 3,
    })
  })

  it('should convert single level to snake_case', () => {
    const result = convertObject(new KeyConversionContext('snake'), {
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likesCount': 42,
      'commentsCount': 3,
    })
    expect(result).toEqual({
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likes_count': 42,
      'comments_count': 3,
    })
  })

  it('should convert nested object to camelCase', () => {
    const result = convertObject(new KeyConversionContext('camel'), {
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likes_count': 42,
      'comments_count': 2,
      'author': {
        'id': 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
        'first_name': 'John',
        'last_name': 'Doe',
        'flags': [
          'verified',
          'admin',
        ],
        'comments': [
          { 'id': 'c1', 'body_text': 'First comment' },
          { 'id': 'c2', 'body_text': 'Second comment' },
        ],
      },
    })
    expect(result).toEqual({
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likesCount': 42,
      'commentsCount': 2,
      'author': {
        'id': 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
        'firstName': 'John',
        'lastName': 'Doe',
        'flags': [
          'verified',
          'admin',
        ],
        'comments': [
          { 'id': 'c1', 'bodyText': 'First comment' },
          { 'id': 'c2', 'bodyText': 'Second comment' },
        ],
      },
    })
  })

  it('should convert nested object to snake_case', () => {
    const result = convertObject(new KeyConversionContext('snake'), {
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likesCount': 42,
      'commentsCount': 2,
      'author': {
        'id': 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
        'firstName': 'John',
        'lastName': 'Doe',
        'flags': [
          'verified',
          'admin',
        ],
        'comments': [
          { 'id': 'c1', 'bodyText': 'First comment' },
          { 'id': 'c2', 'bodyText': 'Second comment' },
        ],
      },
    })
    expect(result).toEqual({
      'id': 'cb32a8c0-2f1c-4e6e-8b2a-5d5e6b7b8b1e',
      'title': 'My First Post',
      'likes_count': 42,
      'comments_count': 2,
      'author': {
        'id': 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
        'first_name': 'John',
        'last_name': 'Doe',
        'flags': [
          'verified',
          'admin',
        ],
        'comments': [
          { 'id': 'c1', 'body_text': 'First comment' },
          { 'id': 'c2', 'body_text': 'Second comment' },
        ],
      },
    })
  })

  it('should retain date objects', () => {
    const result = convertObject(new KeyConversionContext('camel'), {
      'created_at': new Date('2021-01-01T00:00:00.000Z'),
    })
    expect(result).toEqual({
      'createdAt': new Date('2021-01-01T00:00:00.000Z'),
    })
  })
})

