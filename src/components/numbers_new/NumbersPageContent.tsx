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
        title="E-Service"
        description="Sono gli enti che hanno effettuato l’adesione alla piattaforma e possono essere erogatori di e-service, fruitori o entrambi"
        background="grey"
      >
        <PublishedEServices mockData={mockData} />
      </DataSectionWrapper>
      <DataSectionWrapper
        title="Abilitazione e utilizzo"
        description="Le richieste di fruizione rappresentano l’abilitazione all’accesso dell’e-service da parte degli enti; i voucher staccati rappresentano l’effettivo utilizzo degli e-service disponibili a catalogo"
      >
        {/* <ProvidersSubscribers mockData={mockData} /> */}
        {/* <MostSubscribedEServices mockData={mockData} /> */}
      </DataSectionWrapper>
    </Box>
  )
}

export default NumbersPageContent
