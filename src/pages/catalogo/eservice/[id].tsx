import { EService } from '@/models/catalog.models'
import { getEService, getEServicesList } from '@/services/catalog.services'
import { Typography } from '@mui/material'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const eservices = await getEServicesList()
  const paths = eservices.map((eservice) => ({
    params: { id: eservice.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  eservice: EService
}> = async ({ params }) => {
  const id = params?.id as string
  const eservice = (await getEService(id)) as EService

  return { props: { eservice } }
}

export default function EServicePage({ eservice }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div key={eservice.id}>
      <Typography variant="h1">{eservice.name}</Typography>
      <Typography>{eservice.description}</Typography>
    </div>
  )
}
