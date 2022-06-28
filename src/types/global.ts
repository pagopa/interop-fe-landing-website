import type { ParsedUrlQuery } from 'querystring'
import { Locale } from '../../lib/constants'

export interface QueryParams extends ParsedUrlQuery {
  slug?: string
  lang?: Locale
}
