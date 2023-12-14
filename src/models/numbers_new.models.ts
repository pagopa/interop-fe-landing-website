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

export type TenantDistributionCount = {
  activity: string
  count: number
}

type TimedMetric<T> = {
  lastSixMonths: T
  lastTwelveMonths: T
  fromTheBeginning: T
}
type OnboardingTrend = {
  date: string
  count: number
}
export type TopProducersMetric = TimedMetric<Array<{ producerName: string; count: number }>>

export type TenantOnboardingTrendMetric = TimedMetric<
  Array<{ id: string; name: string; data: OnboardingTrend[] }>
>

export type TopProducersBySubscribersMetric = TimedMetric<
  Array<{
    producerName: string
    macroCategories: Array<{ id: string; name: string; subscribersCount: number }>
  }>
>

export type MostSubscribedEServicesMetric = TimedMetric<
  Array<{
    id: string
    name: string
    mostSubscribedEServices: Array<{
      eserviceName: string
      producerName: string
      subscribersCount: number
    }>
  }>
>

export type EServicesByMacroCategoriesMetric = Array<{ id: string; name: string; count: number }>

export type Metrics = {
  dataDiPubblicazione: string
  totaleEnti: OnboardedTenantsCount[]
  statoDiCompletamentoAdesioni: TenantOnboardingTrendMetric
  distribuzioneDegliEntiPerAttivita: TenantDistributionCount[]
  eservicePubblicati: PublishedEServicesMetric
  entiErogatoriDiEService: EServicesByMacroCategoriesMetric
  entiChePubblicanoPiuEService: TopProducersMetric
  entiErogatoriEdEntiAbilitatiAllaFruizione: TopProducersBySubscribersMetric
  eserviceConPiuEntiAbilitati: MostSubscribedEServicesMetric
}
