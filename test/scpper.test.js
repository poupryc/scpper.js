/* eslint-env mocha */
const chai = require('chai')
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised')

const { expect } = chai
const { Scpper } = require('../src/')

chai.use(chaiAsPromised)

describe('Test function of Scpper API Wrapper', function () {

  let scpper
  before(() => {
    scpper = new Scpper({ site: 'en' })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Test findPages', () => {
    it('Test findPages with "scp-002" query', async () => {
      const fake = nock(scpper.url)
        .get('/find-pages')
        .query({ title: 'scp-002', site: 'en' })
        .reply(200, require('./ressource/findPages-scp-002.json'))

      const result = await scpper.findPages('scp-002')

      return expect(result)
        .have.property('data').which
        .have.property('pages').to.be.an('array').with.length.above(1)
    })

    it('Test find page with site options "fr" for "scp-002-fr"', async () => {
      const fake = nock(scpper.url)
        .get('/find-pages')
        .query({ title: 'scp-002-fr', site: 'fr' })
        .reply(200, require('./ressource/findPages-scp-002-fr.json'))

      const result = await scpper.findPages('scp-002-fr', { site: 'fr' })

      return expect(result)
        .have.property('data').which
        .have.property('pages').to.be.an('array').with.length(1)
    })
  })

  it("Test getPage with the 173's page id", async () => {
    const fake = nock(scpper.url)
      .get('/page')
      .query({ id: 1956234, site: 'en' })
      .reply(200, require('./ressource/page-1956234.json'))

    const result = await scpper.getPage(1956234)

    return expect(result)
      .have.property('data').which
      .have.keys(['id', 'name', 'title', 'altTitle', 'status', 'kind', 'creationDate', 'rating', 'cleanRating', 'contributorRating', 'adjustedRating', 'wilsonScore', 'rank', 'authors'])
      .and.include({
        id: 1956234,
        name: 'scp-173',
        altTitle: 'The Sculpture - The Original'
      })
  })

  it("Test getUser with the Anqxyr's id", async () => {
    const fake = nock(scpper.url)
      .get('/user')
      .query({ id: 966960, site: 'en' })
      .reply(200, require('./ressource/user-966960.json'))

    const result = await scpper.getUser(966960)

    return expect(result)
      .have.property('data').which
      .have.keys(['id', 'name', 'displayName', 'deleted', 'activity'])
      .and.include({
        name: 'anqxyr',
        id: 966960
      })
  })

  it('Test findUsers with "clef" query', async () => {
    const fake = nock(scpper.url)
      .get('/find-users')
      .query({ name: 'clef', site: 'en' })
      .reply(200, require('./ressource/find-users-clef.json'))

    const result = await scpper.findUsers('clef')

    return expect(result)
      .have.property('data').which
      .have.property('users').to.be.an('array').with.length.above(1)
  })

  describe('Test tag search', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('Test tag search with "SCP" and "keter" in array', async () => {
      nock(scpper.url)
        .get('/tags')
        .query({ tags: '+scp,+keter', site: 'en' })
        .reply(200, require('./ressource/tag-scp-keter.json'))

      const result = await scpper.findWithTag(['+scp', '+keter'])

      expect(result)
        .have.property('data').which
        .have.property('pages').to.be.an('array').with.length.above(1)
    })

    it('Test tag search with "memetic" string', async () => {
      nock(scpper.url)
        .get('/tags')
        .query({ tags: '+memetic', site: 'en' })
        .reply(200, require('./ressource/tag-memetic.json'))

      const result = await scpper.findWithTag('memetic')

      return expect(result)
        .have.property('data').which
        .have.property('pages').to.be.an('array').with.length.above(1)
    })
  })
})

describe('Test module with incorrect URL', function () {

  let scpper
  before(() => {
    scpper = new Scpper({ url: 'http://scpper.com/api/that/does/not/exist' })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it("Test getPage with the 173's page id", () => {
    nock(scpper.url)
      .get('/page')
      .query(true)
      .reply(404)

    const result = scpper.getPage(1956234)

    return expect(result)
      .to.be.rejectedWith('CLIENT_ERROR')
  })

  it("Test getUser with the Anqxyr's id", () => {
    nock(scpper.url)
      .get('/user')
      .query(true)
      .reply(404)

    const result = scpper.getUser(966960)

    return expect(result)
      .to.be.rejectedWith('CLIENT_ERROR')
  })

  it('Test findPages with "scp-002"', () => {
    nock(scpper.url)
      .get('/find-pages')
      .query(true)
      .reply(404)

    const result = scpper.findPages('scp-002')

    return expect(result)
      .to.be.rejectedWith('CLIENT_ERROR')
  })

  it('Test findUsers with "clef" query', async () => {
    nock(scpper.url)
      .get('/find-users')
      .query(true)
      .reply(404)

    const result = scpper.findUsers('clef')

    return expect(result)
      .to.be.rejectedWith('CLIENT_ERROR')
  })

  it('Test tag search with "SCP" and "keter"', async () => {
    nock(scpper.url)
      .get('/tags')
      .query(true)
      .reply(404)

    const result = scpper.findWithTag(['+scp', '+keter'])

    return expect(result)
      .to.be.rejectedWith('CLIENT_ERROR')
  })
})

describe('Test "limit" options with 1', () => {

  let scpper
  before(() => {
    scpper = new Scpper({ limit: 1, site: 'en' })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('Test findPages with "173"', async () => {
    nock(scpper.url)
      .get('/find-pages')
      .query({ title: '173', site: 'en', limit: 1 })
      .reply(200, require('./ressource/find-page-173-limit1'))

    const result = await scpper.findPages('173')

    return expect(result)
      .have.property('data').which
      .have.property('pages').to.be.an('array').with.length(1)
  })

  it('Test findUsers with "clef" query', async () => {
    nock(scpper.url)
      .get('/find-users')
      .query({ name: 'clef', site: 'en', limit: 1 })
      .reply(200, require('./ressource/find-users-clef-limit1'))

    const result = await scpper.findUsers('clef')

    return expect(result)
      .have.property('data').which
      .have.property('users').to.be.an('array').with.length(1)
  })

  it('Test tag search with "scp" and "keter"', async () => {
    nock(scpper.url)
      .get('/tags')
      .query({ tags: '+scp,+keter', site: 'en', limit: 1 })
      .reply(200, require('./ressource/tags-scp-keter-limit1'))

    const result = await scpper.findWithTag(['+scp', '+keter'])

    return expect(result)
      .have.property('data').which
      .have.property('pages').to.be.an('array').with.length(1)
  })
})
