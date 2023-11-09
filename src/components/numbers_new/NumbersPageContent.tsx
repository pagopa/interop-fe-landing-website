import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataSectionWrapper } from '@/components/numbers/DataSectionWrapper'
import { useGetInteropNumbersNew } from '@/services/numbers_new.services'
import { DataCard } from '../numbers/DataCard'
import { formatThousands } from '@/utils/formatters.utils'
import { PublishedEServicesMetric } from '@/models/numbers_new.models'
import { ChartAndTableWrapper } from '../numbers/ChartAndTableWrapper'
import EServicesByMacroCategories from './EServicesByMacroCategories'
import TopProducersBySubscribers from './TopProducersBySubscribers'
import MostSubscribedEServices from './MostSubscribedEservices'
import TopProducers from './TopProducers'

const NumbersPageContent: React.FC = () => {
  const { data: mockData } = useGetInteropNumbersNew()

  if (!mockData) {
    return null
  }

  const {
    publishedEServices,
    eservicesByMacroCategories,
    topProducersBySubscribers,
    mostSubscribedEServices,
    topProducers,
  } = mockData

  return (
    <Box component="main">
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
        label: 'rispetto al mese precedente',
      }}
    />
  )
}

export default NumbersPageContent
