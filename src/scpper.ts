import * as apisauce from 'apisauce'

import { ScpperOptions } from './typings/ScpperOptions'
import { SiteInitial } from './typings/SiteInitial'
import { AxiosRequestConfig } from 'axios'
import { Root } from './typings/ScpperAPI'
import { FindPagesOptions, FindUsersOptions, FindWithTag } from './typings/FindOptions'

export class Scpper {
  public readonly url: string = 'http://scpper.com/api/'
  public readonly api: apisauce.ApisauceInstance
  public readonly site: SiteInitial
  public readonly limit: number

  constructor (options: ScpperOptions, config?: AxiosRequestConfig) {
    if (options.url) {
      this.url = options.url
    }

    this.site = options.site
    this.limit = options.limit

    this.api = apisauce.create({
      baseURL: this.url,
      ...config
    })

    // Auto-fill "site" and "limit" on each request.
    this.api.addRequestTransform(request => {
      // Fill "site" if site is not provided
      if (!request.params.site) {
        request.params.site = this.site
      }

      // Fill "limit" if limit is not provided and if limit is provided in options
      if (!request.params.limit && this.limit) {
        request.params.limit = this.limit
      }
    })
  }

  /**
   * @param id wikidot id of the requested page
   */
  public async getPage (id: number) {
    const response = await this.api.get('page', { id }) as apisauce.ApiResponse<Root>

    if (!response.ok) {
      throw new Error(response.problem)
    }

    return response
  }

  /**
   * @param id wikidot id of the requested user
   */
  public async getUser (id: number) {
    const response = await this.api.get('user', { id }) as apisauce.ApiResponse<Root>

    if (!response.ok) {
      throw new Error(response.problem)
    }

    return response
  }

  /**
   * @param search the page search to be performed on scpperDB
   */
  public async findPages (search: string, options: FindPagesOptions = {}) {
    const response = await this.api.get('find-pages', {
      title: search,
      ...options
    }) as apisauce.ApiResponse<Root>

    if (!response.ok) {
      throw new Error(response.problem)
    }

    return response
  }

  /**
   * @param search the user search to be performed on scpperDB
   */
  public async findUsers (search: string, options: FindUsersOptions = {}) {
    const response = await this.api.get('find-users', {
      name: search,
      ...options
    }) as apisauce.ApiResponse<Root>

    if (!response.ok) {
      throw new Error(response.problem)
    }

    return response
  }

  /**
   * @param tag the tag(s) search to be performed on scpperDB
   */
  public async findWithTag (tag: string | string[], options: FindWithTag = {}) {
    if (tag instanceof Array) {
      tag = tag.join(',')
    } else {
      tag = `+${tag}`
    }

    const response = await this.api.get('tags', {
      tags: tag,
      ...options
    }) as apisauce.ApiResponse<Root>

    if (!response.ok) {
      throw new Error(response.problem)
    }

    return response
  }
}
