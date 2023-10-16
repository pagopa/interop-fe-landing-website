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
  | { id: '3'; name: 'Comuni e città metropolitane' }
  | { id: '4'; name: 'Province' }
  | { id: '5'; name: 'Pubbliche Amministrazioni Centrali' }
  | { id: '6'; name: 'Regioni' }
  | { id: '7'; name: 'Scuole' }
  | { id: '8'; name: 'Università e AFAM' }
  | { id: '9'; name: 'Istituti di Ricerca' }
  | { id: '10'; name: 'Stazioni Appaltanti' }
