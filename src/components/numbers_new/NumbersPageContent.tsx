// @ts-nocheck
import React from 'react'
import { Box } from '@mui/material'
import { DataSectionWrapper } from '@/components/numbers/DataSectionWrapper'
import { useGetInteropNumbersNew } from '@/services/numbers_new.services'
import PublishedEServices from './PublishedEServices'
// import ProvidersSubscribers from './ProvidersSubscribers'
// import MostSubscribedEServices from './MostSubscribedEservices'

const NumbersPageContent: React.FC = () => {
  const { data: mockData } = useGetInteropNumbersNew()

  if (!mockData) {
    return null
  }

  return (
    <Box component="main">
      <DataSectionWrapper
        anchor="pubblicazione"
        title="Pubblicazione"
        description="Per consentire l’accesso ai dati da parte degli enti fruitori, l’ente erogatore realizza e pubblica a catalogo gli e-service"
        background="grey"
      >
        <PublishedEServices mockData={mockData} />
      </DataSectionWrapper>
      <DataSectionWrapper
        anchor="abilitazione"
        title="Abilitazione"
        description="Per accedere la prima volta a un e-service, l’ente interessato deve essere autorizzato dall’ente erogatore"
      >
        {/* <ProvidersSubscribers mockData={mockData} /> */}
        {/* <MostSubscribedEServices mockData={mockData} /> */}
      </DataSectionWrapper>
    </Box>
  )
}

export default NumbersPageContent
