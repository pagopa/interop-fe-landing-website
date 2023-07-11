export interface NumbersData {
  primary: number
  secondary: number
  graph: Array<{
    time: string
    value: number
  }>
}
export type NumbersEnv = 'prod' | 'test'

export interface InteropNumbers {
  descriptors: NumbersData
  tenants: NumbersData
  agreements: NumbersData
  purposes: NumbersData
  tokens: NumbersData
}
