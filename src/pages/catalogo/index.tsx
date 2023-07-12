import Head from 'next/head'
import React from 'react'
import { Container, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { QueryFilter } from '@/components/catalog'
import { EServiceCatalog, EServiceCatalogSkeleton } from '@/components/catalog/EServiceCatalog'
import { useDeferredSearchFilter } from '@/hooks'
import { useGetEServicesList } from '@/services/catalog.services'
import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { PageTitle } from '@/components/PageTitle'

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
        <link
          rel="preload"
          href={INTEROP_CATALOG_URL}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container>
        <PageTitle>Catalogo degli e-service</PageTitle>
        <QueryFilter query={query} onQueryChange={setQuery} />
        <Divider sx={{ my: 4 }} />
        {isLoading && <EServiceCatalogSkeleton />}
        {!isLoading && <EServiceCatalog filterResults={results} />}
      </Container>
    </>
  )
}

export default CatalogPage
