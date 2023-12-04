import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataSectionWrapper } from '@/components/numbers/DataSectionWrapper'
import { useGetInteropNumbersNew } from '@/services/numbers_new.services'
import { DataCard } from '../numbers/DataCard'
import { formatThousands } from '@/utils/formatters.utils'
import { OnboardedTenantsCount, PublishedEServicesMetric, TenantDistributionCount } from '@/models/numbers_new.models'
import { ChartAndTableWrapper } from '../numbers/ChartAndTableWrapper'
import EServicesByMacroCategories from './EServicesByMacroCategories'
import TopProducersBySubscribers from './TopProducersBySubscribers'
import MostSubscribedEServices from './MostSubscribedEservices'
import TopProducers from './TopProducers'
import { color } from 'echarts'
import mockData from "../../../public/data/mock.json"
import EServicesByTenantDistribution from './EServicesByTenantDistribution'
import TenantOnboardingTrend from './TenantOnboardingTrend'
import TotalEntiTenantOnboardingTrend from './TotalEntiTenantOnboardingTrend'

const NumbersPageContent: React.FC = () => {
  // const { data } = useGetInteropNumbersNew()
  const data = mockData

  if (!data) {
    return null
  }

  const {
    publishedEServices,
    eservicesByMacroCategories,
    topProducersBySubscribers,
    mostSubscribedEServices,
    topProducers,
    onboardedTenantsCount,
    tenantDistribution,
    tenantOnboardingTrend
  } = data
  
  let totaleEnti = onboardedTenantsCount.find((el) => el.name === 'Totale')
  let tenantsCard = onboardedTenantsCount.filter((el) => el.name !== 'Totale')
  let totalTenantDistribution = 0
  tenantDistribution.forEach(el => {totalTenantDistribution += el.count})
  return (
    <Box component="main">
      <DataSectionWrapper
        anchor="adesione"
        title="Enti aderenti"
        description="Per abilitare l’interoperabilità dei dati è necessario che gli enti aderiscano alla piattaforma"
        background="grey"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <TenantsCountCard data={totaleEnti!} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Andamento delle adesioni"
              description="Numeri progressivo di enti che aderiscono alla piattaforma"
            >
              {/* <EServicesByMacroCategories data={eservicesByMacroCategories} /> */}
              <TotalEntiTenantOnboardingTrend data={tenantOnboardingTrend} />
            </ChartAndTableWrapper>
          </Grid>
          {tenantsCard.map(item => <Grid item xs={12} lg={4}>
            <TenantsCountCard data={item} />
          </Grid>)}


          <Grid item xs={12} lg={12}>
          <TenantOnboardingTrend data={tenantOnboardingTrend} />
        
          </Grid>


          <Grid item xs={12} lg={4}>
            <Grid spacing={3} container>

              {tenantDistribution.map(item => <Grid item xs={12} lg={12}>
                <TenantsDistributionCard data={item} total={totalTenantDistribution} />
              </Grid>)}

            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Distribuzione degli enti per attività"
              description="Numero di: enti erogatori che mettono a disposizione e-service; enti fruitori che li utilizzano; enti sia erogatori che fruitori; enti che effettuano solo l’accesso alla piattaforma"
            >
              <EServicesByTenantDistribution data={tenantDistribution} totale={totalTenantDistribution} />
            </ChartAndTableWrapper>
          </Grid>

        </Grid>
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="pubblicazione"
        title="Pubblicazione"
        description="Per consentire l’accesso ai dati da parte degli enti fruitori, l’ente erogatore realizza e pubblica a catalogo gli e-service"
        background="grey"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <TotalEServicesCard data={publishedEServices} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Categorie di erogatori"
              description="Numeri di e-service per categoria di ente erogatore"
            >
              <EServicesByMacroCategories data={eservicesByMacroCategories} />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>

        <TopProducers data={topProducers} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="abilitazione"
        title="Abilitazione"
        description="Per accedere la prima volta a un e-service, l’ente interessato deve essere autorizzato dall’ente erogatore"
      >
        <TopProducersBySubscribers data={topProducersBySubscribers} />
        <MostSubscribedEServices data={mostSubscribedEServices} />
      </DataSectionWrapper>
    </Box>
  )
}

const TotalEServicesCard = ({ data }: { data: PublishedEServicesMetric }) => {
  const { count, lastMonthCount, variation } = data

  return (
    <DataCard
      label="E-service pubblicati"
      value={formatThousands(count)}
      variation={{
        value: formatThousands(lastMonthCount),
        percentage: variation,
        label: 'rispetto al mese precedente'
      }}
      color={'E-service pubblicati'}

    />
  )
}

const TenantsCountCard = ({ data }: { data: OnboardedTenantsCount }) => {
  const { totalCount, lastMonthCount, variation, name } = data

  return (
    <DataCard
      label={name && name === 'Totale' ? 'Totale Enti' : name}
      value={formatThousands(totalCount)}
      variation={{
        value: formatThousands(lastMonthCount),
        percentage: variation,
        label: 'rispetto al mese precedente',
      }} color={name}
    />
  )
}

const TenantsDistributionCard = ({ data,total }: { data: TenantDistributionCount, total: number }) => {
  const { activity, count } = data
  return (
    <DataCard
      label={activity}
      value={formatThousands(count)}
      variation={{
        percentage: Math.round((count/total)*100),
        label: `su ${total} enti aderenti`,
      }} color={activity}
    />
  )
}


export default NumbersPageContent
