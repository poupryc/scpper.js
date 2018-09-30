import atest, { TestInterface } from 'ava'
import * as n from 'nock'

import { Scpper } from '../src'

type Context = {
  nock: n.Scope
  scpper: Scpper
}

const test = atest as TestInterface<Context>

test.before(({ context }) => {
  context.nock = n('http://scpper.com/api/')
  context.scpper = new Scpper()
})

test.afterEach(() => n.cleanAll())

test('test if URL is valid for getPage', async t => {
  const { scpper, nock } = t.context

  nock
    .get('/page')
    .query(q => q.id === '1956234')
    .reply(200)

  await t.notThrowsAsync(scpper.getPage('1956234'))
})

test('test if URL is valid for getUser', async t => {
  const { scpper, nock } = t.context

  nock
    .get('/user')
    .query(q => q.id === '966960')
    .reply(200)

  await t.notThrowsAsync(scpper.getUser('966960'))
})

test('test if URL is valid for findPages', async t => {
  const { scpper, nock } = t.context

  nock
    .get('/find-pages')
    .query(q => q.title === '173')
    .reply(200)

  await t.notThrowsAsync(scpper.findPages('173'))
})

test('test if URL is valid for findUsers', async t => {
  const { scpper, nock } = t.context

  nock
    .get('/find-users')
    .query(q => q.name === 'clef')
    .reply(200)

  await t.notThrowsAsync(scpper.findUsers('clef'))
})

test('test if URL is valid for findTag with string array', async t => {
  const { scpper, nock } = t.context

  const tags = ['+scp', '+keter']

  nock
    .get('/tags')
    .query(q => q.tags === tags.join(','))
    .reply(200)

  await t.notThrowsAsync(scpper.findTag(tags))
})

test('test if URL is valid for findTag with string', async t => {
  const { scpper, nock } = t.context

  const tags = '+scp'

  nock
    .get('/tags')
    .query(q => q.tags === tags)
    .reply(200)

  await t.notThrowsAsync(scpper.findTag(tags))
})
