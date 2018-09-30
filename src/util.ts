import * as apisauce from 'apisauce'

import { Scpper } from './Scpper'

/**
 * API base URL
 */
const BASE_URL = 'http://scpper.com/api/'

/**
 * Create Scpper API
 * @param override override default config
 */
export const createApi = (override: Partial<apisauce.ApisauceConfig> = {}) =>
  apisauce.create({
    ...{ baseURL: BASE_URL },
    ...override
  })

/**
 * Throw error if the value is false
 * @param value value
 * @param message message
 */
export const assert = (value: boolean, message: string) => {
  if (value === false) throw new TypeError(message)
}

/**
 * Add request tranformer
 * @param this Scpper instance
 * @param api internal API
 */
export function fillRequest(scpper: Scpper, api: apisauce.ApisauceInstance) {
  api.addRequestTransform(({ params }) => {
    if (!params.hasOwnProperty('site')) {
      const s = scpper.site
      if (s) params.site = s
    }
    if (params.site === null) delete params.site

    if (!params.hasOwnProperty('limit')) params.limit = scpper.limit
  })
}
