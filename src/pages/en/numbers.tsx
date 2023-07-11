import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd, LineChartSection, LineChartSectionSkeleton } from '@/components'
import { Alert, AlertTitle, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useGetInteropTestNumbers, useGetInteropProdNumbers } from '@/services/numbers.services'
import { InteropNumbers, NumbersEnv } from '@/models/numbers.models'
import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '@/configs/constants.config'

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

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
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL_TEST}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL_PROD}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Typography sx={{ textAlign: 'center', pt: 8, pb: 8, mt: 8 }} variant="h1">
        {data.title}
      </Typography>

      <NumbersPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const NumbersPageContent: React.FC = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)

  const [activeEnv, setActiveEnv] = React.useState<Record<keyof InteropNumbers, NumbersEnv>>({
    descriptors: 'prod',
    tenants: 'prod',
    agreements: 'prod',
    purposes: 'prod',
    tokens: 'prod',
  })

  const handleEnvChange = (value: string, section: keyof InteropNumbers) => {
    setActiveEnv((prev) => ({ ...prev, [section]: value as NumbersEnv }))
  }

  const {
    data: test,
    error: testNumbersError,
    isLoading: isTestNumbersLoading,
  } = useGetInteropTestNumbers()

  const {
    data: prod,
    error: prodNumbersError,
    isLoading: isProsNumbersLoading,
  } = useGetInteropProdNumbers()

  const isLoading = isTestNumbersLoading || isProsNumbersLoading
  const error = testNumbersError || prodNumbersError

  const numbersData = test &&
    prod && {
      test,
      prod,
    }

  const { descriptors, tenants, agreements, purposes, tokens, tabs } = data

  if (isLoading) {
    return <NumbersPageContentSkeleton />
  }

  if (error || !numbersData) {
    return (
      <Container sx={{ mb: 9 }}>
        <Alert severity="error">
          <AlertTitle>{data.error.title}</AlertTitle>
          {data.error.description}
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <LineChartSection
        title={tokens.title}
        cards={[
          {
            Icon: tokens.cards[0].Icon,
            amount: numbersData[activeEnv.tokens].tokens.primary,
            description: tokens.cards[0].description,
          },
          {
            Icon: tokens.cards[1].Icon,
            amount: numbersData[activeEnv.tokens].tokens.secondary,
            description: tokens.cards[1].description,
          },
        ]}
        graph={{
          title: tokens.graphTitle,
          subtitle: tokens.graphDescription,
          data: numbersData[activeEnv.tokens].tokens.graph,
        }}
        tabs={tabs}
        activeEnv={activeEnv.tokens}
        onChangeEnv={handleEnvChange}
        section={'tokens'}
      />
      <LineChartSection
        title={descriptors.title}
        cards={[
          {
            Icon: descriptors.cards[0].Icon,
            amount: numbersData[activeEnv.descriptors].descriptors.primary,
            description: descriptors.cards[0].description,
          },
          {
            Icon: descriptors.cards[1].Icon,
            amount: numbersData[activeEnv.descriptors].descriptors.secondary,
            description: descriptors.cards[1].description,
          },
        ]}
        graph={{
          title: descriptors.graphTitle,
          subtitle: descriptors.graphDescription,
          data: numbersData[activeEnv.descriptors].descriptors.graph,
        }}
        withBackground
        tabs={tabs}
        activeEnv={activeEnv.descriptors}
        onChangeEnv={handleEnvChange}
        section={'descriptors'}
      />

      <LineChartSection
        title={tenants.title}
        cards={[
          {
            Icon: tenants.cards[0].Icon,
            amount: numbersData[activeEnv.tenants].tenants.primary,
            description: tenants.cards[0].description,
          },
          {
            Icon: tenants.cards[1].Icon,
            amount: numbersData[activeEnv.tenants].tenants.secondary,
            description: tenants.cards[1].description,
          },
        ]}
        graph={{
          title: tenants.graphTitle,
          subtitle: tenants.graphDescription,
          data: numbersData[activeEnv.tenants].tenants.graph,
        }}
        tabs={tabs}
        activeEnv={activeEnv.tenants}
        onChangeEnv={handleEnvChange}
        section={'tenants'}
      />

      <LineChartSection
        title={agreements.title}
        cards={[
          {
            Icon: agreements.cards[0].Icon,
            amount: numbersData[activeEnv.agreements].agreements.primary,
            description: agreements.cards[0].description,
          },
          {
            Icon: agreements.cards[1].Icon,
            amount: numbersData[activeEnv.agreements].agreements.secondary,
            description: agreements.cards[1].description,
          },
        ]}
        graph={{
          title: agreements.graphTitle,
          subtitle: agreements.graphDescription,
          data: numbersData[activeEnv.agreements].agreements.graph,
        }}
        withBackground
        tabs={tabs}
        activeEnv={activeEnv.agreements}
        onChangeEnv={handleEnvChange}
        section={'agreements'}
      />

      <LineChartSection
        title={purposes.title}
        cards={[
          {
            Icon: purposes.cards[0].Icon,
            amount: numbersData[activeEnv.purposes].purposes.primary,
            description: purposes.cards[0].description,
          },
          {
            Icon: purposes.cards[1].Icon,
            amount: numbersData[activeEnv.purposes].purposes.secondary,
            description: purposes.cards[1].description,
          },
        ]}
        graph={{
          title: purposes.graphTitle,
          subtitle: purposes.graphDescription,
          data: numbersData[activeEnv.purposes].purposes.graph,
        }}
        tabs={tabs}
        activeEnv={activeEnv.purposes}
        onChangeEnv={handleEnvChange}
        section={'purposes'}
      />
    </>
  )
}

const NumbersPageContentSkeleton: React.FC = () => {
  return (
    <>
      <LineChartSectionSkeleton />
      <LineChartSectionSkeleton withBackground />
      <LineChartSectionSkeleton />
      <LineChartSectionSkeleton withBackground />
      <LineChartSectionSkeleton />
    </>
  )
}

export default NumbersPage
