import type { NextPage } from 'next'
import PageBottomCta from '../../src/components/PageBottomCta'
import React, { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getCommonData, getNumbersData } from '../../api'
import Dtd from '../../src/components/Dtd'
import { Alert, AlertTitle, Container, Typography } from '@mui/material'
import { LineChartSection, LineChartSectionSkeleton } from '../../src/components/LineChartSection'
import Head from 'next/head'
import { INTEROP_NUMBERS_URL } from '../../src/utils/constants'

interface NumbersData {
  primary: number
  secondary: number
  graph: Array<{
    time: string
    value: number
  }>
}

interface InteropNumbers {
  descriptors: NumbersData
  tenants: NumbersData
  agreements: NumbersData
  purposes: NumbersData
  tokens: NumbersData
}

const NumbersPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

  const [interopData, setInteropData] = React.useState<null | InteropNumbers>(null)
  const [error, setError] = React.useState(false)

  const { descriptors, tenants, agreements, purposes, tokens } = data

  React.useEffect(() => {
    async function fetchDynamicData(retries = 3) {
      try {
        const res = await fetch(INTEROP_NUMBERS_URL)
        const data = (await res.json()) as InteropNumbers
        setInteropData(data)
      } catch (err) {
        if (retries === 0) {
          setError(true)
          return
        }
        console.error(err)
        await new Promise((resolve) => setTimeout(resolve, 5000))
        // On error, retry recursively
        fetchDynamicData(retries - 1)
      }
    }

    fetchDynamicData()
  }, [])

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
      </Head>
      <Typography sx={{ textAlign: 'center', pt: 8, pb: 7, mt: 8 }} variant="h1">
        {data.title}
      </Typography>

      {error && (
        <Container sx={{ mb: 9 }}>
          <Alert severity="error">
            <AlertTitle>{data.error.title}</AlertTitle>
            {data.error.desription}
          </Alert>
        </Container>
      )}

      {!error && !interopData && (
        <>
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
        </>
      )}

      {interopData && (
        <>
          <LineChartSection
            title={descriptors.title}
            cards={[
              {
                Icon: descriptors.cards[0].Icon,
                amount: interopData.descriptors.primary,
                description: descriptors.cards[0].description,
              },
              {
                Icon: descriptors.cards[1].Icon,
                amount: interopData.descriptors.secondary,
                description: descriptors.cards[1].description,
              },
            ]}
            graph={{
              title: descriptors.graphTitle,
              data: interopData.descriptors.graph,
            }}
          />

          <LineChartSection
            title={tenants.title}
            cards={[
              {
                Icon: tenants.cards[0].Icon,
                amount: interopData.tenants.primary,
                description: tenants.cards[0].description,
              },
              {
                Icon: tenants.cards[1].Icon,
                amount: interopData.tenants.secondary,
                description: tenants.cards[1].description,
              },
            ]}
            graph={{
              title: tenants.graphTitle,
              data: interopData.tenants.graph,
            }}
            withBackground
          />

          <LineChartSection
            title={agreements.title}
            cards={[
              {
                Icon: agreements.cards[0].Icon,
                amount: interopData.agreements.primary,
                description: agreements.cards[0].description,
              },
              {
                Icon: agreements.cards[1].Icon,
                amount: interopData.agreements.secondary,
                description: agreements.cards[1].description,
              },
            ]}
            graph={{
              title: agreements.graphTitle,
              data: interopData.agreements.graph,
            }}
          />

          <LineChartSection
            title={purposes.title}
            cards={[
              {
                Icon: purposes.cards[0].Icon,
                amount: interopData.purposes.primary,
                description: purposes.cards[0].description,
              },
              {
                Icon: purposes.cards[1].Icon,
                amount: interopData.purposes.secondary,
                description: purposes.cards[1].description,
              },
            ]}
            graph={{
              title: purposes.graphTitle,
              data: interopData.purposes.graph,
            }}
            withBackground
          />

          <LineChartSection
            title={tokens.title}
            cards={[
              {
                Icon: tokens.cards[0].Icon,
                amount: interopData.tokens.primary,
                description: tokens.cards[0].description,
              },
              {
                Icon: tokens.cards[1].Icon,
                amount: interopData.tokens.secondary,
                description: tokens.cards[1].description,
              },
            ]}
            graph={{
              title: tokens.graphTitle,
              data: interopData.tokens.graph,
            }}
          />
        </>
      )}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NumbersPage
