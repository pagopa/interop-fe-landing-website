import React from 'react'
import { Container, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { QueryFilter } from '@/components/catalog'
import { EServiceCatalog, EServiceCatalogSkeleton } from '@/components/catalog/EServiceCatalog'
import { useDeferredSearchFilter } from '@/hooks'
import { useGetEServicesList } from '@/services/catalog.services'
import Head from 'next/head'

const CatalogPage: NextPage = () => {
  const { data: eservices, isLoading } = useGetEServicesList()
  const { query, setQuery, results } = useDeferredSearchFilter(eservices, {
    keys: ['name', 'producerName'],
    threshold: 0.2,
    includeMatches: true,
  })

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Container sx={{ py: 8 }}>
        <QueryFilter query={query} onQueryChange={setQuery} />
        <Divider sx={{ my: 4 }} />
        {isLoading && <EServiceCatalogSkeleton />}
        {!isLoading && <EServiceCatalog filterResults={results} />}
      </Container>
    </>
  )
}

export default CatalogPage
