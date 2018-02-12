import { AxiosRequestConfig } from 'axios'

import { SiteInitial } from './SiteInitial'

export interface ScpperOptions {
  site: keyof typeof SiteInitial
  limit?: number
  url?: string
}
