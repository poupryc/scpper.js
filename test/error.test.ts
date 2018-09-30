import atest, { TestInterface } from 'ava'
import * as n from 'nock'

import { Scpper } from '../src'

type Context = { nock: n.Scope }

const test = atest as TestInterface<Context>

test.before(({ context }) => {
  context.nock = n('http://scpper.com/api/')
})

test.afterEach(() => n.cleanAll())

test('should throw problem name', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ limit: 42 })

  nock
    .get(() => true)
    .times(5)
    .reply(404)

  const error = { message: 'CLIENT_ERROR' }

  await t.throwsAsync(scpper.getPage('1956234'), error)
  await t.throwsAsync(scpper.findPages('173'), error)
  await t.throwsAsync(scpper.findUsers('clef'), error)
  await t.throwsAsync(scpper.findTag(['+scp']), error)
  await t.throwsAsync(scpper.getUser('966960'), error)
})
