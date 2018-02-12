import * as nock from 'nock'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

import { Scpper } from '../src'
const { expect } = chai

chai.use(chaiAsPromised)

describe('Testing instance creation', () => {
  it('Throw error when creating instance without argument', () => {
    expect(() => {
      const scpper = new Scpper()
    }).to.throw('Configuration must be present')
  })

  describe('Test constructor property', () => {

    it('Creating instance with correct "site" property', () => {
      let scpper: Scpper
      expect(() => {
        scpper = new Scpper({ site: 'en' })
      }).to.not.throw()

      expect(scpper.site).to.be.equal('en')
    })

    it('Creating instance with "limit" property', () => {
      let scpper: Scpper
      expect(() => {
        scpper = new Scpper({ site: 'en', limit: 25 })
      }).to.not.throw()

      expect(scpper.site).to.be.equal('en')
      expect(scpper.limit).to.be.equal(25)
    })

    it('Throw error when creating instance without "site" property', () => {
      expect(() => {
        const scpper = new Scpper({ blabla: 'blabla !' })
      }).to.throw('You need to pass "site" property')
    })

    it('Throw error when creating instance with incorrect "site" property', () => {
      expect(() => {
        const scpper = new Scpper({ site: 'be' })
      }).to.throw('Branch "be" is not supported yet.')
    })
  })

  it('Creating instance with "site", "limit" & "url" properties', () => {
    let scpper: Scpper
    expect(() => {
      scpper = new Scpper({ site: 'en', limit: 10, url: 'https://api.foundation.com/does/not/exist' })
    }).to.not.throw()

    expect(scpper.site).to.be.equal('en')
    expect(scpper.limit).to.be.equal(10)
    expect(scpper.url).to.be.equal('https://api.foundation.com/does/not/exist')
  })
})

describe('Testing URL calls', () => {
  let scpper: Scpper
  before(() => {
    scpper = new Scpper({ site: 'en' })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('Test get page', () => {
    nock(scpper.url)
      .get('/page')
      .query({ id: 1956234, site: 'en' })
      .reply(200)

    return expect(scpper.getPage(1956234))
      .to.not.be.rejected
  })

  it('Test get user', () => {
    nock(scpper.url)
      .get('/user')
      .query({ id: 966960, site: 'en' })
      .reply(200)

    return expect(scpper.getUser(966960))
      .to.not.be.rejected
  })

  it('Test find pages', () => {
    nock(scpper.url)
      .get('/find-pages')
      .query({ title: '173', site: 'en' })
      .reply(200)

    return expect(scpper.findPages('173'))
      .to.not.be.rejected
  })

  it('Test find users', () => {
    nock(scpper.url)
      .get('/find-users')
      .query({ name: 'clef', site: 'en' })
      .reply(200)

    return expect(scpper.findUsers('clef'))
      .to.not.be.rejected
  })

  describe('Test tag search', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('With array', () => {
      nock(scpper.url)
        .get('/tags')
        .query({ tags: '+scp,+keter', site: 'en' })
        .reply(200)

      return expect(scpper.findWithTag(['+scp', '+keter']))
        .to.not.be.rejected
    })

    it('With string', () => {
      nock(scpper.url)
        .get('/tags')
        .query({ tags: '+scp', site: 'en' })
        .reply(200)

      return expect(scpper.findWithTag('scp'))
        .to.not.be.rejected
    })
  })

  describe('Test with custom "limit" property', () => {
    let scpper: Scpper
    before(() => {
      scpper = new Scpper({ site: 'en', limit: 5 })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('Test get page', () => {
      nock(scpper.url)
        .get('/page')
        .query({ id: 1956234, site: 'en', limit: 5 })
        .reply(200)

      return expect(scpper.getPage(1956234))
        .to.not.be.rejected
    })

    it('Test get user', () => {
      nock(scpper.url)
        .get('/user')
        .query({ id: 966960, site: 'en', limit: 5 })
        .reply(200)

      return expect(scpper.getUser(966960))
        .to.not.be.rejected
    })

    it('Test find pages', () => {
      nock(scpper.url)
        .get('/find-pages')
        .query({ title: '173', site: 'en', limit: 5 })
        .reply(200)

      return expect(scpper.findPages('173'))
        .to.not.be.rejected
    })

    it('Test find users', () => {
      nock(scpper.url)
        .get('/find-users')
        .query({ name: 'clef', site: 'en', limit: 5 })
        .reply(200)

      return expect(scpper.findUsers('clef'))
        .to.not.be.rejected
    })

    describe('Test tag search', () => {
      afterEach(() => {
        nock.cleanAll()
      })

      it('With array', () => {
        nock(scpper.url)
          .get('/tags')
          .query({ tags: '+scp,+keter', site: 'en', limit: 5 })
          .reply(200)

        return expect(scpper.findWithTag(['+scp', '+keter']))
          .to.not.be.rejected
      })

      it('With string', () => {
        nock(scpper.url)
          .get('/tags')
          .query({ tags: '+scp', site: 'en', limit: 5 })
          .reply(200)

        return expect(scpper.findWithTag('scp'))
          .to.not.be.rejected
      })
    })
  })

  describe('Test with custom options', () => {
    it('Test custom "limit"', () => {
      const rand = Math.floor(Math.random() * (50 - 1)) + 1

      nock(scpper.url)
        .get('/find-pages')
        .query({ title: '173', site: 'en', limit: rand })
        .reply(200)

      return expect(scpper.findPages('173', {
        limit: rand
      }))
        .to.not.be.rejected
    })

    it('Test custom "site"', () => {
      nock(scpper.url)
        .get('/find-pages')
        .query({ title: '173', site: 'fr' })
        .reply(200)

      return expect(scpper.findPages('173', {
        site: 'fr'
      }))
        .to.not.be.rejected
    })
  })

})

describe('Test methods rejections', () => {
  let scpper: Scpper
  before(() => {
    scpper = new Scpper({ site: 'en' })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('client error', () => {
    it('Test find pages', () => {
      nock(scpper.url)
        .get('/find-pages')
        .query(true)
        .reply(404)

      return expect(scpper.findPages('guide'))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

    it('Test get page', () => {
      nock(scpper.url)
        .get('/page')
        .query(true)
        .reply(404)

      return expect(scpper.getPage(1956234))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

    it('Test get user', () => {
      nock(scpper.url)
        .get('/user')
        .query(true)
        .reply(404)

      return expect(scpper.getUser(966960))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

    it('Test find pages', () => {
      nock(scpper.url)
        .get('/find-pages')
        .query(true)
        .reply(404)

      return expect(scpper.findPages('173'))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

    it('Test find users', () => {
      nock(scpper.url)
        .get('/find-users')
        .query(true)
        .reply(404)

      return expect(scpper.findUsers('clef'))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

    it('Test with find tags', () => {
      nock(scpper.url)
        .get('/tags')
        .query(true)
        .reply(404)

      return expect(scpper.findWithTag(['+scp', '+keter']))
        .to.be.rejectedWith('CLIENT_ERROR')
    })

  })
})
