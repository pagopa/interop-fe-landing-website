import { Dtd, PageBottomCta } from '@/components'
import { SectionSelectInput } from '@/components/SectionSelectInput'
import NumbersPageContent from '@/components/numbers/NumbersPageContent'
import { DATI_GOV_IT_OVERVIEW_HREF, INTEROP_NUMBERS_NEW } from '@/configs/constants.config'
import { useLocaleContext } from '@/contexts/locale.context'
import { useGetInteropNumbersNew } from '@/services/numbers.services'
import { getCommonData, getNumbersData } from '@/static'
import { toFormattedDate } from '@/utils/formatters.utils'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { SWRConfig } from 'swr/_internal'

const anchors = [
  { ref: 'adesione', label: 'Enti aderenti', descr: 'Enti iscritti alla piattaforma' },
  { ref: 'pubblicazione', label: 'E-service pubblicati', descr: 'E-service offerti a catalogo' },
  {
    ref: 'abilitazione',
    label: 'Connessioni fra enti',
    descr: 'Connessioni tra erogatori e fruitori',
  },
  {
    ref: 'utilizzo',
    label: 'Utilizzo degli e-service',
    descr: 'Sessioni di scambio dati',
  },
]
export async function getStaticProps<T = unknown>() {
  const response = await fetch(INTEROP_NUMBERS_NEW)
  const data: T = await response.json()
  return {
    props: {
      fallback: {
        [INTEROP_NUMBERS_NEW]: data,
      },
    },
  }
}

const NumbersPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback, revalidateOnMount: true }}>
      <DashBoard />
    </SWRConfig>
  )
}
const DashBoard = () => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const { data: metricsData } = useGetInteropNumbersNew()
  const data = getNumbersData(locale)
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))
  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="robots" content="noindex,nofollow" />
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
          href={INTEROP_NUMBERS_NEW}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>

      {isMobile ? <SectionSelectInput options={anchors} /> : <PageAnchors />}
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <PageTitles title={data.title} publishDate={metricsData?.dataDiPubblicazione} />
      </Container>

      {metricsData && <NumbersPageContent data={metricsData} />}
      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

type PageTitlesType = {
  publishDate?: string
  title: string
}

const PageTitles: React.FC<PageTitlesType> = ({ title, publishDate }) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      spacing={{ xs: 3, md: 0 }}
      justifyContent="space-between"
      sx={{ mt: 8, mb: 3 }}
    >
      <Box>
        <Box sx={{ maxWidth: 612 }}>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography color="text.primary" sx={{ mt: 1 }}>
            Esplora i <strong>dati relativi all’utilizzo di PDND Interoperabilità</strong>, la
            piattaforma che abilita lo scambio di informazioni tra gli enti. Ogni ente che aderisce
            alla PDND può scambiare informazioni in modo semplice e sicuro, pubblicando sul catalogo
            gli e-service che gestisce e richiedendo la fruizione di quelli di cui ha bisogno.
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={10}
        sx={{
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 4,
          px: 3,
          py: 1.5,
          maxWidth: 300,
        }}
      >
        <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1 }}>
          I dati sono disponibili come .json e .csv su{' '}
          <Link href={DATI_GOV_IT_OVERVIEW_HREF} target="_blank">
            dati.gov.it <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
          </Link>
        </Typography>
        <Typography sx={{ mt: 1 }} component="p" color="text.secondary" variant="caption-semibold">
          ultimo aggiornamento {publishDate ? toFormattedDate(new Date(publishDate)) : 'n/d'}
        </Typography>
      </Paper>
    </Stack>
  )
}

const PageAnchors = () => {
  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <Typography sx={{ mb: 1 }}>Esplora i dati:</Typography>
      </Container>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          py: { xs: 2, md: 4 },
          position: 'sticky',
          top: 0,
          zIndex: 10000000,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
          <Stack
            sx={{ color: 'white' }}
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 0 }}
          >
            {anchors.map(({ label, ref, descr }, i) => {
              return (
                <Link
                  underline="hover"
                  color="inherit"
                  href={`#${ref}`}
                  key={i}
                  sx={{ flexGrow: 1 }}
                >
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'white', fontWeight: 600 }}
                      >
                        {label}
                      </Typography>
                      <ArrowForwardIcon fontSize="small" sx={{ color: 'white' }} />
                    </Stack>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'white', display: { xs: 'none', md: 'initial' } }}
                    >
                      {descr}
                    </Typography>
                  </Stack>
                </Link>
              )
            })}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default NumbersPage
