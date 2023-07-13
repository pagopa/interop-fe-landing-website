import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { useGetEService } from '@/services/catalog.services'
import { Box, Button, Container, Stack } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NextLink from 'next/link'
import { Dtd, PageBottomCta } from '@/components'
import { getCommonData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { HeaderSection, HeaderSectionSkeleton } from '@/components/e-service-details'
import {
  GeneralInformationsSection,
  GeneralInformationsSectionSkeleton,
} from '@/components/e-service-details/GeneralInformationsSection'
import {
  AttributesSection,
  AttributesSectionSkeleton,
} from '@/components/e-service-details/AttributesSection/AttributesSection'
import { EService } from '@/models/catalog.models'

const EServicePage: NextPage = () => {
  const router = useRouter()
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)

  const eserviceId = router.query.id as string
  const { data: eservice } = useGetEService(eserviceId)

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

      {eservice && <EServicePageContent eservice={eservice} />}
      {!eservice && <EServicePageContentSkeleton />}

      <Stack alignItems="center" sx={{ pb: 6, bgcolor: '#FAFAFA' }}>
        <Button
          LinkComponent={NextLink}
          href="/catalogo"
          variant="text"
          startIcon={<ArrowBackIcon />}
        >
          Torna al catalogo
        </Button>
      </Stack>

      <PageBottomCta {...commonData.pageBottomCta} />
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
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default EServicePage
