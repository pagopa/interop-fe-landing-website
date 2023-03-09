import type { NextPage } from 'next'
import PageBottomCta from '../../src/components/PageBottomCta'
import React, { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getCommonData, getNumbersData } from '../../api'
import Dtd from '../../src/components/Dtd'
import { Alert, AlertTitle, Container, Tab, Tabs, Typography } from '@mui/material'
import { LineChartSection, LineChartSectionSkeleton } from '../../src/components/LineChartSection'
import Head from 'next/head'
import { Env } from '../../src/types/global'
import useFetchNumbers from '../../src/hooks/useFetchNumbers'

const NumbersPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)
  const [activeEnv, setActiveEnv] = React.useState<Env>('prod')
  const { numbersData, error, isLoading } = useFetchNumbers(activeEnv)

  const handleEnvChange = (_: unknown, value: string) => {
    setActiveEnv(value as Env)
  }

  const { descriptors, tenants, agreements, purposes, tokens, tabs } = data

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
        <meta key="og:locale" property="og:locale" content="en_EN" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
      </Head>
      <Typography sx={{ textAlign: 'center', pt: 8, pb: 8, mt: 8 }} variant="h1">
        {data.title}
      </Typography>

      <Tabs aria-label={tabs.ariaLabel} value={activeEnv} onChange={handleEnvChange} centered>
        <Tab value="prod" label={tabs.prod} />
        <Tab value="test" label={tabs.test} />
      </Tabs>

      {error && (
        <Container sx={{ mb: 9 }}>
          <Alert severity="error">
            <AlertTitle>{data.error.title}</AlertTitle>
            {data.error.description}
          </Alert>
        </Container>
      )}

      {isLoading && (
        <>
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
        </>
      )}

      {numbersData && (
        <>
          <LineChartSection
            title={tokens.title}
            cards={[
              {
                Icon: tokens.cards[0].Icon,
                amount: numbersData.tokens.primary,
                description: tokens.cards[0].description,
              },
              {
                Icon: tokens.cards[1].Icon,
                amount: numbersData.tokens.secondary,
                description: tokens.cards[1].description,
              },
            ]}
            graph={{
              title: tokens.graphTitle,
              subtitle: tokens.graphDescription,
              data: numbersData.tokens.graph,
            }}
          />

          <LineChartSection
            title={descriptors.title}
            cards={[
              {
                Icon: descriptors.cards[0].Icon,
                amount: numbersData.descriptors.primary,
                description: descriptors.cards[0].description,
              },
              {
                Icon: descriptors.cards[1].Icon,
                amount: numbersData.descriptors.secondary,
                description: descriptors.cards[1].description,
              },
            ]}
            graph={{
              title: descriptors.graphTitle,
              subtitle: descriptors.graphDescription,
              data: numbersData.descriptors.graph,
            }}
          />

          <LineChartSection
            title={tenants.title}
            cards={[
              {
                Icon: tenants.cards[0].Icon,
                amount: numbersData.tenants.primary,
                description: tenants.cards[0].description,
              },
              {
                Icon: tenants.cards[1].Icon,
                amount: numbersData.tenants.secondary,
                description: tenants.cards[1].description,
              },
            ]}
            graph={{
              title: tenants.graphTitle,
              subtitle: tenants.graphDescription,
              data: numbersData.tenants.graph,
            }}
            withBackground
          />

          <LineChartSection
            title={agreements.title}
            cards={[
              {
                Icon: agreements.cards[0].Icon,
                amount: numbersData.agreements.primary,
                description: agreements.cards[0].description,
              },
              {
                Icon: agreements.cards[1].Icon,
                amount: numbersData.agreements.secondary,
                description: agreements.cards[1].description,
              },
            ]}
            graph={{
              title: agreements.graphTitle,
              subtitle: agreements.graphDescription,
              data: numbersData.agreements.graph,
            }}
          />

          <LineChartSection
            title={purposes.title}
            cards={[
              {
                Icon: purposes.cards[0].Icon,
                amount: numbersData.purposes.primary,
                description: purposes.cards[0].description,
              },
              {
                Icon: purposes.cards[1].Icon,
                amount: numbersData.purposes.secondary,
                description: purposes.cards[1].description,
              },
            ]}
            graph={{
              title: purposes.graphTitle,
              subtitle: purposes.graphDescription,
              data: numbersData.purposes.graph,
            }}
            withBackground
          />
        </>
      )}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NumbersPage
