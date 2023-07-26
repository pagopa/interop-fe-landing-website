import Head from 'next/head'
import React from 'react'
import { Container, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { QueryFilter } from '@/components/catalog'
import { EServiceCatalog, EServiceCatalogSkeleton } from '@/components/catalog/EServiceCatalog'
import { useDeferredSearchFilter } from '@/hooks'
import { useGetSortedEServices } from '@/services/catalog.services'
import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { PageTitle } from '@/components/PageTitle'
import { getCatalogData, getCommonData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { Dtd, PageBottomCta } from '@/components'
import { SortBy } from '@/models/catalog.models'
import { getLocalizedValue } from '@/utils/common.utils'

const CatalogPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const [, startTransition] = React.useTransition()
  const commonData = getCommonData(locale)
  const data = getCatalogData(locale)

  const [sortBy, setSortBy] = React.useState<SortBy>('recent-asc')
  const { data: sortedEServices, isLoading } = useGetSortedEServices(sortBy)

  const { query, setQuery, results } = useDeferredSearchFilter(sortedEServices, {
    keys: ['name', 'producerName'],
    threshold: 0.2,
    includeMatches: true,
  })

  const handleSortByChange = (sortBy: SortBy) => {
    startTransition(() => {
      setSortBy(sortBy)
    })
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>{data.meta.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={data.meta.description}
        />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
        <link
          rel="preload"
          href={INTEROP_CATALOG_URL}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container>
        <PageTitle>
          {getLocalizedValue({ it: 'Catalogo degli e-service', en: 'E-Service catalog' })}
        </PageTitle>
        <QueryFilter
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
        />
        <Divider sx={{ my: 4 }} />
        {isLoading && <EServiceCatalogSkeleton />}
        {!isLoading && <EServiceCatalog filterResults={results} />}
      </Container>
      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default CatalogPage
