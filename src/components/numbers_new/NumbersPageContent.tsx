import React from 'react'
import { Alert, Box, Grid } from '@mui/material'
import { DataSectionWrapper } from '@/components/numbers/DataSectionWrapper'
import { DataCard } from '../numbers/DataCard'
import { formatThousands } from '@/utils/formatters.utils'
import {
  Metrics,
  OnboardedTenantsCount,
  PublishedEServicesMetric,
  TenantDistributionCount,
} from '@/models/numbers_new.models'
import { ChartAndTableWrapper } from '../numbers/ChartAndTableWrapper'
import EServicesByMacroCategories from './EServicesByMacroCategories'
import TopProducersBySubscribers from './TopProducersBySubscribers'
import MostSubscribedEServices from './MostSubscribedEservices'
import TopProducers from './TopProducers'
import EServicesByTenantDistribution from './EServicesByTenantDistribution'
import TenantOnboardingTrend from './TenantOnboardingTrend'
import TotalEntiTenantOnboardingTrend from './TotalEntiTenantOnboardingTrend'

type NumberPageContentProps = {
  data: Metrics
}

const NumbersPageContent: React.FC<NumberPageContentProps> = ({ data }) => {
  const totaleEnti = data.totaleEnti.find((el) => el.name === 'Totale')
  const tenantsCard = data.totaleEnti.filter((el) => el.name !== 'Totale')
  let totalTenantDistribution = 0
  data.distribuzioneDegliEntiPerAttivita.forEach((el) => {
    totalTenantDistribution += el.count
  })
  return (
    <Box component="main">
      <DataSectionWrapper
        anchor="adesione"
        title="Adesione"
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
              <TotalEntiTenantOnboardingTrend data={data.statoDiCompletamentoAdesioni} />
            </ChartAndTableWrapper>
          </Grid>
          {tenantsCard.map((item, i) => (
            <Grid key={i} item xs={12} lg={4}>
              <TenantsCountCard data={item} />
            </Grid>
          ))}

          <Grid sx={{ mt: 7 }} item xs={12} lg={12}>
            <TenantOnboardingTrend data={data.statoDiCompletamentoAdesioni} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid spacing={3} container>
              {data.distribuzioneDegliEntiPerAttivita.map((item, i) => (
                <Grid key={i} item xs={12} lg={12}>
                  <TenantsDistributionCard data={item} total={totalTenantDistribution} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Distribuzione degli enti per attività"
              description="Numero di: enti erogatori che mettono a disposizione e-service; enti fruitori che li utilizzano; enti sia erogatori che fruitori; enti che effettuano solo l’accesso alla piattaforma"
            >
              <EServicesByTenantDistribution
                data={data.distribuzioneDegliEntiPerAttivita}
                totale={totalTenantDistribution}
              />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="pubblicazione"
        title="Pubblicazione"
        description="Per consentire l’accesso ai dati da parte degli enti fruitori, l’ente erogatore realizza e pubblica a catalogo gli e-service"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <TotalEServicesCard data={data.eservicePubblicati} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Categorie di erogatori"
              description="Numeri di e-service per categoria di ente erogatore"
            >
              <EServicesByMacroCategories data={data.entiErogatoriDiEService} />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>

        <TopProducers data={data.entiChePubblicanoPiuEService} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="abilitazione"
        title="Abilitazione"
        description="Per accedere la prima volta a un e-service, l’ente interessato deve essere autorizzato dall’ente erogatore"
        background="grey"
      >
        <TopProducersBySubscribers data={data.entiErogatoriEdEntiAbilitatiAllaFruizione} />
        <MostSubscribedEServices data={data.eserviceConPiuEntiAbilitati} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="utilizzo"
        title="Utilizzo"
        description="Per usare l’e-service e fruire dei dati, una volta abilitato, l’ente deve fare richiesta d’accesso"
      >
        <Alert severity="info">Questa sezione è attualmente in sviluppo.</Alert>
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
        label: 'rispetto al mese precedente',
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
      }}
      color={name}
    />
  )
}

const TenantsDistributionCard = ({
  data,
  total,
}: {
  data: TenantDistributionCount
  total: number
}) => {
  const { activity, count } = data
  return (
    <DataCard
      label={activity}
      value={formatThousands(count)}
      variation={{
        percentage: Math.round((count / total) * 100),
        label: `su ${formatThousands(total)} enti aderenti`,
      }}
      color={activity}
    />
  )
}

export default NumbersPageContent
