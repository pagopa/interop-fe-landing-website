import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { getInitialLocale } from '../src/i18n/utils'

const Index = (): ReactElement => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/[lang]', `/${getInitialLocale()}`)
  })

  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="noindex, nofollow" />
      </Head>
    </>
  )
}

export default Index
