import * as apisauce from 'apisauce'

import { Options } from './Options'

export namespace Api {
  export type site = keyof typeof SiteInitial

  export interface Options
    extends Partial<apisauce.ApisauceConfig>,
      Options.Default {}

  export enum SiteInitial {
    en = 'en',
    ru = 'ru',
    ko = 'ko',
    ja = 'ja',
    fr = 'fr',
    es = 'es',
    th = 'th',
    pl = 'pl',
    de = 'de',
    cn = 'cn',
    it = 'it',
    int = 'int'
  }

  export enum SiteUrl {
    en = 'http://scp-wiki.net',
    ru = 'http://scpfoundation.ru',
    ko = 'http://ko.scp-wiki.net',
    ja = 'http://ja.scp-wiki.net',
    fr = 'http://fondationscp.wikidot.com',
    es = 'http://lafundacionscp.wikidot.com',
    th = 'http://scp-th.wikidot.com',
    pl = 'http://scp-wiki.net.pl',
    de = 'http://scp-wiki-de.wikidot.com',
    cn = 'http://scp-wiki-cn.wikidot.com',
    it = 'http://fondazionescp.wikidot.com',
    int = 'http://scp-int.wikidot.com'
  }

  export type searchPage = {
    pages: PageItem[]
  }

  export type searchUser = {
    users: PageItem[]
  }

  export type searchTag = searchPage

  export interface AuthorField {
    user: string
    role: string
    id?: number
  }

  export interface PageItem {
    id: number
    site: string
    name: string
    title: string
    altTitle: null | string
    status: 'Translation' | 'Original'
    kind: 'SCP' | 'Unknown'
    creationDate: DateField
    rating: number
    cleanRating: number
    contributorRating: number
    adjustedRating: number
    wilsonScore: number
    rank: number
    authors: AuthorField[]
    deleted: boolean
  }

  export interface UserItem {
    id: number
    name: string
    displayName: string
    deleted: number
    activity: Record<string, ActivityField>
  }

  export interface ActivityField {
    votes: number
    revisions: number
    pages: number
    lastActive?: DateField
    member: DateField
    highestRating?: number
    totalRating?: number
  }

  export interface DateField {
    date: string
    timezone_type: number
    timezone: string
  }
}
