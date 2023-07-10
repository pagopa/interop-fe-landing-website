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
      </Head>
      <div>
        <Typography variant="h1">{eservice?.name}</Typography>
        <Typography>{eservice?.description}</Typography>
      </div>
    </>
  )
}

export default EServicePage
