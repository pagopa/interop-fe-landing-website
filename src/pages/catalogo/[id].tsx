import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { useGetEService } from '@/services/catalog.services'
import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const EServicePage: NextPage = () => {
  const router = useRouter()
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
      <div>
        <Typography variant="h1">{eservice?.name}</Typography>
        <Typography>{eservice?.description}</Typography>
      </div>
    </>
  )
}

export default EServicePage
