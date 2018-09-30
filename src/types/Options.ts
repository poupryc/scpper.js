import { Api } from './Api'

export namespace Options {
  type method = 'and' | 'or'

  export interface Default {
    limit?: number
    site?: Api.site
  }

  export type findPage = Default & {
    method?: method
    random?: boolean
  }

  export type findTag = Default & {
    method?: method
    random?: boolean
  }

  export type findUser = Default & {}

  export type getPage = Default & {}

  export type getUser = Default & {}
}
