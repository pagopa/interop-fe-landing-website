import type { ParsedUrlQuery } from 'querystring'
import { Locale } from '../../lib/constants'

export interface QueryParams extends ParsedUrlQuery {
  slug?: string
  lang?: Locale
}

export type Env = 'prod' | 'test'

export interface NumbersData {
  primary: number
  secondary: number
  graph: Array<{
    time: string
    value: number
  }>
}

export interface InteropNumbersResponseData {
  descriptors: NumbersData
  tenants: NumbersData
  agreements: NumbersData
  purposes: NumbersData
  tokens: NumbersData
}

export interface InteropNumbers {
  descriptors: Record<Env, NumbersData>
  tenants: Record<Env, NumbersData>
  agreements: Record<Env, NumbersData>
  purposes: Record<Env, NumbersData>
  tokens: Record<Env, NumbersData>
}
