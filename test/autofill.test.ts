import atest, { TestInterface } from 'ava'
import * as n from 'nock'

import { Scpper } from '../src'

type Context = { nock: n.Scope }

const test = atest as TestInterface<Context>

test.before(({ context }) => {
  context.nock = n('http://scpper.com/api/')
})

test.afterEach(() => n.cleanAll())

test('should add limit for each request', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ limit: 42 })

  nock
    .get(() => true)
    .times(5)
    .query(q => q.limit === '42')
    .reply(200)

  await t.notThrowsAsync(scpper.getPage('1956234'))
  await t.notThrowsAsync(scpper.findPages('173'))
  await t.notThrowsAsync(scpper.findUsers('clef'))
  await t.notThrowsAsync(scpper.findTag(['+scp']))
  await t.notThrowsAsync(scpper.getUser('966960'))
})

test('should add site for each request if provided', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ site: 'fr' })

  nock
    .get(() => true)
    .times(5)
    .query(q => q.site === 'fr')
    .reply(200)

  await t.notThrowsAsync(scpper.getPage('1956234'))
  await t.notThrowsAsync(scpper.findPages('173'))
  await t.notThrowsAsync(scpper.findUsers('clef'))
  await t.notThrowsAsync(scpper.findTag(['+scp']))
  await t.notThrowsAsync(scpper.getUser('966960'))
})

test('should overwrite default limit if given in options', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ limit: 42 })

  nock
    .get(() => true)
    .times(5)
    .query(q => q.limit === '24')
    .reply(200)

  const options = { limit: 24 }

  await t.notThrowsAsync(scpper.getPage('1956234', options))
  await t.notThrowsAsync(scpper.findPages('173', options))
  await t.notThrowsAsync(scpper.findUsers('clef', options))
  await t.notThrowsAsync(scpper.findTag(['+scp'], options))
  await t.notThrowsAsync(scpper.getUser('966960', options))
})

test('should overwrite default site if given in options', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ site: 'fr' })

  nock
    .get(() => true)
    .times(5)
    .query(q => q.site === 'cn')
    .reply(200)

  const options = { site: 'cn' as 'cn' }

  await t.notThrowsAsync(scpper.getPage('1956234', options))
  await t.notThrowsAsync(scpper.findPages('173', options))
  await t.notThrowsAsync(scpper.findUsers('clef', options))
  await t.notThrowsAsync(scpper.findTag(['+scp'], options))
  await t.notThrowsAsync(scpper.getUser('966960', options))
})

test('should delete site params if if given as null in options', async t => {
  const { nock } = t.context

  const scpper = new Scpper({ site: 'es' })

  nock
    .get(() => true)
    .times(5)
    .query(q => typeof q.site === 'undefined')
    .reply(200)

  const options = { site: null }

  await t.notThrowsAsync(scpper.getPage('1956234', options))
  await t.notThrowsAsync(scpper.findPages('173', options))
  await t.notThrowsAsync(scpper.findUsers('clef', options))
  await t.notThrowsAsync(scpper.findTag(['+scp'], options))
  await t.notThrowsAsync(scpper.getUser('966960', options))
})
