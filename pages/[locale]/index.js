import React from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import LinkComponent from '../../src/components/Link'

const Homepage = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <h1>Home</h1>
      <LinkComponent href="/about">{t('to-about')}</LinkComponent>
    </>
  )
}

export default Homepage

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
