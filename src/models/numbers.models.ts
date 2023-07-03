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

export type NumbersEnv = 'prod' | 'test'

export interface InteropNumbers {
  descriptors: Record<NumbersEnv, NumbersData>
  tenants: Record<NumbersEnv, NumbersData>
  agreements: Record<NumbersEnv, NumbersData>
  purposes: Record<NumbersEnv, NumbersData>
  tokens: Record<NumbersEnv, NumbersData>
}
