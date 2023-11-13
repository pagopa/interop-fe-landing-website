import Head from 'next/head'
import React from 'react'
import {
  Alert,
  AlertTitle,
  Container,
  Divider,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import type { NextPage } from 'next'
import { QueryFilter } from '@/components/catalog'
import { EServiceCatalog, EServiceCatalogSkeleton } from '@/components/catalog/EServiceCatalog'
import {
  FilterSearchConfig,
  UseQueryParamsConfig,
  useDeferredSearchFilter,
  usePagination,
} from '@/hooks'
import { useGetSortedEServices } from '@/services/catalog.services'
import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { PageTitle } from '@/components/PageTitle'
import { getCatalogData, getCommonData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { Dtd, PageBottomCta } from '@/components'
import { SortBy } from '@/models/catalog.models'
import { getLocalizedValue } from '@/utils/common.utils'
import { SortFilter } from '@/components/catalog/Filters/SortFilter'
import { ActiveFiltersChips } from '@/components/catalog/Filters/ActiveFiltersChips'
import { useSort } from '@/hooks/useSort'
import { ArrayParam, withDefault } from 'use-query-params'

const CatalogPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const data = getCatalogData(locale)

  return (
    <>
      <Head>
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
      <PageTitle>
        {getLocalizedValue({ it: 'Catalogo degli e-service', en: 'E-Service catalog' })}
      </PageTitle>

      <CatalogPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const CatalogPageContent: React.FC = () => {
  const [, startTransition] = React.useTransition()
  const { sortBy, setSortBy } = useSort()
  const { data: sortedEServices, isLoading, error } = useGetSortedEServices(sortBy as SortBy)

  const useQueryParamsConfig: UseQueryParamsConfig<string> = {
    name: withDefault(ArrayParam, []),
    producerName: withDefault(ArrayParam, []),
  } as const

  const filterSearchConfig: FilterSearchConfig<string> = {
    name: 'AND',
    producerName: 'OR',
  } as const

  const { queries, setQueries, results } = useDeferredSearchFilter(
    sortedEServices,
    useQueryParamsConfig,
    filterSearchConfig,
    {
      keys: ['name', 'producerName'],
      threshold: 0.2,
      useExtendedSearch: true,
    }
  )

  const { getTotalPageCount, resetPagination, pageNum, handlePageChange, limit, offset } =
    usePagination({
      limit: 12,
    })

  const totalPageCount = getTotalPageCount(results.length)

  const handleSortByChange = (sortBy: SortBy) => {
    startTransition(() => {
      setSortBy(sortBy)
      // TODO con il setTimeout funziona
      setTimeout(() => {
        resetPagination()
      }, 300)
    })
  }

  const handleResestQueries = () => {
    startTransition(() => {
      setQueries({ name: undefined, producerName: undefined })
      resetPagination()
    })
  }

  const handleRemoveNameQuery = (query: string) => {
    startTransition(() => {
      setQueries(
        (latestQuery) => ({
          ...latestQuery,
          name: latestQuery.name.filter((param) => param !== query),
        }),
        'replaceIn'
      )
      resetPagination()
    })
  }

  const handleRemoveProducerNameQuery = (query: string) => {
    startTransition(() => {
      setQueries(
        (latestQuery) => ({
          ...latestQuery,
          producerName: latestQuery.producerName.filter((param) => param !== query),
        }),
        'replaceIn'
      )
      resetPagination()
    })
  }

  const handleQueryChange = ({
    nameQuery,
    producerNameQuery,
  }: {
    nameQuery: string
    producerNameQuery: Array<string>
  }) => {
    startTransition(() => {
      // let newFilterQueryParams = {}
      // if (nameQuery) newFilterQueryParams = { ...newFilterQueryParams, name: [nameQuery] }

      // if (producerNameQuery)
      //   newFilterQueryParams = { ...newFilterQueryParams, producerName: producerNameQuery }

      // TODO capire se possibile tenerlo così e vedere come aggiungere l'elemento a quelli precedenti oppure fare due separati
      setQueries((latestQuery) => {
        const newFilterQueryParams = { ...latestQuery }
        if (nameQuery !== '') {
          newFilterQueryParams.name = [...newFilterQueryParams.name, nameQuery]
        }
        if (producerNameQuery.length !== 0) {
          newFilterQueryParams.producerName = [
            ...newFilterQueryParams.producerName,
            ...producerNameQuery,
          ]
        }
        return newFilterQueryParams
      }, 'replaceIn')

      // setQueries(newFilterQueryParams, 'pushIn')
      resetPagination()
    })
  }

  if (error) {
    return (
      <Container sx={{ mb: 9 }}>
        <Alert severity="error">
          <AlertTitle>{getLocalizedValue({ it: 'Errore', en: 'Error' })}</AlertTitle>
          {getLocalizedValue({
            it: "C'è stato un errore nel caricamento dati. Per favore, riprova.",
            en: 'There was an error while loading data. Please, try again.',
          })}
        </Alert>
      </Container>
    )
  }

  return (
    <Container>
      <QueryFilter
        producerNameActiveFilters={queries.producerName as Array<string>}
        onQueryChange={handleQueryChange}
      />
      <Divider sx={{ my: 4 }} />
      <ActiveFiltersChips
        eserviceActiveFilters={queries.name}
        providerActiveFilters={queries.producerName}
        onRemoveActiveNameFilter={handleRemoveNameQuery}
        onRemoveActiveProducerNameFilter={handleRemoveProducerNameQuery}
        onResetActiveFilters={handleResestQueries}
        rightContent={<SortFilter sortBy={sortBy as SortBy} onSortByChange={handleSortByChange} />}
      />
      {isLoading && (
        <>
          <Skeleton width={100} sx={{ mb: 2.5, mt: 4 }} />
          <EServiceCatalogSkeleton />
        </>
      )}
      {!isLoading && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {results.length} {getLocalizedValue({ it: 'risultati', en: 'results' })}
            </Typography>
            {results.length > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {getLocalizedValue({
                  it: `Pagina ${pageNum} di ${totalPageCount}`,
                  en: `${pageNum} of ${totalPageCount}`,
                })}
              </Typography>
            )}
          </Stack>
          <EServiceCatalog filterResults={results.slice(offset, offset + limit)} />
          {totalPageCount > 1 && (
            <Stack alignItems="center">
              <Pagination
                color="primary"
                sx={{ mb: 8 }}
                count={totalPageCount}
                page={pageNum}
                onChange={(_, page) => handlePageChange(page)}
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  )
}

export default CatalogPage
