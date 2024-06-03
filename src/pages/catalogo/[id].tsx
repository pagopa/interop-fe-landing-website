import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { useGetEService } from '@/services/catalog.services'
import { Box, Button, Container, Stack } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NextLink from 'next/link'
import { Dtd, PageBottomCta } from '@/components'
import { getCatalogData, getCommonData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { HeaderSection, HeaderSectionSkeleton } from '@/components/e-service-details'
import {
  DocumentationSection,
  DocumentationSectionSkeleton,
} from '@/components/e-service-details/DocumentationSection'
import {
  GeneralInformationsSection,
  GeneralInformationsSectionSkeleton,
} from '@/components/e-service-details/GeneralInformationsSection'
import {
  AttributesSection,
  AttributesSectionSkeleton,
} from '@/components/e-service-details/AttributesSection/AttributesSection'
import { EService } from '@/models/catalog.models'
import { useTrackingContext } from '@/configs/tracking.config'

const EServicePage: NextPage = () => {
  const router = useRouter()
  const { locale } = useLocaleContext()
  const { useTrackPageViewEvent } = useTrackingContext()
  const commonData = getCommonData(locale)
  const data = getCatalogData(locale)

  const eserviceId = router.query.id as string
  const { data: eservice } = useGetEService(eserviceId)

  const metaDescription = `Dettaglio dell'e-service: ${eservice?.name}`

  useTrackPageViewEvent('INTEROP_CATALOG_READ', {
    eserviceId: eservice?.id,
    descriptorId: eservice?.activeDescriptor.id,
  })

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta key="twitter:description" name="twitter:description" content={metaDescription} />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={metaDescription} />
        <meta key="og:url" property="og:url" content={`${data.meta.url}/${eserviceId}`} />
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

      {eservice && <EServicePageContent eservice={eservice} />}
      {!eservice && <EServicePageContentSkeleton />}

      <Stack alignItems="center" sx={{ pb: 6, bgcolor: '#FAFAFA' }}>
        <Button
          LinkComponent={NextLink}
          href="/catalogo"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Torna al catalogo
        </Button>
      </Stack>

      <PageBottomCta {...data.pageBottomCta} direction="horizontal" />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const EServicePageContent: React.FC<{ eservice: EService }> = ({ eservice }) => {
  return (
    <>
      <Container sx={{ py: 6 }}>
        <HeaderSection eservice={eservice} />
      </Container>
      <Box sx={{ bgcolor: '#FAFAFA', py: 6 }}>
        <Container>
          <Stack spacing={3}>
            <GeneralInformationsSection eservice={eservice} />
            <AttributesSection attributes={eservice.attributes} />
            <DocumentationSection />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

const EServicePageContentSkeleton: React.FC = () => {
  return (
    <>
      <Container sx={{ py: 6 }}>
        <HeaderSectionSkeleton />
      </Container>
      <Box sx={{ bgcolor: '#FAFAFA', py: 6 }}>
        <Container>
          <Stack spacing={3}>
            <GeneralInformationsSectionSkeleton />
            <AttributesSectionSkeleton />
            <DocumentationSectionSkeleton />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default EServicePage
