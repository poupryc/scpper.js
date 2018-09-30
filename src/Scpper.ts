import * as apisauce from 'apisauce'

import { Api, Options } from './types'
import { createApi, assert, fillRequest } from './util'

export class Scpper {
  private _api: apisauce.ApisauceInstance
  private _site: Api.site = null
  private _limit: number = 10

  constructor(options: Api.Options = {}) {
    assert(typeof options === 'object', 'options should be an object')

    const api = createApi(options)
    fillRequest(this, api)

    this._api = api

    if (options.limit) this.limit = options.limit
    if (options.site) this.site = options.site
  }

  /**
   * Retrieve a page by id
   * @param id page id
   */
  public async getPage(id: string, options: Options.getPage = {}) {
    const response = await this.api.get<Api.PageItem>('page', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Retrieve a user by id
   * @param id user id
   */
  public async getUser(id: string, options: Options.getUser = {}) {
    const response = await this.api.get<Api.UserItem>('user', {
      id,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Retrieve up to limit pages from the specified
   * wiki with the name matching title
   * @param search search
   * @param options page search options
   */
  public async findPages(search: string, options: Options.findPage = {}) {
    const response = await this.api.get<Api.searchPage>('find-pages', {
      title: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Retrieves up to limit users from the with part of
   * the name matching name
   * @param search search
   * @param options user search options
   */
  public async findUsers(search: string, options: Options.findUser = {}) {
    const response = await this.api.get<Api.searchUser>('find-users', {
      name: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Retrieve up to limit pages, selected using provided tags
   * @param tag list of tags, each prefixed with "+" or "-", separated by commas
   * @param options tag search options
   */
  public async findTag(tag: string | string[], options: Options.findTag = {}) {
    const search = Array.isArray(tag) ? tag.join(',') : tag

    const response = await this.api.get<Api.searchTag>('tags', {
      tags: search,
      ...options
    })

    if (!response.ok) throw new Error(response.problem)

    return response
  }

  /**
   * Internal API object
   */
  get api() {
    return this._api
  }

  /**
   * Scppper item limit
   */
  get limit() {
    return this._limit
  }

  /**
   * Set Scpper item limit
   */
  set limit(limit: number) {
    assert(typeof limit === 'number', 'limit must be a number')

    this._limit = limit
  }

  /**
   * Scpper's search default site
   */
  get site() {
    return this._site
  }

  /**
   * Set default site for Scpper's search
   */
  set site(site: Api.site) {
    // @ts-ignore
    site = site.toLowerCase()

    assert(site in Api.SiteInitial, `${site} is not a valid wiki site`)

    this._site = site
  }

  /**
   * Get API URL
   */
  get url() {
    return this.api.getBaseURL()
  }
}
