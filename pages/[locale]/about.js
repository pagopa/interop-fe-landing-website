import React from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import LinkComponent from '../../src/components/Link'

const AboutPage = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <h1>About</h1>
      <LinkComponent href="/">{t('back-to-home')}</LinkComponent>
    </>
  )
}

export default AboutPage

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
