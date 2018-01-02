import { AxiosRequestConfig } from 'axios'

import { SiteInitial } from './SiteInitial'

export interface ScpperOptions {
  site: SiteInitial
  limit?: number
  url?: string
}
