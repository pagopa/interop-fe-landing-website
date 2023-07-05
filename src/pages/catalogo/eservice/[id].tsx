import { useGetEService } from '@/services/catalog.services'
import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const EServicePage: NextPage = () => {
  const router = useRouter()
  const eserviceId = router.query.id as string
  const { data: eservice, isLoading } = useGetEService(eserviceId)

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Typography variant="h1">{eservice?.name}</Typography>
      <Typography>{eservice?.description}</Typography>
    </div>
  )
}

export default EServicePage
