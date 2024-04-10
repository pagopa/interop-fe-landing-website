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
  id?: number
  type: string
  name: string
  data: number[]
  color?: string
}

export type PublishedEServicesMetric = {
  count: number
  lastMonthCount: number
  variation: number
}

export type OnboardedTenantsCount = {
  totalCount: number
  lastMonthCount: number
  variation: number
  name: string
}

export type TotalConnectionCount = {
  totalCount: number
  lastMonthCount: number
  variation: number
}

export type UsageCountMetric = {
  totalCount: number
  lastMonthCount: number
  variation: number
}
export type GeneralDataCard = {
  label: string
  value: number
  varationValue?: number
  varationPercentage: number
  varationLabel: string
  color: string
  varation: VariationCard
}

export type VariationCard = {
  label: string
  value?: string | number
  percentage: string | number
}

export type TenantDistributionCount = {
  activity: string
  count: number
}

export type TimedMetric<T> = {
  lastSixMonths: T
  lastTwelveMonths: T
  fromTheBeginning: T
}

export type TimeMetricKeys = keyof TimedMetric<unknown>

type OnboardingTrend = {
  date: string
  count: number
}
export type TopProducersMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      producerName: string
      count: number
    }>
  }>
>

export type TenantOnboardingTrendMetric = OnboardingTrend[]

export type MacrocategoriesOnboardingTrendMetric = TimedMetric<
  Array<{ id: string; name: string; data: OnboardingTrend[]; totalCount?: number }>
>

export type TopProducersBySubscribersMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      producerName: string
      macroCategories: Array<{ id: string; name: string; subscribersCount: number }>
    }>
  }>
>

export type TopEservicesData = {
  eserviceName: string
  producerName: string
  totalActiveConsumers: number
  activeConsumersByMacroCategory: Array<{
    id: MacroCategory['id']
    name: string
    count: number
  }>
}
export type TopEServiceMetricItem = {
  id: string
  name: string
  data: Array<TopEservicesData>
}

export type TopEservicesMetric = TimedMetric<Array<TopEServiceMetricItem>>
export type TopEservicesByTokenMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      eserviceId: string
      eserviceName: string
      producerName: string
      tokenCount: number
    }>
  }>
>

export type MostSubscribedEServicesMetric = TimedMetric<
  Array<{
    id: string
    name: string
    data: Array<{
      id: string
      name: string
      mostSubscribedEServices: Array<{
        eserviceName: string
        producerName: string
        subscribersCount: number
      }>
    }>
  }>
>

export type PlatformActivitiesMetric = TimedMetric<Array<{ date: string; count: number }>>

export type EServicesByMacroCategoriesMetric = Array<{ id: string; name: string; count: number }>

export type Metrics = {
  dataDiPubblicazione: string
  totaleEnti: OnboardedTenantsCount[]
  connessioniTotali: TotalConnectionCount
  andamentoDelleAdesioni: TenantOnboardingTrendMetric
  andamentoDelleAdesioniPerCategoria: MacrocategoriesOnboardingTrendMetric
  distribuzioneDegliEntiPerAttivita: TenantDistributionCount[]
  eservicePubblicati: PublishedEServicesMetric
  distribuzioneEServicePerEntiErogatori: EServicesByMacroCategoriesMetric
  entiChePubblicanoPiuEService: TopProducersMetric
  entiConPiuConnessioniAbilitate: TopProducersBySubscribersMetric
  eServiceConPiuEntiAbilitati: MostSubscribedEServicesMetric
  totaleRichiesteDiAccesso: UsageCountMetric
  attivitaDellaPiattaforma: PlatformActivitiesMetric
  eServicePiuUtilizzati: TopEservicesMetric
  eserviceConPiuTokenStaccati: TopEservicesByTokenMetric
}
