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

export type Timeframe = 'lastSixMonths' | 'lastTwelveMonths' | 'fromTheBeginning'
export type MacroCategory =
  | { id: '0'; name: 'Tutte' }
  | { id: '1'; name: 'Altre Pubbliche Amministrazioni locali' }
  | { id: '2'; name: 'Aziende Ospedaliere e ASL' }
  | { id: '3'; name: 'Comuni' }
  | { id: '4'; name: 'Province e città metropolitane' }
  | { id: '5'; name: 'Pubbliche Amministrazioni Centrali' }
  | { id: '6'; name: 'Enti Nazionali di Previdenza ed Assistenza Sociale' }
  | { id: '7'; name: 'Regioni e Province autonome' }
  | { id: '8'; name: 'Consorzi e associazioni regionali' }
  | { id: '9'; name: 'Scuole' }
  | { id: '10'; name: 'Università e AFAM' }
  | { id: '11'; name: 'Istituti di Ricerca' }
  | { id: '12'; name: 'Stazioni Appaltanti e Gestori di pubblici servizi' }
  | { id: '13'; name: 'Privati' }

export type SeriesDataLineChart = SerieDataLineChart[]

export interface SerieDataLineChart {
  type: string
  name: string
  data: number[]
  color?: string
}
