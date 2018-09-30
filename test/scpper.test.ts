import test from 'ava'

import { Scpper } from '../src'
import { createApi } from '../src/util'

test('create new scpper', t => {
  t.notThrows(() => new Scpper())
})

test('`new scpper` should throw when instanciated with wrong options', t => {
  // @ts-ignore
  t.throws(() => new Scpper('lol'), {
    message: 'options should be an object',
    instanceOf: TypeError
  })

  t.notThrows(() => new Scpper({}))
})

test('should throw on incorrect site property', t => {
  t.throws(
    () =>
      // @ts-ignore
      new Scpper({ site: 'ca' }),
    { message: 'ca is not a valid wiki site' }
  )
})

test('should throw on incorrect limit property', t => {
  t.throws(
    () =>
      // @ts-ignore
      new Scpper({ limit: 'lol' }),
    { message: 'limit must be a number' }
  )
})

test('should have correct property', t => {
  const scpper = new Scpper({ site: 'fr', limit: 25 })

  t.is(scpper.limit, 25)
  t.is(scpper.site, 'fr')
})

test('should merge axios config', t => {
  const scpper = new Scpper({
    baseURL: 'https://google.com',
    headers: {
      test: 'hello'
    }
  })

  t.is(scpper.api.getBaseURL(), 'https://google.com')
  t.is(scpper.api.headers.test, 'hello')
})

test('should throw when setting an inccorect site', t => {
  const scpper = new Scpper()

  t.throws(
    () => {
      // @ts-ignore
      scpper.site = 'ca'
    },
    { message: 'ca is not a valid wiki site' }
  )

  t.not(scpper.site, 'ca')
})

test('should throw when setting an incorrect limit', t => {
  const scpper = new Scpper()

  t.throws(
    () => {
      // @ts-ignore
      scpper.limit = 'lol'
    },
    { message: 'limit must be a number' }
  )

  // @ts-ignore
  t.not(scpper.limit, 'ca')
})

test('should get API url', t => {
  const scpper = new Scpper({ baseURL: 'https://mysuper.scpper.api' })

  t.is(scpper.url, 'https://mysuper.scpper.api')
})

test('`createApi` should return apisauce object', t => {
  const api = createApi()
  t.truthy(api)
  t.truthy(api.axiosInstance)
})
