import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { getRoute, LOCALES, ROUTES } from '../../lib/constants'
import useLocale from '../../src/i18n/useLocale'
import { QueryParams } from '../../src/types/global'
import { Infoblock } from '@pagopa/mui-italia'

const Home = () => {
  const { t, lang } = useLocale()

  return (
    <React.Fragment>
      <Infoblock inverse={false} title="Cammello" image="" imageShadow={true} />
      <div>
        {t('common.home')}
        <br />
        <Link href={getRoute('ABOUT', lang)}>{t('common.toAbout')}</Link>
      </div>
    </React.Fragment>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{}, QueryParams> = async () => {
  return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: LOCALES.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  }
}
