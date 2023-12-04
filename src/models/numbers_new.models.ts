export type PublishedEServicesMetric = {
  count: number
  lastMonthCount: number
  variation: number,
}

export type OnboardedTenantsCount = {
  totalCount: number
  lastMonthCount: number
  variation: number,
  name:string
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
  date:string,
  count:number
}
export type TopProducersMetric = TimedMetric<Array<{ producerName: string; count: number }>>

export type TenantOnboardingTrendMetric = TimedMetric<Array<{ id: string; name: string, data:OnboardingTrend[] }>>

export type TopProducersBySubscribersMetric = TimedMetric<
  Array<{
    producerName: string
    macroCategories: Array<{ id: string; name: string; subscribersCount: number }>
  }>
>

export type MostSubscribedEServicesMetric = Array<{
  id: string
  name: string
  mostSubscribedEServices: TimedMetric<
    Array<{ eserviceName: string; producerName: string; subscribersCount: number }>
  >
}>

export type EServicesByMacroCategoriesMetric = Array<{ id: string; name: string; count: number }>

export type Metrics = {
  publishedEServices: PublishedEServicesMetric
  eservicesByMacroCategories: EServicesByMacroCategoriesMetric
  topProducers: TopProducersMetric
  topProducersBySubscribers: TopProducersBySubscribersMetric
  mostSubscribedEServices: MostSubscribedEServicesMetric
}
