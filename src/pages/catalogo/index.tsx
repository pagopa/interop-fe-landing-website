import React from 'react'
import { Container, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { QueryFilter } from '@/components/catalog'
import { EServiceCatalog, EServiceCatalogSkeleton } from '@/components/catalog/EServiceCatalog'
import { useDeferredSearchFilter } from '@/hooks'
import { useFetch } from '@/hooks'
import { getEServicesList } from '@/services/catalog.services'

const CatalogPage: NextPage = () => {
  const { data: eservices, isLoading } = useFetch(getEServicesList)
  const { query, setQuery, results } = useDeferredSearchFilter(eservices, {
    keys: ['name', 'producerName'],
    threshold: 0.2,
    includeMatches: true,
  })

  return (
    <Container sx={{ py: 8 }}>
      <QueryFilter query={query} onQueryChange={setQuery} />
      <Divider sx={{ my: 4 }} />
      {isLoading && <EServiceCatalogSkeleton />}
      {!isLoading && <EServiceCatalog filterResults={results} />}
    </Container>
  )
}

export default CatalogPage
